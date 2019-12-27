const format: string = '[koperei] %msg%';

export function isUndefined(obj: any): boolean {
    for (const value of obj) {
        if (typeof value !== 'undefined') { return true; }
    }
    return false;
}

export function error(message: string): Error {
    return new Error(format.replace(/%msg%/g, message));
}
