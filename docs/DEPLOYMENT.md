# Deployment

Below you'll find instructions on how to deploy with Vercel.

## Overview

[Getting Started](#getting-started)  
[Environment Variables](https://vercel.com/docs/environment-variables)  
[Deployment Types](#deployment-types)

## Getting Started

Vercel is a hosting platform for static sites and serverless functions. It's
used to host our Storybook and Next.js applications, as well our serverless API.

The [Vercel for GitHub][1] integration is used to deploy our applications by
pushing to GitHub. Vercel also provides support for preview and production
environment deployments.

## Environment Variables

Vercel supports adding environment variables for Development, Preview, and
Production environments. ​Vercel also provides a set of variables that can be
[automatically populated by the system][2].

For more information, see [Environment Variables][3] from the Vercel docs.

## Deployment Types

### Preview

> Preview deployments are the default for all deployments. Each time you push to
> a branch or make a deployment using the `vercel` command, this is a preview
> deployment.

### Production

> Production deployments are made in two different circumstances. Each time you
> merge to the Production Branch (commonly `main`) or make a deployment using
> the `vercel --prod` command, this is a production deployment.

For more information, visit [Deployment Types][4] from the Vercel docs.

[1]: https://vercel.com/docs/git/vercel-for-github
[2]: https://vercel.com/docs/environment-variables#system-environment-variables
[3]: https://vercel.com/docs/environment-variables
[4]: https://vercel.com/docs/platform/deployments#deployment-types
