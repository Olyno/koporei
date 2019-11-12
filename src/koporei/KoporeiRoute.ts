class KopereiRoute {
    public method: string;
    public path: string;
    public filePath: string | Function;

    constructor(method: string, path: string, filePath: string | Function) {
        this.method = method;
        this.path = path;
        this.filePath = filePath;
        routes.push(this);
    }
}

export const routes: KopereiRoute[] = [];

export default KopereiRoute;
