export default interface IKoporeiConfig {
    pages: string;
    isLowerCase?: boolean;
    preprocessor?: (file: string) => Promise<any>;
}
