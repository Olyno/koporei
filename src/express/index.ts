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
                return res.sendFile(result[0].method.GET as string);
            } else if (req.method.toUpperCase() === 'POST') {
                const callback: Function = result[0].method.POST as Function;
                return callback(req, res, req.body);
            }
        }
        return next();
    };
};
