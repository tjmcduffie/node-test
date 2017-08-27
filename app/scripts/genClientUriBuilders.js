#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const renderTemplate = require('~/app/scripts/templates/RouteURIBuilder.js');

const FILE_NAME_SUFFIX = 'URIBuilder';
const FILE_EXTENSION = '.js';
const REGEX_CONST = /(const (\w*)RoutePath(: string)? = (\'\/(.*)\');?)/;
const REGEX_INLINE =
  /(static getPath\(\): string {\n(\s*)return (\'\/(.*)\');\n)/;


const root = path.resolve(__dirname, '..', '..');
const dest = path.resolve(root, 'app', 'generated', 'routes');

const routeDirs = [
  path.resolve(root, 'app', 'api', 'routes'),
  path.resolve(root, 'app', 'web', 'routes'),
];


try {
  fs.mkdirSync(dest);
  console.log(chalk.gray(`creating ${dest}`));
} catch(e) {
  console.log(chalk.gray(`${dest} dir already exists`));
}

// build list of files to read
function createClientRoutesFromServerRoutes(dir, prefixRoot) {
  const parts = dir.split(path.sep);
  const rawprefix = parts[parts.length - 2];
  const prefix = (prefixRoot || '')
    + rawprefix.charAt(0).toUpperCase()
    + rawprefix.slice(1);
  let files = fs.readdirSync(dir);

  console.log(chalk.blue(`beginning section ${prefix}`));
  files
    .filter(filename => {
      return (
        !filename.startsWith('Base')
        && !filename.startsWith('Sample')
      );
    })
    .forEach(filename => {
      const resolvedPathToFile = path.resolve(dir, filename);
      const stats = fs.statSync(resolvedPathToFile);

      if (stats.isDirectory()) {
        return createClientRoutesFromServerRoutes(resolvedPathToFile, prefix);
      } else if (!stats.isFile()) {
        return;
      }

      // build destination name anad path
      const parsedname = path.parse(filename);
      const routeName = parsedname.name.replace('Route', '');
      const destFilename = `${prefix}${routeName}${FILE_NAME_SUFFIX}`;
      const destPath = path.format({
        dir: dest,
        ext: FILE_EXTENSION,
        name: destFilename,
      });

      const uri = extractPathFromRoute(resolvedPathToFile);
      if (uri) {
        return writeRouteFile(
          destPath,
          prefix + parsedname.name.replace('Route', ''),
          uri,
        );
      }
      console.log(chalk.gray(`  No route found in ${resolvedPathToFile}`));
    });
}

function extractPathFromRoute(serverRoutePath) {
  console.log(chalk.blue('  Creating content from:'), serverRoutePath);
  const content = fs.readFileSync(serverRoutePath, 'utf8');
  const const_matches = content.match(REGEX_CONST);
  const inline_matches = content.match(REGEX_INLINE);
  if (const_matches) {
    return const_matches[4]
  } else if (inline_matches) {
    return inline_matches[3];
  }
}

function writeRouteFile(filename, prefixedRoute, path) {
  console.log(chalk.blue('  Writing File:'), filename);
  const content = renderTemplate(prefixedRoute, path);
  fs.writeFileSync(filename, content);
}

routeDirs.forEach(dir => createClientRoutesFromServerRoutes(dir));
