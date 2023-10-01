import { builtinModules } from 'node:module';
import type { BuildOptions } from 'esbuild';
import { build, context } from 'esbuild';

const isDev = process.env.NODE_ENV === 'development';

const common: BuildOptions = {
  outdir: 'apps',
  assetNames: 'resources/[name]-[hash]',
  bundle: true,
  minify: !isDev,
  // sourcemap: isDev,
  define: {
    DEBUG: isDev ? 'true' : 'false',
  },
};

const main: BuildOptions = {
  ...common,
  tsconfig: './backend/tsconfig.json',
  entryPoints: ['./backend/main.ts', './backend/preload.ts'],
  platform: 'node',
  external: [
    'electron',
    'electron-is-dev',
    '@prisma/client',
    'electron-serve',
    'electron-store',
    ...builtinModules.flatMap(p => [p, `node:${p}`]),
  ],
};

const watch = async () => {
  const mainCtx = await context({ ...main });
  await mainCtx.watch();
};

const prod = async () => {
  await build({ ...main });
};

isDev ? watch() : prod();
