import { Context } from 'koa';
import Koporei from '../koporei/Koporei';
import KoporeiConfig from '../koporei/KoporeiConfig';
import KopereiRoute, { routes } from '../koporei/KoporeiRoute';

export default (opts?: KoporeiConfig) => {
    Koporei(opts);
    return async (ctx: Context, next) => {
        const result: KopereiRoute[] = routes.filter(
            route => route.path === ctx.url,
        );
        if (result.length > 0) {
            if (ctx.method.toUpperCase() === 'GET') {
                ctx.type = 'html';
                ctx.body = result[0].method.GET as string;
            } else if (ctx.method.toUpperCase() === 'POST') {
                if (result[0].method.POST) {
                    const callback: 
                        (ctx: Context, next) => Promise<void> | void
                            = result[0].method.POST;
                    return callback(ctx, next);
                }
            }
        }
        next();
    };
};
