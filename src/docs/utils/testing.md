# Testing & Code Quality

Most PHP projects end up with the same pile of QA config: a `phpunit.xml`, a `.php-cs-fixer.php`, maybe a `rector.php` and a `phpstan.neon`, plus hand-written CI workflows to run them all. None of it is hard. It is just setup you have to get right in four different formats, and keep in sync forever.

Alchemy replaces that pile with one file. You describe what you want in `alchemy.yml`, and Alchemy handles the rest: tests with Pest or PHPUnit, code style with PHP CS Fixer, refactoring with Rector, static analysis with PHPStan, and CI pipelines for GitHub Actions, GitLab CI or CircleCI.

Alchemy works in any PHP project, not just Leaf. It detects Laravel, Symfony, Slim, Leaf or a plain composer setup and adapts.

## How Alchemy works

Before any config reference, here is the mental model. It is small:

1. **`alchemy.yml` is your QA policy.** Each tool gets a section: `tests`, `lint`, `refactor`, `analyse`, `actions`. A section existing means "I want this"; a missing section means the tool never runs or installs.
2. **Nothing installs until you use it.** Requiring Alchemy adds nothing else to your dependency tree. Pest arrives the first time you run your tests, Rector the first time you refactor, and always at the newest version your PHP supports.
3. **Real config is generated per run, then discarded.** When you run a command, Alchemy translates your yml into the tool's native config inside `.alchemy/`, runs the tool, and throws the config away. Your project root is never written. Only engine caches stick around, and `.alchemy` is gitignored for you.
4. **You can always leave.** `alchemy eject` exports real config files and rewires your composer scripts to call the engines directly. Your tests were plain Pest or PHPUnit tests all along.

That's it. Everything below is detail on top of these four ideas.

## Setting up

Leaf CLI will ask if you want Alchemy when you create a new project. To add it to an existing project:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install alchemy --dev
```

```bash:no-line-numbers [Composer]
composer require leafs/alchemy --dev
```

:::

Then initialize it:

```bash:no-line-numbers
./vendor/bin/alchemy init
```

`init` looks at your project before writing anything. It detects your framework, picks up the test engine you already use, and writes an `alchemy.yml` to match. If it finds existing tool configs (a `phpunit.xml`, a phpstan neon, a `rector.php`), it asks one question per file: **port it into `alchemy.yml`, or keep it?**

- **Port** translates the config into the yml, suites and rules and all. The original file is parked at `.alchemy/<file>.bak`, so your project root is clean with no extra steps.
- **Keep** records the file in your `alchemy.yml`, and Alchemy runs that tool from your file, as-is, forever. More on this [below](#using-your-own-config-files).

Prefer no prompts? `alchemy init --port` or `--keep` answers for every file at once. Either way, `init` also wires the commands below into your `composer.json`.

## Everyday commands

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf run test      # run your tests
leaf run lint      # check code style (changes nothing)
leaf run fmt       # fix code style
leaf run refactor  # apply Rector refactors
leaf run analyse   # run PHPStan static analysis
leaf run ci        # generate CI pipelines
leaf run alchemy   # run everything at once
```

```bash:no-line-numbers [Composer]
composer run test      # run your tests
composer run lint      # check code style (changes nothing)
composer run fmt       # fix code style
composer run refactor  # apply Rector refactors
composer run analyse   # run PHPStan static analysis
composer run ci        # generate CI pipelines
composer run alchemy   # run everything at once
```

:::

One split worth internalizing early: `lint` only reports and exits non-zero when style is off, which is what CI needs. `fmt` is the command that rewrites your files. `refactor` follows the same idea with a `--check` flag for CI.

## Testing

A minimal setup is two sections: where your code lives, and how to test it.

```yaml [alchemy.yml]
app:
  - app
  - src

tests:
  engine: pest # or phpunit
  parallel: true
  paths:
    - tests
  files:
    - '*.test.php'
```

`app` lists the directories with your application code. Coverage uses it, and lint, refactor and analyse default to it too, so you only say it once.

Inside `tests`:

- `engine`: `pest` or `phpunit`. Alchemy installs your pick on the first run. Parallel mode uses Pest's built-in runner, or paratest for PHPUnit.
- `paths` and `files`: where tests live and what they are called. The defaults are `tests/` and `*.test.php`.
- `flags`: standing flags passed to the engine on every run. Any Pest or PHPUnit option works. This is also where Pest 5's new toys live:

```yaml [alchemy.yml]
tests:
  engine: pest
  flags:
    - tia # Pest 5 Test Impact Analysis: only re-run tests affected by your changes
```

For a one-off run, pass flags on the command line instead: `composer run test -- --flags=tia`.

