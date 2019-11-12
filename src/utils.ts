import fs from 'fs';

const format: string = '[koperei] %msg%';

export function isUndefined(obj: any): boolean {
    for (const value of obj) {
        if (typeof value !== 'undefined') { return true; }
    }
    return false;
}

export async function findPackage(path: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                throw err;
            }
            if (files.includes('package.json')) {
                resolve(path);
            } else {
                resolve(findPackage(path + '/../'));
            }
        });
    });
}

export function error(error: string): Error {
    return new Error(format.replace(/%msg%/g, error));
}
