---
sidebar: false
editLink: false
prev: false
next: false
lastUpdated: false
---

# Releases

This document outlines the release process for Leaf. We don't have a fixed release cycle, but we do follow a few guidelines to ensure that we ship stable releases with new features and bug fixes. We use [Semantic Versioning](https://semver.org/) for versioning.

- Patch releases are released as needed.

- Minor releases always contain new features, with a typical time frame of 3~6 months in between. Minor releases always go through a beta pre-release phase.

- Major releases will be announced ahead of time, and will go through an early discussion phase and alpha / beta pre-release phases.

## Semantic Versioning Edge Cases

There are a cases where we may deviate from the strict SemVer rules:

### Deprecations

We may periodically deprecate features that have new, better replacements in minor releases. We may also switch our base supported version of PHP or other dependencies in minor releases. In these cases, we will bump the minor version number.

### RFCs

New features and major changes to Leaf will undergo the **Request for Comments** (RFC) process. This ensures a controlled and transparent path for introducing new features, allowing the community to participate in and provide feedback on the design process before changes are implemented. Features that are introduced through the RFC process will be considered stable and will not be subject to the usual deprecation rules.

### Security Releases

Security releases will be released as needed. We will always provide a security release for the latest minor version of Leaf. There are cases where fixing a security issue may require a breaking change, in which case we will release a new minor version.

## Latest Leaf Release

You can find the latest stable release of Leaf on our [GitHub page](https://github.com/leafsphp/leaf/releases/latest)

```markdown:no-line-numbers
```

<script>
  fetch("https://api.github.com/repos/leafsphp/leaf/releases/latest")
    .then(res => res.json())
    .then(data => {
      // get item with class language-md
      document.querySelector(".language-markdown").childNodes.item(2).innerHTML = `<code># ${data.name}</code>\n<code>${data.body}</code>`;
      // innerHTML = ` - ${new Date(data.published_at).toLocaleDateString()} ${data.body}`;
    });
</script>

## Latest Leaf MVC Release

The latest stable release of Leaf MVC can be found on the Leaf MVC GitHub releases page

```markdown
## v3.4 - 25 August 2024

### Added

- Added CSRF config file by @ibnsultan
- Added `SESSION_REDIRECT_ON_REGISTER` auth config

### Changed

- Switched internals to new Leaf config API

### Removed

- Discontinued custom public and assets paths
```
