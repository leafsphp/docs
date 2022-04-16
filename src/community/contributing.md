# Contribution Guide

Hi! I'm really excited that you are interested in contributing to Leaf. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)

## Pull Request Guidelines

- The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `dev`, and merge back against that branch.

- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

- If adding a new feature:

  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first with the `suggestion` or `feature request` tag and have it approved before working on it.

- If fixing bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide a detailed description of the bug in the PR.

## Development Setup

You will need PHP 7.2 + and [composer](https://getcomposer.org).

After cloning the repo, run:

```bash
composer install
```

## Project Structure

- **`src`**: contains the source code.

  - **`Exception/`**: contains code for the general leaf exceptions.

    This contains default error states and screens for errors, down-times and the like. It also contains extensible mark-up and logging to keep track of errors. Basically, anything relating to errors.

  - **`Helpers/`**: contains default leaf utilities like the container (DI container).

  - **`App.php`**: contains initializers and main leaf code.

  - **`Config.php`**: class for configuring how leaf behaves.

  - **`functions.php`**: Base functions for functional mode.

  - **`Middleware.php`**: base class for creating leaf middleware.

  - **`View.php`**: view config for leaf.

## Financial Contribution

As a pure community-driven project without any corporate backing, we also welcome financial contributions via OpenCollective.

- [Checkout our sponsor page](/support/)

## Credits

Thank you to all the people who have already contributed in code or cash to Leaf!

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/mychidarko">
        <img
          src="https://avatars.githubusercontent.com/u/26604242?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Michael Darko</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/matthewjamesr">
        <img
          src="https://avatars.githubusercontent.com/u/303321?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Matthew Reichardt</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ftonato">
        <img
          src="https://avatars.githubusercontent.com/u/5417662?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Ademílson F. Tonato</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/herber">
        <img
          src="https://avatars.githubusercontent.com/u/22559657?&v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Tobias Herber</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/pjotrsavitski">
        <img
          src="https://avatars.githubusercontent.com/u/518331?&v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Pjotr Savitski</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pablouser1">
        <img
          src="https://avatars.githubusercontent.com/u/17802865?&v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Pablo Ferreiro</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/monkeywithacupcake">
        <img
          src="https://avatars.githubusercontent.com/u/7316730?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>jess</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Awilum">
        <img
          src="https://avatars.githubusercontent.com/u/477114?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Sergey Romanenko</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/AshleySymbolic">
        <img
          src="https://avatars.githubusercontent.com/u/93997546?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Ashley</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/brykov">
        <img
          src="https://avatars.githubusercontent.com/u/476516?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Ivan Brykov</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ngekoding">
        <img
          src="https://avatars.githubusercontent.com/u/11625690?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Nur Muhammad</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/MauMaxxa">
        <img
          src="https://avatars.githubusercontent.com/u/10811652?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Mauro Callegari</b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Aminur670">
        <img
          src="https://avatars.githubusercontent.com/u/32174602?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Aminur Rahaman</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/divineniiquaye">
        <img
          src="https://avatars.githubusercontent.com/u/53147395?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Divine Niiquaye Ibok</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Rai-Rai">
        <img
          src="https://avatars.githubusercontent.com/u/2023869?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Rai-Rai</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Kristories">
        <img
          src="https://avatars.githubusercontent.com/u/774338?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Wahyu Kristianto</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/ezhasyafaat">
        <img
          src="https://avatars.githubusercontent.com/u/49098343?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Muhammad Ezha Syafaat</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/iamrameffort">
        <img
          src="https://avatars.githubusercontent.com/u/52138516?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Rafael M.</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pisyek">
        <img
          src="https://avatars.githubusercontent.com/u/10695986?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub>
          <b>Pisyek K.</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/wfsdaj">
        <img
          src="https://avatars.githubusercontent.com/u/36911167?v=4"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>wfsdaj</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://opencollective.com/aaron-smith3">
        <img
          src="https://images.opencollective.com/aaron-smith3/08ee620/avatar/256.png"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Aaron Smith</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://opencollective.com/peter-bogner">
        <img
          src="https://images.opencollective.com/peter-bogner/avatar/256.png"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Peter Bogner</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img
          src="https://images.opencollective.com/guest-32634fda/avatar.png"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Vano</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img
          src="https://images.opencollective.com/guest-c72a498e/avatar.png"
          width="60px"
          alt=""
        />
        <br />
        <sub><b>Casprine</b></sub>
      </a>
    </td>
  </tr>
</table>
