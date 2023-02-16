export enum EnvironmentName {
  /**
   * Development
   */
  Development = 'dev',

  /**
   * Test/Testing
   */
  Test = 'test',

  /**
   * Staging
   */
  Staging = 'staging',

  /**
   * Production
   */
  Production = 'prod',

  /**
   * Unknown
   */
  Unknown = 'unknown',
}

export type EnvironmentNameMapping = {
  [P in EnvironmentName]?: Array<string>;
};

/**
 * Default environment name mappings
 */
export const defaultEnvironmentNameMapping: EnvironmentNameMapping = {
  [EnvironmentName.Development]: ['dev', 'development'],
  [EnvironmentName.Test]: ['test', 'testing'],
  [EnvironmentName.Staging]: ['staging', 'integration'],
  [EnvironmentName.Production]: ['prod', 'production'],
};

/**
 * Normalize environment variable name
 * @param envName Current environment name
 */
export const normalizeEnvironmentName = (
  envName: string,
  mappings: EnvironmentNameMapping = defaultEnvironmentNameMapping,
): EnvironmentName => {
  for (const env in mappings) {
    // current environment alias(es)
    const aliases = mappings[env as keyof typeof mappings] ?? [];
    if (aliases.includes(envName) === true) {
      return env as EnvironmentName;
    }
  }

  return EnvironmentName.Unknown;
};
