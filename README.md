# Home Library Service. Part 1.

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
  Version **23** was used in development.

## Getting started

1. Run in terminal `git clone https://github.com/a-reznikov/nodejs2024Q3-service.git`
1. Go to the root dir of the project `cd nodejs2024Q3-service`
1. Switch branch: `git checkout feature/part-3-rest-service`
1. Install dependencies: `npm install`
1. Create `.env` file or rename `.env.example` to `.env`
1. Run application `npm run start`
1. Open documentation: http://localhost:PORT/doc/ as a default http://localhost:4000/doc/

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run test for checking refresh token:

```
npm run test:refresh
```

## Vulnerabilities scanning

Run in the terminal the following commands to scan images:

```
npm run docker:scan-app
npm run docker:scan-pg
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
