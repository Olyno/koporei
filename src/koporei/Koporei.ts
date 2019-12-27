import fs from 'fs';
import path from 'path';
import { error } from '../utils';
import IKoporeiConfig from './KoporeiConfig';
import KopereiRoute from './KoporeiRoute';

let config: IKoporeiConfig;

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
                    : path.normalize(currentDir)
                            .replace(
                                new RegExp(
                                    path.normalize(configDir).replace(/\\/gi, '\\\\'),
                                    'gi',
                                ),
                                ''
                            )
                           .replace(/\\/g, '/');
            for (const file of files) {
                const filePath = path.resolve(currentDir, file);
                if (fs.lstatSync(filePath).isFile()) {
                    const sourceCode: string = fs.readFileSync(filePath).toString();
                    let requestPath: string;
                    if (withoutExtension(path.basename(file)) !== 'index') {
                        requestPath = `${
                            currentPath !== '/' ? currentPath : ''
                        }/${withoutExtension(file)}`;
                    } else {
                        requestPath = currentPath;
                    }

                    if (config.isLowerCase) {
                        requestPath = requestPath.toLowerCase();
                    }

                    if (path.extname(file) === '.js') {
                        const callback = require(filePath).default || require(filePath);
                        new KopereiRoute(requestPath, { 'POST': callback });
                    } else if (path.extname(file) === '.html') {
                        new KopereiRoute(requestPath, { 'GET': sourceCode });
                    } else {
                        throw error('This file is not reconized: ' + file);
                    }

                } else {
                    resolve(initRoute(configDir, filePath));
                }
            }
            resolve();
        });
    });
}

export default async function(opts?: IKoporeiConfig) {
    if (opts?.pages) {
        config = opts;
        initRoute(opts.pages, opts.pages);
    } else {
        throw error("Can't find root path.");
    }
}
