// paraglide-js always emits `src/paraglide/messages/package.json` with `"type": "module"`
// (correct for the ESM dist/ build). Heft's dual-emit copies that same file verbatim into
// lib-commonjs/ too, where it's wrong: it marks the CJS-transpiled .js files in that folder
// as ES modules, which breaks Node's `require()` resolution for anything under
// lib-commonjs/paraglide/messages/. Overwrite it to the correct type after each build.
const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'lib-commonjs',
  'paraglide',
  'messages',
  'package.json'
);

if (fs.existsSync(target)) {
  fs.writeFileSync(
    target,
    JSON.stringify({ sideEffects: false, type: 'commonjs' }, null, 2) + '\n'
  );
}
