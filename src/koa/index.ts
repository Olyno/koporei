import { createReadStream } from 'fs';
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
                ctx.body = createReadStream(result[0].filePath as string);
            } else if (ctx.method.toUpperCase() === 'POST') {
                const callback: Function = result[0].filePath as Function;
                // @ts-ignore
                callback(ctx, ctx.request.body);
            }
        }
        next();
    };
};
