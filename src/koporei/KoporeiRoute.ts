import { error, isUndefined } from '../utils';

interface IKoporeiMethod {
    GET?: string | undefined;
    POST?: ((req, res, next) => Promise<void> | void) & ((ctx, next) => Promise<void> | void);
}

class KoporeiRoute {

    public path: string;
    public method: IKoporeiMethod;

    constructor(path: string, method: IKoporeiMethod) {
        const sameRoute: KoporeiRoute = routes.filter(route => route.path === path)[0];
        this.method = method;
        this.path = path;
        if (isUndefined(method)) {
            throw error('A KoporeiMethod must contains a method!');
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
