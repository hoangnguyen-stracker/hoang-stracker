# @stracker/360-shared-translation

Shared translations compiled by [ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
into native, zero-dependency, tree-shakeable TypeScript functions. Consumed by both the FO/BO
React apps and backend Lambdas so the same message catalog produces API error messages,
emails, and UI copy.

## Editing translations

Source of truth is `messages/en.json` / `messages/fr.json` (one flat catalog shared by both
apps — each app's bundler tree-shakes the `m.*` functions it doesn't reference).

- **From code**: edit the JSON files directly. `src/paraglide/**` (the compiled output) is
  gitignored and regenerated automatically by `rushx gen` / `rushx build` / `rushx test` —
  there's nothing to commit or run by hand beyond editing the JSON.
- **From the web (translators / non-developers)**: open
  [Fink](https://fink.inlang.com/github.com/STRACKER360/stracker-stack/apps/360/shared/translation/project.inlang)
  (append `?ref=<branch-name>` to work against a specific branch). Sign in with GitHub; Fink
  edits `messages/*.json` and commits directly to the branch. No local server to run.

## Usage

```ts
import { m } from '@stracker/360-shared-translation';

m.example_greeting({ name: 'Ada' }); // "Hello, Ada!"
```

To switch the active locale at runtime (e.g. alongside a frontend app's own language
switcher):

```ts
import { setLocale } from '@stracker/360-shared-translation';

setLocale('fr', { reload: false });
```

## DX

Install the [Sherlock VS Code extension](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension)
(recommended in this repo's `.vscode/extensions.json`) for inline message previews and
extraction while editing code that calls `m.*`.
