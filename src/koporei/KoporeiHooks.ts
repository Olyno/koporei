import KoporeiRoute from "./KoporeiRoute";

export default interface KoporeiHooks {
    onLoadStart?: () => void;
    onLoadEnd?: () => void;
    onRouteAdded?: (route: KoporeiRoute) => void;
    onExecute?: (route: KoporeiRoute) => void;
}