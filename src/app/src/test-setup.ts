import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// Configure the test environment
setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
