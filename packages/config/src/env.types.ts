/**
 * Environment configuration types
 */

export interface EnvironmentConfig {
  nodeEnv: 'development' | 'production' | 'test';
  apiUrl: string;
  apiTimeout: number;
  wsUrl: string;
  appName: string;
  appVersion: string;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface AuthConfig {
  accessTokenExpiry: number; // milliseconds
  refreshTokenExpiry: number; // milliseconds
  tokenRefreshThreshold: number; // milliseconds before expiry to refresh
}

export interface StorageConfig {
  localStorage: {
    prefix: string;
    version: string;
  };
  indexedDB: {
    name: string;
    version: number;
    stores: string[];
  };
  hive: {
    boxPrefix: string;
  };
}

export interface SyncConfig {
  syncInterval: number; // milliseconds
  batchSize: number;
  maxRetries: number;
  retryDelay: number; // milliseconds
  conflictStrategy: 'server-wins' | 'client-wins' | 'last-write-wins';
}

export interface UploadConfig {
  maxFileSize: number; // bytes
  maxFiles: number;
  allowedMimeTypes: string[];
  uploadUrl: string;
}

export interface FeatureFlags {
  enableOfflineMode: boolean;
  enableWebSocket: boolean;
  enablePushNotifications: boolean;
  enableBiometricAuth: boolean;
  enableMultiCurrency: boolean;
  enableRecurringExpenses: boolean;
  enableOCR: boolean;
  enableDarkMode: boolean;
}
