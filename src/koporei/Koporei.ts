import fs from 'fs';
import path from 'path';
import { error, findPackage } from '../utils';
import KoporeiConfig from './KoporeiConfig';
import KopereiRoute from './KoporeiRoute';

function withoutExtension(text: string): string {
    return text.replace(/\.\w+$/gi, '');
}

export async function initRoute(
    configDir: string,
    currentDir: string,
): Promise<void> {
    return new Promise((resolve, rejects) => {
        fs.readdir(currentDir, (err, files) => {
            if (err) {
                throw err;
            }
            const currentPath: string =
                currentDir === configDir
                    ? '/'
                    : currentDir
                          .replace(
                              new RegExp(
                                  configDir.replace(/\\/gi, '\\\\'),
                                  'gi',
                              ),
                              '',
                          )
                          .replace(/\\/g, '/');
            for (const file of files) {
                const filePath = path.resolve(currentDir, file);
                if (fs.lstatSync(filePath).isFile()) {
                    let requestPath: string;
                    if (withoutExtension(path.basename(file)) !== 'index') {
                        requestPath = `${
                            currentPath !== '/' ? currentPath : ''
                        }/${withoutExtension(file)}`;
                    } else {
                        requestPath = currentPath;
                    }
                    if (path.extname(file) === '.js') {
                        const callback = require(filePath).default;
                        new KopereiRoute(requestPath, { 'POST': callback });
                    } else {
                        new KopereiRoute(requestPath, { 'GET': filePath });
                    }
                } else {
                    resolve(initRoute(configDir, filePath));
                }
            }
            resolve();
        });
    });
}

export default async function(opts?: KoporeiConfig) {
    const rootModule: NodeModule | undefined =
        require.main || process.mainModule;
    if (rootModule) {
        const rootFile = rootModule.filename;
        findPackage(path.dirname(rootFile))
            .then(rootPath => {
                rootPath = path.resolve(rootPath);

                if (fs.existsSync(rootPath + '/koporei.json')) {
                    const fileData: KoporeiConfig =
                        opts ||
                        JSON.parse(
                            fs
                                .readFileSync(rootPath + '/koporei.json')
                                .toString(),
                        );
                    fileData.pages = path.resolve(
                        rootPath,
                        fileData.pages || 'src/pages',
                    );

                    initRoute(fileData.pages, fileData.pages);
                } else {
                    throw error("Can't find the kopeirei config file.");
                }
            })
            .catch(err => {
                throw error(err);
            });
    } else {
        throw error("Can't find root path.");
    }
}
