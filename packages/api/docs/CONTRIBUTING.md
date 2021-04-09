# Contributing

These instructions will help you develop and test new features.

## Overview

[Getting Started](../../../docs/CONTRIBUTING.md)  
[Development Environment](#development-environment)  
[Integrations](#integrations)  
[Making Changes](#making-changes)  
[Testing](#testing)

## Development Environment

Due to [limitations with Vercel][1], the development server can only be started
from the **root of the repository**.

```zsh
yarn dev:api
```

The development server will start on `http://localhost:8080`.

## Integrations

### Algolia

[Algolia][2] is a search-as-a-service platform that allows end users to filter
and search API resources.

**Environment Variables**

- `ALGOLIA_API_KEY`
- `ALGOLIA_APP_ID`

### Apple Music API

The [Apple Music API][3] is used to fetch store playlist data.

**Environment Variables**

- `APPLE_AUTHKEY_MUSICKIT`
- `APPLE_AUTHKEY_MUSICKIT_KEY_ID`
- `APPLE_TEAM_ID`

### Google Analytics

[Google Analytics][4] is a web analytics service that tracks and reports website
traffic.

KAPI uses the [Measurement Protocol for Universal Analytics][5] to track API
requests, success responses, and errors.

**Environment Variables**

- `GA_TRACKING_ID`
- `VERCEL_ENV`
- `VERCEL_GIT_COMMIT_REF`
- `VERCEL_GIT_COMMIT_SHA`

## Judge.me Product Reviews

[Judge.me Product Reviews][6] is a web app that helps e-commerce stores collect
and display product and store reviews and other user-generated content.

**Environment Variables**

- `JUDGEME_API_TOKEN`

### Opsgenie

[Opsgenie][7] is an on-call and alert management service for software projects.

Its primary use is to [dispatch alerts from GitHub][8].

### Shopify

[Shopify][9] is an e-commerce platform. Aside from functioning as our commerce
backend, it is also our content management system.

**Environment Variables**

- `SHOPIFY_API_KEY`
- `SHOPIFY_API_VERSION`
- `SHOPIFY_SHOP_NAME`
- `SHOPIFY_PASSWORD`

## Making Changes

### API Endpoints

Directory: `api`

For more information, see the [Vercel Serverless Functions][10] documentation.

### Config

Directory: `lib/config`

### Middleware

Directory: `lib/middleware`

### Services

Directory: `lib/services`

### Type Definitions

Directory: `lib/types`

### Utilities

Directory: `lib/utils`

## Testing

Directory: `__tests__`  
Command: `yarn test`

For more information, see the [root package Contributing Guide][11].

[1]: https://github.com/vercel/vercel/discussions/5294#discussioncomment-269338
[2]: https://www.algolia.com/
[3]: https://developer.apple.com/documentation/applemusicapi/
[4]: https://analytics.google.com/analytics/web/
[5]: https://developers.google.com/analytics/devguides/collection/protocol/v1
[6]: https://judge.me/
[7]: https://www.atlassian.com/software/opsgenie
[8]: https://docs.opsgenie.com/docs/github-integration
[9]: https://www.shopify.com/
[10]: https://vercel.com/docs/serverless-functions/introduction
[11]: ../../../docs/CONTRIBUTING.md#testing
