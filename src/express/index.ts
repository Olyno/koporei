import { Request, Response } from 'express';
import Koporei from '../koporei/Koporei';
import KoporeiConfig from '../koporei/KoporeiConfig';
import KopereiRoute, { routes } from '../koporei/KoporeiRoute';

export default (opts?: KoporeiConfig) => {
    Koporei(opts);
    return async (req: Request, res: Response, next) => {
        const result: KopereiRoute[] = routes.filter(
            route => route.path === req.path,
        );
        if (result.length > 0) {
            if (req.method.toUpperCase() === 'GET') {
                return res.send(result[0].method.GET as string);
            } else if (req.method.toUpperCase() === 'POST') {
                if (result[0].method.POST) {
                    const callback:
                        (req: Request, res: Response, next) => Promise<void> | void
                            = result[0].method.POST;
                    return callback(req, res, next);
                }
            }
        }
        return next();
    };
};
