#!/usr/bin/env node
/**
 * Pricofy Geocode IT - CDK App Entry Point
 *
 * Defines Lambda function for Italian postal code geocoding operations.
 */

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GeocodeItStack } from '../lib/geocode-it-stack';

const app = new cdk.App();

// Get environment from context (defaults to 'dev')
// Support both 'env' and 'environment' for backwards compatibility
const environment = app.node.tryGetContext('env') || app.node.tryGetContext('environment') || 'dev';

// Validate environment
if (!['dev', 'prod'].includes(environment)) {
  throw new Error(`Invalid environment: ${environment}. Must be 'dev' or 'prod'.`);
}

// Common props
const stackProps: cdk.StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'eu-west-1',
  },
  tags: {
    Project: "Pricofy",
    Service: "Geocode-IT",
    Environment: environment,
  },
};

// Geocode IT Stack: Lambda function for Italian postal code operations
new GeocodeItStack(app, `PricofyGeocodeItStack`, {
  ...stackProps,
  description: `Pricofy Geocode IT (${environment}) - Italian postal code geocoding Lambda function`,
  environment,
});

console.log(`✅ Stack name: PricofyGeocodeItStack`);

app.synth();

