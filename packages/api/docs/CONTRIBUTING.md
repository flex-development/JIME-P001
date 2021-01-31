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

### 🚧 Algolia

**TODO**: Update documentation.

### 🚧 Apple Music API

**TODO**: Update documentation.

### 🚧 Firebase

**TODO**: Update documentation.

### 🚧 Opsgenie

**TODO**: Update documentation.

### 🚧 Sentry

**TODO**: Update documentation.

### Shopify

[Shopify][7] is an eCommerce platform. Aside from functioning as our commerce
backend, it is also our content management system.

**Environment Variables**

- `SHOPIFY_API_KEY`
- `SHOPIFY_API_VERSION`
- `SHOPIFY_DOMAIN`
- `SHOPIFY_PASSWORD`

## Making Changes

### 🚧 API Endpoints

Directory: `api`

**TODO**: Update documentation.

### Config

Directory: `lib/config`

### Type Definitions

Directory: `lib/types`

### Utilities

Directory: `lib/utils`

## 🚧 Testing

**TODO**: Update documentation.

[1]: https://github.com/vercel/vercel/discussions/5294#discussioncomment-269338
[7]: https://www.shopify.com/
