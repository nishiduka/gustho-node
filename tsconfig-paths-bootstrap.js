const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

let { paths } = tsConfig.compilerOptions;
for (path in paths) {
  paths[path][0] = paths[path][0].replace('src', 'build').replace('.ts', '.js');
}

let { include } = tsConfig;
for (item in include) {
  include[item][1] = include[item][1]
    .replace('src', 'build')
    .replace('.ts', '.js');
}

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths,
  include,
});
