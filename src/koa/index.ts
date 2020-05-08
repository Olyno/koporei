import { Context } from 'koa';
import Koporei from '../koporei/Koporei';
import KoporeiConfig from '../koporei/KoporeiConfig';
import { routes } from '../koporei/Koporei';

export default (opts?: KoporeiConfig) => {
    Koporei(opts);
    return async (ctx: Context, next) => {
        const route = routes.get(`${ctx.method.toUpperCase()}|${ctx.url}`);
        if (route) {
            if (ctx.method.toUpperCase() === 'GET') {
                ctx.body = route.execute(ctx, next);
            } else if (ctx.method.toUpperCase() === 'POST') {
                route.execute(ctx, next);
            }
        }
        return next();
    };
};