::: details The full phpunit.xml, without the XML
Everything you would normally reach into `phpunit.xml` for maps into the `tests` section: named suites, per-suite patterns and excludes, env/ini values, coverage excludes, and any root phpunit attribute passed through verbatim via `config`.

```yaml [alchemy.yml]
tests:
  engine: pest
  suites:
    Unit:
      paths:
        - tests/unit
    Feature:
      paths:
        - tests/feature
      files:
        - '*Test.php'
      exclude:
        - tests/feature/legacy
  config: # any phpunit.xml attribute, passed through as-is
    stopOnFailure: true
    executionOrder: random
  env:
    APP_ENV: testing
    DB_DATABASE: ':memory:'
  ini:
    memory_limit: 512M
  coverage:
    exclude:
      - src/legacy
```

:::

### Using your own config files

Any tool section can point at a file instead of holding a map. This is what a "keep" answer during `init` records, and you can write it yourself:

```yaml [alchemy.yml]
tests: phpunit.xml # run this tool from my file, as-is
analyse: phpstan.dist.neon
```

A map section is Alchemy-managed (generated per run, discarded after). A string section runs the engine directly against your file, untouched. Because the choice lives in `alchemy.yml`, CI and every teammate get the same behavior. As a safety net, a tool with no section at all still runs against a matching config file it finds in your project.

## Code style

