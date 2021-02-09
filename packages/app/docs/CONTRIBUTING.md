# Contributing

These instructions will help you develop and test new features.

## Overview

[Getting Started](../../../docs/CONTRIBUTING.md)  
[Development Environment](#developent-environment)  
[Integrations](#integrations)  
[Making Changes](#making-changes)  
[Testing](#testing)  
[Build Workflow](#build-workflow)

## Development Environment

Retrieve the following files from a development admin:

- `.env.production.local`
- `.env.test.local`

Place them in the root of the storefront application directory.

## Integrations

### AddThis

[AddThis][1] is a content sharing platform. In addition to providing content
sharing tools, AddThis provides tool for following, related posts, social
analytics, and Audience Targeting tools.

### Google Analytics

[Google Analytics][2] is a web analytics service that tracks and reports website
traffic.

The storefront uses the [Measurement Protocol for Universal Analytics][3] to
track page views, web vitals, and errors.

**Environment Variables**

- `GA_TRACKING_ID`
- `VERCEL_ENV`
- `VERCEL_GIT_COMMIT_REF`
- `VERCEL_GIT_COMMIT_SHA`

### KAPI

The [Morena's Kustomz Serverless API (KAPI)][4] is used to fetch and search for
Shopify resources, as well as fetch the data for the store `Layout` component.

**Environment Variables**

- `API_URL`

### Opsgenie

[Opsgenie][5] is an on-call and alert management service for software projects.

Its primary use is to dispatch alerts from [GitHub][6] and [Sentry][7].

### Sentry

[Sentry][8] is an error monitoring service. When an issue is reported, a message
will be sent to the `#opsgenie` channel in this project's Slack workspace.

**Environment Variables**

- `SENTRY_AUTH_TOKEN`
- `SENTRY_DSN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_RELEASE`

## Making Changes

### Config

Directory: `src/config`

### Pages

Directory: `src/pages`

For more information, see the [Next.js Pages documentation][9].

### Subdomains

Directory: `src/subdomains`

Components, utilities, and other modules grouped by feature set:

- `app`: General application features and utilities
- `cms`: Content management (menus and pages)
- `sales`: Collection and product listings
- `store`: Store policies and other properties

For more information about the subdomain architecure pattern, read [Does DDD
Belong on the Frontend?][10] by Khalil Stemmler.

## Testing

Directory: `__tests__`  
Command: `yarn test`

For more information, see the [root package Contributing Guide][11].

## Build Workflow

To create a local `production` build:

```zsh
yarn build
```

Next.js will load the `.env.production.local` file by default.

### Local Production Emulation

To both create a `production` build and emulate it:

```zsh
yarn start
```

The storefront application will be available at `http://localhost:9000`.

[1]: https://www.addthis.com/
[2]: https://analytics.google.com/analytics/web/
[3]: https://developers.google.com/analytics/devguides/collection/protocol/v1
[4]: ../../api/README.md
[5]: https://www.atlassian.com/software/opsgenie
[6]: https://docs.opsgenie.com/docs/github-integration
[7]: https://docs.opsgenie.com/docs/sentry-integration
[8]: https://sentry.io
[9]: https://nextjs.org/docs/basic-features/pages
[10]:
  https://khalilstemmler.com/articles/typescript-domain-driven-design/ddd-frontend/
[11]: ../../../docs/CONTRIBUTING.md#testing
