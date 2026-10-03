# npm releases

Publication follows preact-fluent-ui: GitHub Release triggers npm trusted publishing
through OIDC. No NPM_TOKEN or NODE_AUTH_TOKEN is required.

## One-time npm setup

In the settings for @violice/rmu on npmjs.com, configure a GitHub Actions trusted
publisher:

| Field | Value |
| --- | --- |
| Organization or user | `violice` |
| Repository | `rmu` |
| Workflow filename | `publish.yml` |
| Environment name | Empty |
| Allowed actions | Direct `npm publish` allowed |

Configure this account setting before the first OIDC release. See
[npm's trusted publisher guide](https://docs.npmjs.com/trusted-publishers/).
The workflow uses GitHub-hosted Ubuntu, Node 24, npm 12.1.0 and id-token: write.
For public repositories and public packages, npm generates provenance automatically.

## Release a version

1. Update package.json and package-lock.json to a new unpublished version.
2. Run npm ci, npm run test:coverage, npm run build and npm run size.
3. Commit changes, create and push `v<package.version>` at that commit, then publish
   a GitHub Release for the tag. A tag push alone does not publish to npm.
4. Check the Publish workflow, then verify the exact version and provenance in
   the npm registry and install it in a fresh consumer.

The workflow checks the release commit, exact version tag, lockfile versions and
repository metadata. It builds, tests and checks the 2 KB size limit, then packs
once with scripts disabled. It records SHA-256, runs an npm publish dry run, and
uploads the archive and evidence. It checks the checksum and publishes that same
archive with public access and scripts disabled. The filename derives from npm
pack, so future versions do not require workflow edits.

The dry run checks package preparation, not an installed consumer or successful
publication. npm may take a few minutes to process a published version. Verify
registry availability before retrying publication.
