import { Request, Response } from 'express';
import Koporei from '../koporei/Koporei';
import KoporeiConfig from '../koporei/KoporeiConfig';
import { routes } from '../koporei/Koporei';

export default (opts?: KoporeiConfig) => {
    Koporei(opts);
    return async (req: Request, res: Response, next) => {
        const result = routes.filter(route => 
            route.path === req.url
            && route.method.name === req.method.toUpperCase()
        );
        if (result.length > 0) {
            if (req.method.toUpperCase() === 'GET') {
                res.send(result[0].execute(req, res, next));
            } else if (req.method.toUpperCase() === 'POST') {
                result[0].execute(req, res, next);
            }
        }
        return next();
    };
};
