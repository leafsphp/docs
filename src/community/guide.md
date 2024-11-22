---
sidebar: false
editLink: false
prev: false
next: false
lastUpdated: false
---

# Contribution Guide

Hi, Michael here! I'm thrilled that you'd like to contribute to the community. Your help is essential, and the team is grateful for it, whether you're fixing a bug, improving the documentation, suggesting new features, or sharing your experience with Leaf.

Before you get started, please take a moment to read through the following guidelines:

- [Leaf & Modules](#leaf-and-modules)
- [Documentation](#documentation)
- [Code of Conduct](#code-of-conduct)
- [Pull Request Guidelines](#pull-request-guidelines)

## Leaf and Modules

Leaf is built around the idea of simplicity and modularity so each part of Leaf can stand on its own and can be moved around without breaking the system. Leaf MVC builds a simple MVC structure around Leaf, with MVC Core linking it to the core. Contributions/Fixes to modules should avoid adding features that require MVC Core, as this would make the module dependent on MVC Core.

Another thing to note is you should try to follow the PSR-12 coding standard for consistent PHP code. Don't worry if it sounds scary, it's just a bunch of rules which focus on practices like indentation and naming. Additionally, prioritize making your code developer-friendly—easy to read, understand, and use. We've put a [compact guide](https://rebel-tibia-7d7.notion.site/2-Code-Quality-and-Reviews-183c0344a6cc43e7b3693880b0fb35a6) together for reference.

## Documentation

The documentation is the face of Leaf, and it's crucial to maintain its quality. We believe that good documentation fosters empathy and shapes the users' relationships with Leaf, going beyond describing code. To keep this system, be sure to explain concepts thoroughly so others can understand them, simplify complex ideas, and address the user's perspective and needs.

- Use headings that describe problems, not solutions, and introduce only one concept at a time. Avoid humor, jargon, and language that invalidates struggles (e.g., "easy" or "obvious"). Be specific, emotionally relevant, and use plain language.
Avoid repetitive content; link between sections instead. Use full names over abbreviations unless they’re part of the API. Prefer the Oxford comma and Title Case for headings.

- Writing improves through iteration—publish when content is "good" and refine based on feedback. Be open to constructive criticism and validate contributors' input with gratitude and empathy.
Create a safe space for reviewers by mirroring understanding, setting clear boundaries, and using kind communication.

- Avoid overusing special content blocks as they disrupt reading flow. Ensure context is clear within the narrative and avoid consecutive alerts.

## Code of Conduct

Our [Code of Conduct](/community/code-of-conduct) governs how we behave in public or in private whenever Leaf or its community is involved. We expect it to be honored by everyone who represents the Leaf community officially or informally, claims affiliation with the project, or participates directly. It applies to all of our spaces, including GitHub, Twitter, and other social media platforms.

## Pull Request Guidelines

We appreciate small, focused PRs. If you'd like to make an extremely large change, please communicate with team members prior to a pull request. Here's a [writeup that details why this is so critical](https://www.netlify.com/blog/2020/03/31/how-to-scope-down-prs/) for us to work well on this team. Please understand that though we always appreciate contributions, ultimately we have to prioritize what works best for the project as a whole.

## You're ready!

With that said, you're ready to start contributing to Leaf. If you're contributing to Leaf's core, you can find the source code [here](https://github.com/leafsphp/leaf). If you're contributing to a module, you can find the source code somewhere in our [GitHub organization](https://github.com/leafsphp). If you're contributing to the documentation, you can find the source code [here](https://github.com/leafsphp/docs).

Beyond contributing code, there are many ways to help Leaf grow:

- Report Issues: Submit detailed bug reports on the appropriate Leaf GitHub repository. Check for existing reports first to avoid duplicates.

- Join Discord: Connect with the community for support, project sharing, and Q&A. Help others or seek guidance for your contributions.

- Share Your Work: Let us know how you're using Leaf via Discord or Twitter. We love seeing community projects.

- Spread the Word: Promote Leaf by sharing it, writing blog posts, or creating tutorials to grow the community.

Your support is invaluable and helps make Leaf better for everyone!
