# Testing & Code Quality

Every serious codebase ends up with the same pile of QA config: a `phpunit.xml`, a `.php-cs-fixer.php`, maybe a `rector.php` and a `phpstan.neon`, plus hand-written CI workflows that run them all. None of it is hard — it's just setup you have to get right in four different formats.

Alchemy replaces that pile with one file. You describe your QA policy in `alchemy.yml`, and Alchemy installs the right tools, generates their config, runs them, and writes your CI pipelines — for tests (Pest or PHPUnit), code style (PHP CS Fixer), automated refactoring (Rector), static analysis (PHPStan), and CI on GitHub Actions, GitLab CI or CircleCI.

Two things Alchemy promises:

- **Nothing installs until you use it.** Requiring Alchemy adds nothing to your dependency tree — Pest arrives the first time you run your tests, Rector the first time you refactor, and so on.
- **No lock-in.** `alchemy init` asks whether to port your existing configs into `alchemy.yml` or keep running them as-is — your choice, recorded in the file — and `alchemy eject` exports real config files if you ever want to leave.

## Any stack. Pest 5, day one. <Badge type="tip" text="NEW" />

Alchemy is not a Leaf thing — it's a PHP thing. `init` detects Laravel, Symfony, Slim, Leaf, or a plain composer project and adapts to it, and every engine is installed at the newest version your PHP supports.

