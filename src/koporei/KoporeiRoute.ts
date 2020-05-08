import { hooks } from "./Koporei";

interface KoporeiRouteOpts {
    path: string;
    filePath: string;
    method: { name: 'GET' | 'POST', callback: (...params: any[]) => string };
}

export default class KoporeiRoute {

    public path: string;
    public filePath: string;
    public method: { name: 'GET' | 'POST', callback: (...params: any[]) => string };

    constructor(opts: KoporeiRouteOpts) {
        this.filePath = opts.filePath;
        this.path = opts.path;
        this.method = opts.method;
    }

    execute (...params: any[]): string {
        if (hooks.onExecute) hooks.onExecute(this);
        return this.method.callback(...params);
    }

}
