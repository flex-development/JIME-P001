import { Octokit } from '@octokit/core'

/**
 * @file OctoKit Configuration
 * @module subdomains/config/github
 */

export const octokit = new Octokit({ auth: process.env.GITHUB_PAT }).request
