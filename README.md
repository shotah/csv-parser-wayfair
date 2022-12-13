# Favicon Finder

#### Project

This project is a test piece to be able to stand up a react site and use components to take in an CSV spreadsheet and to search for Favicons and domains provided on CSV file. Choice was made to use react-bootstrap components to fill out this site. Nextjs was used as a test piece to include a frontend and backend server as one framework.

#### Lessons Learned

Nextjs is a great framework for a quick site to standup and use api routing from, but tends to break down when more complex calls to many resources and enablign proxy servers to handle external calls. Something like ExpressJs is still required.

#### Open Todo's:

- Validate CSV Columns on CSV input.
- Add ExpressJs Proxy server to handle CORS rewrite requests with http-proxy-middleware
  - Open issue with how to get all domains from CSV to ExpressJs middleware
- Add test and mock AXIOS calls once proxy is implemented.
- Add tests for pages that are not yet covered by current tests.
  - Table
  - Navbar
  - About
  - Header
  - Footer

## How to:

#### Getting Started

1. Load npm packages by first cd into the root folder containd package.json
2. run `npm install` to download and install required packages
3. Use the run command to stand up the dev environment `npm run dev`
4. Linting and Testing can both be ran by using run commands
   1. linting `npm run lint:fix`
   2. testing `npm run test`
5. All set! See below for more detailed outlines.

#### Linting

1. Created next linting commands in scripts, please use npm run lint.
1. For auto fixing use npm run lint:fix
1. Edit .eslintrc.json/.prettierrc.json as nessary to get desired style guides.

#### Unit Testing

1. Use scripts that call jest. Example npm run test.
1. Update snapshots as expected with npm run test:snapshot
1. Use continious testing by running npm run test:watch

#### Running Local in Dev Mode

1. Start the development server by running npm run dev.
1. Browse to http://localhost:3001 (Port defined in package.json)
1. Review settings and changes.

```bash
npm run dev
```

### Running Nextjs as Production

1. Build your Nextjs package first by using `npm run build`
2. Then start your Nextjs server by running `npm run start`

#### Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Use docker:build to build image from Package.json scripts.
1. Use docker:run to test image from Package.json scripts.
1. Clean/Remove your image with docker:clean to test your new docker image.

```bash
npm run docker:build
npm run docker:run
npm run docker:clean
```

#### Setting up API and Routes

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### About Nextjs

[Nextjs.org](https://nextjs.org/)
Next.js aims to have best-in-class developer experience and many built-in features, such as:

- An intuitive page-based routing system (with support for dynamic routes)
- Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are \* supported on a per-page basis
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- Built-in CSS and Sass support, and support for any CSS-in-JS library
- Development environment with Fast Refresh support
- API routes to build API endpoints with Serverless Functions
- Fully extendable

[Nextjs Example Library](https://nextjs.org/examples)

#### Nextjs With Docker

This deployment uses Docker with Next.js based on the [deployment documentation](https://nextjs.org/docs/deployment#docker-image). Additionally, it contains instructions for deploying to Google Cloud Run. However, you can use any container-based deployment to any host.

#### Deploying to Google Cloud Run

The `start` script in `package.json` has been modified to accept a `PORT` environment variable (for compatibility with Google Cloud Run).

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) so you can use `gcloud` on the command line.
1. Run `gcloud auth login` to log in to your account.
1. [Create a new project](https://cloud.google.com/run/docs/quickstarts/build-and-deploy) in Google Cloud Run (e.g. `nextjs-docker`). Ensure billing is turned on.
1. Build your container image using Cloud Build: `gcloud builds submit --tag gcr.io/PROJECT-ID/helloworld --project PROJECT-ID`. This will also enable Cloud Build for your project.
1. Deploy to Cloud Run: `gcloud run deploy --image gcr.io/PROJECT-ID/helloworld --project PROJECT-ID --platform managed`. Choose a region of your choice.

   - You will be prompted for the service name: press Enter to accept the default name, `helloworld`.
   - You will be prompted for [region](https://cloud.google.com/run/docs/quickstarts/build-and-deploy#follow-cloud-run): select the region of your choice, for example `us-central1`.
   - You will be prompted to **allow unauthenticated invocations**: respond `y`.
