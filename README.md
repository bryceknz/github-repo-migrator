# GitHub repo migrator
Migrate your GitHub repo and issues from one org to another - programmatically!

## How to use
1. Create GitHub user agent [here](https://github.com/settings/tokens) and populate the field in `.env`
1. Populate _org_, _repo_, and _user agent_ fields in `config.js`
1. Run npm scripts as required (`start` will migrate the labels, then milestones, then issues)

## Todo
- Refactor duplicate code
