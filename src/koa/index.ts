import { Context } from 'koa';
import Koporei from '../koporei/Koporei';
import KoporeiConfig from '../koporei/KoporeiConfig';
import { routes } from '../koporei/Koporei';

export default (opts?: KoporeiConfig) => {
    Koporei(opts);
    return async (ctx: Context, next) => {
        const result = routes.filter(route => 
            route.path === ctx.url
            && route.method.name === ctx.method.toUpperCase()
        );
        if (result.length > 0) {
            if (ctx.method.toUpperCase() === 'GET') {
                ctx.body = result[0].execute(ctx, next);
            } else if (ctx.method.toUpperCase() === 'POST') {
                result[0].execute(ctx, next);
            }
        }
        return next();
    };
};
