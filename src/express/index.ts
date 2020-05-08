import { Request, Response } from 'express';
import Koporei from '../koporei/Koporei';
import KoporeiConfig from '../koporei/KoporeiConfig';
import { routes } from '../koporei/Koporei';

export default (opts?: KoporeiConfig) => {
    Koporei(opts);
    return async (req: Request, res: Response, next) => {
        const route = routes.get(`${req.method.toUpperCase()}|${req.url}`);
        if (route) {
            if (req.method.toUpperCase() === 'GET') {
                res.send(route.execute(req, res, next));
            } else if (req.method.toUpperCase() === 'POST') {
                route.execute(req, res, next);
            }
        }
        return next();
    };
};
