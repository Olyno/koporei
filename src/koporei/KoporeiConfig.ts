import KoporeiHooks from "./KoporeiHooks";
import KoporeiPreprocessor from "./KoporeiPreprocessor";

export default interface IKoporeiConfig {
    pages: string;
    isLowerCase?: boolean;
    isSinglePage?: string;
    hooks?: KoporeiHooks;
    preprocessors?: KoporeiPreprocessor[];
}
