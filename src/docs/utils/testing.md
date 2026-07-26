# Testing & Code Quality

Every serious codebase ends up with the same pile of QA config: a `phpunit.xml`, a `.php-cs-fixer.php`, maybe a `rector.php` and a `phpstan.neon`, plus hand-written CI workflows that run them all. None of it is hard — it's just setup you have to get right in four different formats.

Alchemy replaces that pile with one file. You describe your QA policy in `alchemy.yml`, and Alchemy installs the right tools, generates their config, runs them, and writes your CI pipelines — for tests (Pest or PHPUnit), code style (PHP CS Fixer), automated refactoring (Rector), static analysis (PHPStan), and CI on GitHub Actions, GitLab CI or CircleCI.

Two things Alchemy promises:

- **Nothing installs until you use it.** Requiring Alchemy adds nothing to your dependency tree — Pest arrives the first time you run your tests, Rector the first time you refactor, and so on.
- **No lock-in.** Your existing `phpunit.xml` is never touched, `alchemy init` can import the config you already have, and `alchemy eject` exports real config files if you ever want to leave.

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

`init` looks at your project before writing anything: it detects your framework from composer.json (Leaf, Laravel, Symfony, Slim, or plain PHP), picks up the test engine you already use, and — if you have an existing `phpunit.xml` or php-cs-fixer config — **imports it into your new `alchemy.yml`**, named test suites, env variables, style rules and all. It also wires the commands below into your `composer.json`.

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

If your project already has a hand-written `phpunit.xml`, Alchemy leaves it alone — it parks your file during a run and restores it after. Run `alchemy init` to translate it into `alchemy.yml` whenever you're ready.

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

Alchemy manages [Rector](https://getrector.com) the same way — add a `refactor` section and `composer run refactor` installs Rector and applies the refactors you've opted into. Because Rector rewrites code, it only joins the all-in-one `alchemy` command when this section exists.

```yaml [alchemy.yml]
refactor:
  php: '8.2' # upgrade sets targeting this PHP version (true = read from composer.json)
  sets: # rector's prepared sets
    - dead-code
    - code-quality
    - type-declarations
  skip:
    - src/legacy
```

In CI, `composer run refactor -- --check` fails when refactors are pending, without changing anything.

## Static analysis <Badge type="tip" text="NEW" />

Add an `analyse` section and PHPStan is installed and configured on your first `composer run analyse`:

```yaml [alchemy.yml]
analyse:
  level: 6 # 0 (loose) to 9 (strict)
  ignore:
    - '#some error pattern to ignore#'
```

Analysis is check-only by nature: it exits non-zero when it finds problems, both locally and in CI.

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

### Switching providers <Badge type="tip" text="NEW" />

Because everything is generated from `alchemy.yml`, moving CI is one command:

```bash:no-line-numbers
./vendor/bin/alchemy switch gitlab --clean
```

This updates your config, generates the new provider's pipeline, and removes the old provider's files (`--clean`). The same command switches test engines — `alchemy switch phpunit` — with the new engine installed on your next test run.

## Leaving Alchemy

No lock-in means a real exit:

```bash:no-line-numbers
./vendor/bin/alchemy eject
```

This exports your configuration to a standard `phpunit.xml` and `.php-cs-fixer.dist.php`, points your composer `test`/`lint` scripts directly at the engines, and tells you how to remove Alchemy. Your tests don't change — they were always plain Pest/PHPUnit tests.
