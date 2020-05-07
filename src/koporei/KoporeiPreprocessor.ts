import KoporeiRoute from "./KoporeiRoute";

export default interface KoporeiPreprocessor {
    extension: string;
    options?: any[];
    transform: (route: KoporeiRoute, ...options) => Promise<void> | void;
}