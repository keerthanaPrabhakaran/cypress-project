## Cypress Automated E2E Testing

This repository contains the code definitions referred to as "spec" files for automated tests utilising the [Cypress Automated Testing Framework](https://cypress.io).

### Installation;
1. Install and use Node Version 12 or 14 and above (NVM is highly recommended when working with multiple node versions). Tested and working with node version 10.16.0.
1. Enter the root directory of the project and execute `npm i`.
1. Install and use cypress version of 9.6.1
1. Configure the environment file by copying "cypress-env.json" and renaming the copy to "cypress.env.json", fill out the email and password. It's important to do this step otherwise cypress will not be able to execute tests as tests require an active login.

Additional installation steps that may be required for different systems can be found here: https://docs.cypress.io/guides/getting-started/installing-cypress

### Usage;
Run cypress with `npx cypress open` and then select the specific spec file to execute.

Run cypress through CLI with `npx cypress run`, note: this will instruct cypress to execute ALL spec files. Specify a single spec file with --spec "relative/path/to/file"

Run `npx cypress run --spec "cypress/integration/**/*.spec.js" > results.txt` to run all spec files in your local machine
### eslint;
Run `npm install eslint-plugin-cypress` and `npm install eslint -g` and then run `npm run lint` to see linting issues


### Note;
`https:/www.amazon.in` URL will be the correct initialization for active_url
using different URL may result in failing of test