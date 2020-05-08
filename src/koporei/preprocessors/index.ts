import IKoporeiPreprocessor from "../IKoporeiPreprocessor";
import svelte from './svelte';

const preprocessors: IKoporeiPreprocessor[] = [
    svelte
]

export { preprocessors, svelte };