That matters right now, because [Pest 5 just landed](https://pestphp.com/docs/pest5-now-available) — Test Impact Analysis, time-balanced sharding, a first-party PHPStan plugin, Rector rules — and it still reads its config from a `phpunit.xml`, sitting next to your neon file, your `rector.php`, and your hand-written workflows. Alchemy folds the whole thing into the one file you already have:

```yaml [alchemy.yml]
tests:
  engine: pest
  flags:
    - tia # Pest 5: only re-run tests affected by your changes

analyse:
  level: 9

refactor:
  sets:
    - phpunit-code-quality
```

- `flags: [tia]` turns on Test Impact Analysis on every run; `shard=1/4` splits CI machines by real execution time.
- When your analyse paths cover your tests, Alchemy installs and wires Pest's PHPStan plugin automatically, so `it()`, `expect()` and Pest's `$this` binding analyse clean — no neon editing.
- Pest's Rector rules drop into `refactor.rules` like any other rule class.

Pest 5 users have been asking why a modern test runner still needs a pile of XML and neon around it. It doesn't — that pile is exactly what `alchemy.yml` retires.

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

`init` looks at your project before writing anything: it detects your framework from composer.json (Leaf, Laravel, Symfony, Slim, or plain PHP) and picks up the test engine you already use. For every tool config it finds — `phpunit.xml`, a php-cs-fixer config, a phpstan neon file, a `rector.php` — it asks one question: **port it into `alchemy.yml`, or keep it?**

- **Port** translates your config into the yml — named test suites, env variables, style rules, phpstan parameters, rector sets and all — and the original is parked at `.alchemy/<file>.bak` automatically, so your project root is clean with zero extra steps.
- **Keep** records the choice as a pinned file in your `alchemy.yml` (see below), and Alchemy runs that tool from your file, as-is, forever.

Run `alchemy init --port` or `--keep` to answer for every tool without prompts (non-interactive runs default to keep). Either way, `init` wires the commands below into your `composer.json`.

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

`lint` only reports — it exits non-zero when style is off, which is exactly what CI needs. `fmt` is the one that rewrites your files. The same split applies to `refactor`, which takes a `--check` flag in CI.

## Testing

Tests live in `tests/` and use the `.test.php` suffix by default. The engine is Pest unless you say otherwise — switch to PHPUnit with one line, and Alchemy installs whichever engine you picked on the first run.

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

- `app`: the directories that contain your application code — used for coverage and shared by lint, refactor, and analyse below.
- `tests.engine`: `pest` or `phpunit`. Parallel runs use Pest's built-in mode, or paratest for PHPUnit — installed automatically.
- `tests.paths` / `tests.files`: where tests live and what they're called.
- `tests.flags`: standing flags passed to your engine on every run — any Pest or PHPUnit option works, including Pest 5's newest:

```yaml [alchemy.yml]
tests:
  engine: pest
  flags:
    - tia # Pest 5 Test Impact Analysis — only re-run affected tests
```

One-off flags work from the command line too: `composer run test -- --flags=tia` (comma-separate several).

### The full phpunit.xml, without the XML

Everything you'd normally reach into `phpunit.xml` for maps into the `tests` section — named suites, per-suite file patterns and excludes, env/ini values for your test environment, coverage excludes, and any root phpunit attribute passed through verbatim via `config`:

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

### Using your own config files

Any tool section can be pinned to a file instead of a map — the recorded "keep" answer from `alchemy init`, or something you write yourself:

```yaml [alchemy.yml]
tests: phpunit.xml # run this tool from my file, as-is
analyse: phpstan.dist.neon
```

A map section is Alchemy-managed: config is generated fresh for the run inside `.alchemy/` and discarded when the run ends — only engine caches stick around, and your project root is never written. A string section runs the engine directly against your file, untouched. Because the choice lives in `alchemy.yml`, CI and every teammate get the same behavior. (And as a safety net, a tool with no section at all still runs on a matching config file it finds in your project.)

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

Remember the split: `composer run lint` checks and fails, `composer run fmt` fixes. If you'd rather have CI fix style *for* you, set `lint.autofix: true` and the generated GitHub workflow will commit style fixes instead of failing (GitHub only).

## Automated refactoring <Badge type="tip" text="NEW" />

Alchemy manages [Rector](https://getrector.com) the same way — add a `refactor` section and `composer run refactor` installs Rector and applies the refactors you've opted into. Because Rector rewrites code, it only runs when this section exists.

```yaml [alchemy.yml]
refactor:
  php: '8.2' # upgrade sets targeting this PHP version (true = read from composer.json)
  sets: # rector's prepared sets
    - dead-code
    - code-quality
    - type-declarations
  skip:
    - src/legacy
  paths: # defaults to your app directories
    - src
    - tests
  import-names: true # import FQCNs and drop unused imports
  fluent-new-line: true
  # downgrade: '8.0' — rewrite syntax DOWN to an older PHP version
```

All twenty of Rector 2's prepared sets are available, kebab-cased: `dead-code`, `code-quality`, `coding-style`, `type-declarations`, `type-declaration-docblocks`, `privatization`, `naming`, `named-args`, `instanceof`, `if`, `early-return`, `strict-booleans`, `carbon`, `rector-preset`, `phpunit-code-quality`, `phpunit-narrow-asserts`, `phpunit-mock-to-stub`, `doctrine-code-quality`, `symfony-code-quality`, `symfony-configs`.

In CI, `composer run refactor -- --check` fails when refactors are pending, without changing anything.

## Static analysis <Badge type="tip" text="NEW" />

Add an `analyse` section and PHPStan is installed and configured on your first `composer run analyse`:

```yaml [alchemy.yml]
analyse:
  level: 6 # 0 (loose) to 10 (strict)
  ignore:
    - '#some error pattern to ignore#'
```

Analysis is check-only by nature: it exits non-zero when it finds problems, both locally and in CI.

Pest projects get one extra nicety: when your analyse paths cover your tests, Alchemy installs [Pest's first-party PHPStan plugin](https://pestphp.com/docs/pest5-now-available) alongside PHPStan and wires it into the generated config, so `it()`, `expect()` and Pest's `$this` binding analyse cleanly instead of raising false positives (Pest 5 on PHP 8.4).

A `phpstan-baseline.neon` at your project root is included automatically (or point `analyse.baseline` at another file), and **any other key under `analyse` is passed through to phpstan verbatim** — so the section is never less expressive than a hand-written neon file:

```yaml [alchemy.yml]
analyse:
  level: 8
  includes:
    - vendor/phpstan/phpstan/conf/bleedingEdge.neon
  excludePaths:
    - tests
  treatPhpDocTypesAsCertain: false # any phpstan parameter works here
```

## Continuous integration

The `actions` section describes what CI should run — and where. Alchemy generates pipelines for one or more providers from the same configuration:

```yaml [alchemy.yml]
actions:
  provider: github # or gitlab, circleci — or a list of them
  run:
    - lint
    - tests
    - refactor
    - analyse
  os: # github only
    - ubuntu-latest
  php:
    extensions: json, zip
    versions:
      - '8.2'
      - '8.3'
  events:
    - push
    - pull_request
```

`composer run ci` writes `.github/workflows/*.yml`, `.gitlab-ci.yml` (with a PHP version matrix and composer caching), or `.circleci/config.yml` depending on your providers. Lint, refactor and analyse jobs all run in check mode — CI gates your code, it never rewrites it.

Generated CI files carry a `# Generated by Leaf Alchemy` header and are **regenerated on every run**, so action versions and pipeline fixes stay current when you update Alchemy. Remove the header from a file to take ownership — Alchemy will never touch it again.

### Switching providers <Badge type="tip" text="NEW" />

Because everything is generated from `alchemy.yml`, moving CI is one command:

```bash:no-line-numbers
./vendor/bin/alchemy switch gitlab --clean
```

This updates your config, generates the new provider's pipeline, and removes the old provider's files (`--clean`). The same command switches test engines — `alchemy switch phpunit` — with the new engine installed on your next test run.

## Upgrading from Alchemy 4

Alchemy 5 grows from a test/lint setup helper into the full QA pipeline described on this page. **Your existing setup keeps working** — the old commands (`alchemy setup --test`, `--lint`, `--actions`) still exist as aliases, so v4-era composer scripts run unchanged.

The upgrade for existing projects:

```bash:no-line-numbers
composer require leafs/alchemy:^5.0 --dev
./vendor/bin/alchemy init --force   # refreshes composer scripts + asks port-or-keep for your configs
```

Then use the new commands: `composer run test`, `lint`, `fmt`, `refactor`, `analyse`, `ci`.

### Behavior changes to know about

1. **Exit codes are real now.** Alchemy 4 always exited `0`, even when your tests failed — CI built on it could never go red. Alchemy 5 propagates real exit codes. If your pipeline suddenly starts failing after upgrading, *that's the fix working*: it was failing before too, silently.
2. **Lint checks, `fmt` fixes.** `composer run lint` fails on violations without rewriting anything (this is what generated CI runs), and `composer run fmt` is the command that fixes your code — what `lint` used to do. Want CI to auto-commit style fixes instead of failing (the v4 behavior)? Set `lint.autofix: true` (GitHub only). Risky fixes are still on by default; disable with `lint.risky: false`.
3. **`event:` is now `events:`.** v4's stub wrote `event:` but the code read `events`, so custom CI triggers were silently ignored and every workflow ran on `push` only. Both keys are accepted, but rename to `events:` and your configured triggers actually apply.
4. **PHPUnit parallel uses paratest.** `tests.parallel: true` with the phpunit engine used to pass a `--parallel` flag PHPUnit doesn't have. Alchemy 5 installs and runs paratest instead (Pest keeps its built-in parallel mode).
5. **Your `phpunit.xml` is safe — and never touched.** v4 could overwrite and delete a hand-written `phpunit.xml`. Alchemy 5 generates its config inside `.alchemy/` and discards it after the run — your root files are never written. `alchemy init` asks whether to port your config into `alchemy.yml` (the original is parked at `.alchemy/phpunit.xml.bak`) or pin it (`tests: phpunit.xml`) and run from your file forever.
6. **`config:eject` is now `eject` — and it works.** The old eject command targeted a config format that no longer existed. `alchemy eject` exports a real `phpunit.xml` + `.php-cs-fixer.dist.php` and rewires your composer scripts to call the engines directly.

### Unpin your engines

Older alchemy versions installed engines with `composer require pestphp/pest --dev`, which froze the constraint at whatever major was current (`^2.0`, `^3.8`, …) — so newer majors never arrive even on a PHP that supports them. Alchemy 5 installs with `pestphp/pest:*` instead: composer always resolves the newest version your PHP allows. If your composer.json carries an old pin, unpin once and you're future-proof:

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

This exports your configuration to a standard `phpunit.xml` and `.php-cs-fixer.dist.php`, points your composer `test`/`lint` scripts directly at the engines, and tells you how to remove Alchemy. Your tests don't change — they were always plain Pest/PHPUnit tests.
