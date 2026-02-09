/**
 * Environment variable validation
 * Ensures all required env vars are present and valid
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_ALGOLIA_APP_ID',
  'NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY',
  'ALGOLIA_AGENT_ENDPOINT',
] as const;

const _optionalEnvVars = [
  'ALGOLIA_APP_ID',
  'ALGOLIA_SEARCH_API_KEY',
  'VERCEL',
  'NODE_ENV',
] as const;

export function validateEnv() {
  const missing: string[] = [];
  const invalid: string[] = [];

  // Check required variables
  for (const varName of requiredEnvVars) {
    const value = process.env[varName];
    if (!value) {
      missing.push(varName);
    } else if (value.trim() === '') {
      invalid.push(varName);
    }
  }

  // Validate ALGOLIA_AGENT_ENDPOINT is a valid URL
  const endpoint =
    process.env.ALGOLIA_AGENT_ENDPOINT || process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT;
  if (endpoint) {
    try {
      new URL(endpoint);
    } catch {
      invalid.push('ALGOLIA_AGENT_ENDPOINT (must be a valid URL)');
    }
  }

  // Report errors
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\\n${missing.map((v) => `  - ${v}`).join('\\n')}\\n\\nPlease check your .env.local file.`
    );
  }

  if (invalid.length > 0) {
    throw new Error(
      `Invalid environment variables:\\n${invalid.map((v) => `  - ${v}`).join('\\n')}`
    );
  }

  return true;
}

// Validate on import in development
if (process.env.NODE_ENV === 'development') {
  try {
    validateEnv();
  } catch (error) {
    if (error instanceof Error) {
      console.error('\\n❌ Environment Variable Error:\\n');
      console.error(error.message);
      console.error('\\n');
    }
  }
}

// Type-safe environment variables
export const env = {
  algolia: {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || process.env.ALGOLIA_APP_ID,
    searchApiKey:
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || process.env.ALGOLIA_SEARCH_API_KEY,
    agentEndpoint:
      process.env.ALGOLIA_AGENT_ENDPOINT || process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT,
  },
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isVercel: process.env.VERCEL === '1',
} as const;
