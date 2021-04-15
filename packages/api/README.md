# KAPI

Morena's Kustomz Serverless REST API

[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Overview

[Getting Started](#getting-started)  
[Usage](#usage)  
[Built With](#built-with)  
[Contributing](docs/CONTRIBUTING.md)

## Getting Started

Serverless REST API for Morena's Kustomz, an online cannabis accessory store.

## Usage

**Base URL**: [`https://kapi.flexdevlopment.vercel.app`][1]

- [Documentation][1] follows OpenAPI Specification v3.0.3 standards.

### Authenticated Endpoints

Endpoints that require a valid `userToken` (Shopify API token) query.

#### Customers

Retrieve information about shop customers.

- `GET /customers`
- `GET /customers/[objectID]`

### Open Endpoints

Endpoints that don't require authentication.

#### Collections

Retrieve information about product collections.

- `GET /collections`
- `GET /collections/[objectID]`

#### Layout

Fetch the data used to render the storefront `Layout` component.

- `GET /layout`

#### Menus

Retrieve information about shop menus.

- `GET /menus`
- `GET /menus/[objectID]`

#### Pages

Retrieve information about online store pages.

- `GET /pages`
- `GET /pages/[objectID]`

#### Playlist

Fetch the storefront's Apple Music playlist data.

- `GET /playlist`

#### Policies

Retrieve information about store policies.

- `GET /policies`
- `GET /policies/[objectID]`

#### Products

Retrieve information about store products.

- `GET /products`
- `GET /products/[objectID]`

#### Reviews

Create and list product reviews.

- `GET /reviews`
- `GET /reviews/[objectID]`
- `POST /reviews`

## Built With

- [Algolia][2] - Site Search & Discovery powered by AI
- [Shopify Admin REST API][3] - Shopify REST API
- [Vercel][4] - Hosting platform for serverless functions

[1]: https://kapi.flexdevlopment.vercel.app
[2]: https://www.algolia.com/
[3]: https://shopify.dev/docs/admin-api/rest/reference
[4]: https://vercel.com/docs/serverless-functions/introduction
