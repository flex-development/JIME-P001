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

### Firebase

The [Firebase Realtime Database][4] is used to store product reviews.

Reviews can only be submitted by pre-existing customers. Shopify webhooks are
used to create authentication profiles for new customers.

**Note**: The product reviews service will be implemented in a later release.

**Environment Variables**

- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_PROJECT_ID`

### Opsgenie

[Opsgenie][5] is an on-call and alert management service for software projects.

Its primary use is to [dispatch alerts from GitHub][6].

### Shopify

[Shopify][8] is an eCommerce platform. Aside from functioning as our commerce
backend, it is also our content management system.

**Environment Variables**

- `SHOPIFY_API_KEY`
- `SHOPIFY_API_VERSION`
- `SHOPIFY_DOMAIN`
- `SHOPIFY_PASSWORD`

## Making Changes

### API Endpoints

Directory: `api`

For more information, see the [Vercel Serverless Functions][9] documentation.

### Config

Directory: `lib/config`

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
[4]: https://firebase.google.com/docs/database
[5]: https://www.atlassian.com/software/opsgenie
[6]: https://docs.opsgenie.com/docs/github-integration
[7]: https://sentry.io
[8]: https://www.shopify.com/
[9]: https://vercel.com/docs/serverless-functions/introduction
[10]: ../../../docs/CONTRIBUTING.md#testing
