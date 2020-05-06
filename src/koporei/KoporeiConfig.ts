import KoporeiHooks from "./KoporeiHooks";
import KoporeiPreprocessor from "./KoporeiPreprocessor";

export default interface IKoporeiConfig {
    pages: string;
    isSinglePage?: string;
    hooks?: KoporeiHooks;
    preprocessors?: KoporeiPreprocessor[];
}
