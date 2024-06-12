import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:8080'
const timeout = 5000
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'line',
  testMatch: '*.spec.ts',
  expect: {
    timeout,
  },
  timeout,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start',
    url: baseURL,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
