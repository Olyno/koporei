import fs from 'fs-extra';
import path from 'path';
import KoporeiRoute from '../KoporeiRoute';
import IKoporeiPreprocessor from '../IKoporeiPreprocessor';

interface SvelteCompileOptions {
    filename?: string;
    name: string;
    format: 'esm' | 'cjs';
    generate: 'dom' | 'ssr';
    dev: boolean;
    immutable: boolean;
    hydratable: boolean;
    legacy: boolean;
    accessors: boolean;
    customElement: boolean;
    tag?: string;
    css: boolean;
    loopGuardTimeout: number;
    preserveComments: boolean;
    preserveWhitespace: false;
    outputFilename?: string;
    cssOutputFilename?: string;
    sveltePath: string;
}

const defaultSvelteOptions: SvelteCompileOptions = {
    name: 'Component',
    format: 'esm',
    generate: 'dom',
    dev: false,
    immutable: false,
    hydratable: false,
    legacy: false,
    accessors: false,
    customElement: false,
    css: true,
    loopGuardTimeout: 0,
    preserveComments: false,
    preserveWhitespace: false,
    sveltePath: 'svelte'
}

export default {
    extension: 'svelte',
    options: [defaultSvelteOptions],
    transform: (route: KoporeiRoute, ...options) => {
        const inputFile = path.join(process.cwd(), route.path);
        const outputDir = path.join(process.cwd(), path.normalize(options[0].output || 'public/build'));
        const outputFile = inputFile;
        fs.ensureDir(outputDir)
            .then(() => fs.readFile( outputFile ))
            .then(content => {
                // const compiled = svelte.compile(content.toString(), svelteOpts);
                // fs.writeFile()
            })
    }
} as IKoporeiPreprocessor