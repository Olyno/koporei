import KoporeiPreprocessor from "../KoporeiPreprocessor";
import svelte from './svelte';

const preprocessors: KoporeiPreprocessor[] = [
    svelte
]

export { preprocessors, svelte };