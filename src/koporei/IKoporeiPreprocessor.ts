import KoporeiRoute from "./KoporeiRoute";

export default interface IKoporeiPreprocessor {
    extension: string;
    options?: any[];
    transform: (route: KoporeiRoute, ...options) => Promise<void> | void;
}