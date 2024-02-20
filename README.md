# File Boxes

File Boxes is a simple application for storing and downloading CSV files.

## Installation

After cloning this repository to your local machine, use the package manager [pnpm](https://pnpm.io/installation) to install File Boxes.

```bash
pnpm install
```

npm will work fine as well!

### Node.js

This project requires Node.js v.20.5.1+.

## Vercel and MongoDB integration

To deploy and preview during development, head to [Vercel](https://vercel.com) and create an account if necessary.

Connect GitLab to your account and select the File Boxes repo that you've cloned or forked.

Set the Node.js version to 20.x.x in Settings.

**Note: the first build and deploy may fail because the necessary environment variables aren't inputted yet. Please see below.**

### MongoDB

The easiest way to get set up with mongoDB is to use the [Vercel mongoDB integration](https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/). This will guide you through creating a mongoDB Atlas account, organisation (if necessary) and cluster.

Once the wizard is complete, you'll see `MONGODB_URI` in your Vercel project's environment variables. Create a file called `.env.local` in your local repository and copy this environment variable to it.

## Amazon AWS S3

File Boxes stores the CSV files in an S3 bucket, so an AWS account with an IAM User and an S3 bucket is necessary.

You'll need to create [Access Keys]('https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html') for your IAM User and take note of your S3 Bucket's region and name.

To both your `.env.local` and Vercel environment variables (in Settings), please add:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_bucket_region
AWS_BUCKET_NAME=your_bucket_name
```

## Development Server

To run the development server, run

```bash
pnpm dev
```

or

```bash
pnpm devt
```

to make use of Next.js's TurboPack feature for significantly faster compile times.

## Some notes on architecture

The first thing you might notice is that this isn't a traditional application with a strong boundary between server and front end. There _is_ a boundary, but it's a bit more subtle.

This application makes use of React Server Components that have access to a Node.js environment. It also makes use of Server Actions, which are similar but don't include any JSX (or TSX, in this case).

I went this way for a few reasons:

- Less boilerplate and setup to get started and to get it deployed. No monorepo, no microservices, no Docker containers, etc.
- React's newer features are tied closely to Next.js, which is tied closely to Vercel, in turn. The Vercel preview deployments on pull requests and automated production deployments are really handy and simple to set up.
- It's pretty bleeding-edge technology, but I'm enthusiastic about where React is headed so I wanted to dive in and give it a go.
- I wanted to experiment with data-fetching on the server before rendering on the client, reducing the need for an extra client-server round-trip. Next.js v13+ and React 18 have quite a nice developer experience for this.

## Some Key Improvements

- Form validation. This could be achieved with Formik and formik-mui. Because this project uses Zod for parsing data, the zod-formik-adapter could be used to validate the forms with the schemas that have already written.
- Better feedback on user actions. So far, there's feedback for updating File Boxes, but not for creation. However, because we're invalidating the cache after mutations, the changes are fairly easy to spot.
- A transaction when creating and updating File Boxes. There are two operations: mongoDB and S3. If the subsequent operation (saving to S3) fails, the mongoDB insertion/modification should roll back.
- Authentication and authorization! I'm sad that I didn't make it to this, but it would've been fun to implement them.
- Database and S3 bucket security. It would be better to have some stronger policies. This job would tie in well with the authentication/authorization job.
- The ability to view the CSV data in the app. This looks like a fun thing to build too!

Thanks for reading and having a look at my repo. Please let me know if you have any issues with the dev server or with deployment.
