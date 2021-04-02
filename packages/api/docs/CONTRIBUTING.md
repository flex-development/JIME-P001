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

### Opsgenie

[Opsgenie][6] is an on-call and alert management service for software projects.

Its primary use is to [dispatch alerts from GitHub][7].

### Shopify

[Shopify][8] is an eCommerce platform. Aside from functioning as our commerce
backend, it is also our content management system.

**Environment Variables**

- `SHOPIFY_API_KEY`
- `SHOPIFY_API_VERSION`
- `SHOPIFY_SHOP_NAME`
- `SHOPIFY_PASSWORD`

## Making Changes

### API Endpoints

Directory: `api`

For more information, see the [Vercel Serverless Functions][9] documentation.

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

For more information, see the [root package Contributing Guide][10].

[1]: https://github.com/vercel/vercel/discussions/5294#discussioncomment-269338
[2]: https://www.algolia.com/
[3]: https://developer.apple.com/documentation/applemusicapi/
[4]: https://analytics.google.com/analytics/web/
[5]: https://developers.google.com/analytics/devguides/collection/protocol/v1
[6]: https://www.atlassian.com/software/opsgenie
[7]: https://docs.opsgenie.com/docs/github-integration
[8]: https://www.shopify.com/
[9]: https://vercel.com/docs/serverless-functions/introduction
[10]: ../../../docs/CONTRIBUTING.md#testing
