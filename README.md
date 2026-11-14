# GP Triage Demo

A browser-based workflow prototype for exploring GP triage, nurse review, and ambulance handover. It includes the main demo, ambulance and nurse views, and wireframes; it is for interface review and discussion, not operational care.

## Getting started

Requires Node.js 22.19+ and pnpm 10.30.3. From this repository root:

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Astro. The home page links to the workflow views.

### Commands

From the repository root, run `pnpm quality:all` and `pnpm build`.

## Security and Limitations

This prototype is not a clinical decision tool, patient record, or dispatch service. Use synthetic data only; do not enter real patient information or rely on it for care.

## Structure

`src/pages/` defines the home, ambulance, nurse, and wireframe routes. `src/components/` contains reusable workflow UI; Astro configuration is in `config/`.

## References

- [Astro configuration](config/astro.config.mjs)
- [MIT license](LICENSE)

## Contributing

Keep changes within the prototype scope.

## Credits and license

The repository declares the [MIT license](LICENSE).
