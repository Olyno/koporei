import IKoporeiHooks from "./IKoporeiHooks";
import IKoporeiPreprocessor from "./IKoporeiPreprocessor";

export default interface IKoporeiConfig {
    pages: string;
    isLowerCase?: boolean;
    isSinglePage?: string;
    hooks?: IKoporeiHooks;
    preprocessors?: IKoporeiPreprocessor[];
}
