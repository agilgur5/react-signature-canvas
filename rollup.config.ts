import type { IPackageJson } from 'package-json-type'
import type { IsExternal, RollupOptions, OutputOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS as BABEL_DEFAULT_EXTENSIONS } from '@babel/core'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

const pkgJson = packageJson as IPackageJson // coerce to the right type

// treat deps and peerDeps as externals -- don't bundle them
const depsList = [
  ...Object.keys(pkgJson.dependencies ?? []),
  ...Object.keys(pkgJson.peerDependencies ?? [])
]

// TODO: split this into a rollup plugin? submodule match is often missing
const isExternal: IsExternal = (id) => {
  // simple case: exact match (ex: '@babel/runtime')
  if (depsList.includes(id)) return true
  // submodule match (ex: '@babel/runtime/helpers/get')
  for (const dep of depsList) {
    if (id.startsWith(dep)) return true
  }
  // otherwise false
  return false
}

const outputDefaults: OutputOptions = {
  // always provide a sourcemap for better debugging for consumers
  sourcemap: true,
  // don't duplicate source code in the sourcemap as we already provide the
  // source code with the package. also makes the sourcemap _much_ smaller
  sourcemapExcludeSources: true
}

const configs: RollupOptions[] = [{
  // use package.json conventions supported by existing tools like microbundle (https://github.com/developit/microbundle)
  input: pkgJson['source'],
  output: [{
    // ESM for current/maintained environments
    file: pkgJson['module'],
    format: 'esm',
    ...outputDefaults
  }, {
    // UMD for all older envs
    file: pkgJson.main,
    format: 'umd',
    name: 'SignatureCanvas', // backward-compat with old build's name
    plugins: [terser({
      ecma: 5,
      // https://github.com/babel/preset-modules#important-minification
      safari10: true
    })],
    ...outputDefaults
  }],
  external: isExternal,
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      // don't transpile externals
      exclude: 'node_modules/**',
      // suport TS
      extensions: [...BABEL_DEFAULT_EXTENSIONS, 'ts', 'tsx'],
      // use @babel/runtime since we're building a library
      babelHelpers: 'runtime'
    })
  ]
}]

export default configs
