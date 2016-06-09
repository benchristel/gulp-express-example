This repo is an experimentation ground for NodeJS build pipelines.

## Dev Dependencies

### Node 5

Node 6 is the latest version, but it has some incompatibilities with older versions of the `glob` package,
which are used by several of this project's dependencies. Here are the steps to downgrade:

```bash
brew update
brew tap homebrew/versions
brew unlink node
brew install homebrew/versions/node5
```
