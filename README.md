# GP Triage Demo

GP Triage Demo lets reviewers walk through a proposed patient handover journey before it is built.

## Get started

Requires Node.js 22.19+ and pnpm 10.30.3. From this repository root:

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Astro. The home page links to the workflow views.

From the repository root, run `pnpm quality:all` and `pnpm build`.

## Configuration

This prototype is not a clinical decision tool, patient record, or dispatch service. Use synthetic
data only; do not enter real patient information or rely on it for care.

## Validation

| Command                | Checks                        |
| ---------------------- | ----------------------------- |
| `pnpm run quality`     | Changed and untracked files   |
| `pnpm run quality:all` | Full configured Quality scope |
| `pnpm run test`        | Project test suite            |
| `pnpm run build`       | Build output                  |

Quality can apply safe fixes; review the diff before committing. No separate browser or Playwright
test command is defined here.

## Contributing

`src/pages/` defines the home, ambulance, nurse, and wireframe routes. `src/components/` contains
reusable workflow UI; Astro configuration is in `config/`.

Keep changes within the prototype scope.

Open a pull request against `development` and review the results of
[`repository-check.yml`](.github/workflows/repository-check.yml) before merging. Keep unrelated
changes out of the pull request.

## Documentation

- [Astro configuration](config/astro.config.mjs)
- [MIT license](LICENSE)

## License

The repository declares the [MIT license](LICENSE).
