import {context} from 'esbuild';

// Function to build with watch mode
async function buildWithWatch(options) {
    const ctx = await context(options);
    if (process.argv.includes('--watch')) {
        await ctx.watch();
        console.log('Watching for changes...');
    } else {
        await ctx.rebuild();
        console.log('Built!');
        await ctx.dispose();
    }
}

// Build the main output
buildWithWatch({
    entryPoints: ['index.js'],
    outfile: '../../Public/js/privacy-shield.js',
    minify: true,
    bundle: true,
    target: "es6",
    format: "esm",
}).catch(() => process.exit(1));

// Build the main output
buildWithWatch({
    entryPoints: ['index-overlay.js'],
    outfile: '../../Public/js/privacy-shield-overlay.js',
    minify: true,
    bundle: true,
    target: "es6",
    format: "esm",
}).catch(() => process.exit(1));