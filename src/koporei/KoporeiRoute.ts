import { error, isUndefined } from '../utils';

interface KoporeiMethod {
    GET?: string | undefined;
    POST?: Function | undefined;
}

class KoporeiRoute {

    public path: string;
    public method: KoporeiMethod;

    constructor(path: string, method: KoporeiMethod) {
        const sameRoute: KoporeiRoute = routes.filter(route => route.path === path)[0];
        this.method = method;
        this.path = path;
        if (isUndefined(method)) {
            throw error('A KoporeiMethod must contains a value');
        }
        if (sameRoute) {
            Object.assign((routes.filter(route => route.path === path)[0] || this).method, method);
        } else {
            routes.push(this);
        }
    }
}

export const routes: KoporeiRoute[] = [];

export default KoporeiRoute;