Style checks run through PHP CS Fixer, configured from the `lint` section. Every rule from the [PHP-CS-Fixer Configurator](https://mlocati.github.io/php-cs-fixer-configurator/) works as-is:

```yaml [alchemy.yml]
lint:
  preset: PSR12
  risky: false # risky fixes are on by default
  exclude:
    - legacy
  rules:
    single_quote: true
    no_unused_imports: true
    array_syntax:
      syntax: short
```

Remember the split: `composer run lint` checks and fails, `composer run fmt` fixes. If you would rather have CI fix style *for* you, set `lint.autofix: true` and the generated GitHub workflow will commit fixes instead of failing (GitHub only).

## Automated refactoring

Alchemy manages [Rector](https://getrector.com) the same way. Add a `refactor` section and `composer run refactor` installs Rector and applies the refactors you opted into. Because Rector rewrites code, it only runs when this section exists.

```yaml [alchemy.yml]
refactor:
  php: '8.2' # upgrade sets targeting this PHP version (true = read from composer.json)
  sets:
    - dead-code
    - code-quality
    - type-declarations
  skip:
    - src/legacy
```

In CI, `composer run refactor -- --check` fails when refactors are pending, without changing anything.

::: details All available sets and options
All twenty of Rector 2's prepared sets are available, kebab-cased: `dead-code`, `code-quality`, `coding-style`, `type-declarations`, `type-declaration-docblocks`, `privatization`, `naming`, `named-args`, `instanceof`, `if`, `early-return`, `strict-booleans`, `carbon`, `rector-preset`, `phpunit-code-quality`, `phpunit-narrow-asserts`, `phpunit-mock-to-stub`, `doctrine-code-quality`, `symfony-code-quality`, `symfony-configs`.

Other keys: `paths` (defaults to your app directories), `import-names: true` (import FQCNs and drop unused imports), `fluent-new-line: true`, and `downgrade: '8.0'` to rewrite syntax down to an older PHP version.
:::

## Static analysis

Add an `analyse` section and PHPStan is installed and configured on your first `composer run analyse`:

```yaml [alchemy.yml]
analyse:
  level: 6 # 0 (loose) to 10 (strict)
  ignore:
    - '#some error pattern to ignore#'
```

Analysis is check-only by nature: it exits non-zero when it finds problems, locally and in CI.

Two things happen for you automatically. A `phpstan-baseline.neon` at your project root is included if present (or point `analyse.baseline` elsewhere). And on Pest projects, when your analyse paths cover your tests, Alchemy installs [Pest's first-party PHPStan plugin](https://pestphp.com/docs/pest5-now-available) and wires it in, so `it()`, `expect()` and Pest's `$this` binding analyse cleanly.

::: details Any phpstan parameter works
Any key under `analyse` that Alchemy doesn't recognize is passed through to phpstan verbatim, so the section is never less expressive than a hand-written neon file:

```yaml [alchemy.yml]
analyse:
  level: 8
  includes:
    - vendor/phpstan/phpstan/conf/bleedingEdge.neon
  excludePaths:
    - tests
  treatPhpDocTypesAsCertain: false
```

:::

## Continuous integration

The `actions` section describes what CI should run, and where. Alchemy generates pipelines for one or more providers from the same configuration:

```yaml [alchemy.yml]
actions:
  provider: github # or gitlab, circleci, or a list of them
  run:
    - lint
    - tests
    - analyse
  php:
    versions:
      - '8.2'
      - '8.3'
  events:
    - push
    - pull_request
```

`composer run ci` writes `.github/workflows/*.yml`, `.gitlab-ci.yml`, or `.circleci/config.yml` depending on your providers. Lint, refactor and analyse jobs all run in check mode: CI gates your code, it never rewrites it. GitHub configs also take `os` for a runner matrix, and `php.extensions` for extensions.

Generated CI files carry a `# Generated by Leaf Alchemy` header and are regenerated on every run, so action versions and pipeline fixes stay current when you update Alchemy. Remove the header from a file to take ownership, and Alchemy will never touch it again.

Moving CI providers is one command, because everything is generated from the same yml:

```bash:no-line-numbers
./vendor/bin/alchemy switch gitlab --clean
```

This updates your config, generates the new provider's pipeline, and removes the old provider's files (`--clean`). The same command switches test engines: `alchemy switch phpunit`.

## Upgrading from Alchemy 4

Alchemy 5 grows from a test/lint setup helper into the full pipeline on this page. **Your existing setup keeps working**: the old commands (`alchemy setup --test`, `--lint`, `--actions`) still exist as aliases, so v4-era composer scripts run unchanged.

The upgrade for existing projects:

```bash:no-line-numbers
composer require leafs/alchemy:^5.0 --dev
./vendor/bin/alchemy init --force   # refreshes composer scripts + asks port-or-keep for your configs
```

Then use the new commands: `composer run test`, `lint`, `fmt`, `refactor`, `analyse`, `ci`.

### Behavior changes to know about

1. **Exit codes are real now.** Alchemy 4 always exited `0`, even when your tests failed, so CI built on it could never go red. Alchemy 5 propagates real exit codes. If your pipeline starts failing after upgrading, that's the fix working: it was failing before too, silently.
2. **Lint checks, `fmt` fixes.** `composer run lint` fails on violations without rewriting anything (this is what generated CI runs), and `composer run fmt` does what `lint` used to do. Want CI to auto-commit style fixes instead of failing, like v4 did? Set `lint.autofix: true` (GitHub only).
3. **`event:` is now `events:`.** v4's stub wrote `event:` but the code read `events`, so custom CI triggers were silently ignored and every workflow ran on `push` only. Both keys are accepted, but rename to `events:` and your configured triggers actually apply.
4. **PHPUnit parallel uses paratest.** `tests.parallel: true` with the phpunit engine used to pass a `--parallel` flag PHPUnit doesn't have. Alchemy 5 installs and runs paratest instead. Pest keeps its built-in parallel mode.
5. **Your `phpunit.xml` is safe, and never touched.** v4 could overwrite and delete a hand-written `phpunit.xml`. Alchemy 5 generates its config inside `.alchemy/` and discards it after the run. `alchemy init` asks whether to port your config into `alchemy.yml` (the original is parked at `.alchemy/phpunit.xml.bak`) or pin it (`tests: phpunit.xml`) and run from your file forever.
6. **`config:eject` is now `eject`, and it works.** The old eject command targeted a config format that no longer existed. `alchemy eject` exports a real `phpunit.xml` + `.php-cs-fixer.dist.php` and rewires your composer scripts to call the engines directly.

### Unpin your engines

Older alchemy versions installed engines with `composer require pestphp/pest --dev`, which froze the constraint at whatever major was current, so newer majors never arrive even on a PHP that supports them. Alchemy 5 installs with `pestphp/pest:*` instead: composer always resolves the newest version your PHP allows. If your composer.json carries an old pin, unpin once and you're future-proof:

```bash:no-line-numbers
composer require 'pestphp/pest:*' --dev --with-all-dependencies
```

(Same idea for `phpunit/phpunit`, `phpstan/phpstan` or `rector/rector` if an older setup pinned them.)

### Config keys that moved

| v4 | v5 |
| --- | --- |
| `actions.event` | `actions.events` (old key still read) |
| `tests.config.xmlnxsi` | `tests.config['xmlns:xsi']` (old key still read) |
| — | `tests.suites`, `tests.env/ini/const/server`, `tests.coverage.exclude`, `tests.extensions`, `tests.flags` |
| — | `lint.risky`, `lint.exclude`, `lint.autofix` |
| — | `refactor.*`, `analyse.*`, `actions.provider` |

## Leaving Alchemy

No lock-in means a real exit:

```bash:no-line-numbers
./vendor/bin/alchemy eject
```

This exports your configuration to a standard `phpunit.xml` and `.php-cs-fixer.dist.php`, points your composer `test`/`lint` scripts directly at the engines, and tells you how to remove Alchemy. Your tests don't change. They were always plain Pest/PHPUnit tests.
