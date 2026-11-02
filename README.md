# GP Triage Demo

A standalone static triage demo, moved out of Terra Symposium Docs. It includes the GP assessment, nurse intake, and ambulance dispatch workflows and can be run locally or hosted independently on Netlify.

## What it does

Not applicable.

## Prerequisites, setup, usage, and operations

### Get started

```sh
pnpm install
pnpm run dev
```

Open the local URL printed by Astro. Run `pnpm check` for type and Astro diagnostics, and `pnpm run build` to create the static site in `dist/`.

### Usage

Live demo: <https://gp-triage-demo.netlify.app>

### Deployment and operations

The site is configured for Netlify in `netlify.toml`. Connect this repository to Netlify and use the included build command (`pnpm run build`) and publish directory (`dist`). No runtime secrets or server functions are required.

## Configuration, security, data, privacy, and limitations

### Data, privacy, and limitations

#### Demo behavior
This is a simulation, not a clinical service. The forms do not send information to a server or dispatch service. Nurse intake adds a limited mock patient record to the browser's `terra-patients` local storage key, which is also read by the ambulance dispatch queue. Other entered fields remain in page memory.

The original general triage workflow is available at `/wireframes`, with a dedicated nurse intake at `/nurse` and the shared queue at `/ambulance`.

Do not enter real patient information.

## Development and structure

Not applicable.

## Validation

Not applicable.

## References

Not applicable.

## Contributing

Not applicable.

## Credits and license

### License
MIT. See [LICENSE](LICENSE).
