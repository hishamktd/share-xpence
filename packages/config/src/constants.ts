/**
 * Application constants
 */

export const APP_NAME = 'Share-Xpence';
export const APP_VERSION = '0.1.0';

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',
  LAST_SYNC_TIME: 'last_sync_time',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// IndexedDB stores
export const INDEXED_DB_STORES = {
  EXPENSES: 'expenses',
  CATEGORIES: 'categories',
  SPLIT_GROUPS: 'split_groups',
  SYNC_QUEUE: 'sync_queue',
  CONFLICTS: 'conflicts',
} as const;

// Hive boxes (Flutter)
export const HIVE_BOXES = {
  EXPENSES: 'expenses',
  CATEGORIES: 'categories',
  SPLIT_GROUPS: 'split_groups',
  SYNC_QUEUE: 'sync_queue',
  PREFERENCES: 'preferences',
  CACHE: 'cache',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// File upload limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES_PER_EXPENSE: 3,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
} as const;

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  TITLE_MAX_LENGTH: 100,
  NOTES_MAX_LENGTH: 500,
  GROUP_NAME_MAX_LENGTH: 50,
  CATEGORY_NAME_MAX_LENGTH: 30,
} as const;

// Timeouts and intervals
export const TIMEOUTS = {
  API_TIMEOUT: 30000, // 30 seconds
  SYNC_INTERVAL: 15 * 60 * 1000, // 15 minutes
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
  DEBOUNCE_DELAY: 300, // milliseconds
  THROTTLE_DELAY: 1000, // milliseconds
} as const;

// Authentication
export const AUTH = {
  ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
} as const;

// Sync
export const SYNC = {
  BATCH_SIZE: 50,
  MAX_RETRIES: 3,
  RETRY_DELAY: 5000, // milliseconds
  CONFLICT_STRATEGY: 'last-write-wins',
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  FULL: 'MMMM DD, YYYY',
  SHORT: 'MM/DD/YY',
  ISO: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATETIME: 'MMM DD, YYYY HH:mm',
} as const;

// Currency
export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
} as const;

// Routes (Web app)
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  EXPENSES: '/expenses',
  EXPENSE_NEW: '/expenses/new',
  EXPENSE_DETAIL: (id: string) => `/expenses/${id}`,
  EXPENSE_EDIT: (id: string) => `/expenses/${id}/edit`,
  SPLITS: '/splits',
  SPLIT_NEW: '/splits/new',
  SPLIT_DETAIL: (id: string) => `/splits/${id}`,
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// WebSocket events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  EXPENSE_CREATED: 'expense:created',
  EXPENSE_UPDATED: 'expense:updated',
  EXPENSE_DELETED: 'expense:deleted',
  SPLIT_CREATED: 'split:created',
  SPLIT_UPDATED: 'split:updated',
  SPLIT_EXPENSE_ADDED: 'split:expense:added',
  MEMBER_ADDED: 'split:member:added',
  MEMBER_REMOVED: 'split:member:removed',
  SYNC_REQUIRED: 'sync:required',
} as const;

// Error codes
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SYNC_ERROR: 'SYNC_ERROR',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Chart colors
export const CHART_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
] as const;

// Feature flags (default values)
export const FEATURE_FLAGS = {
  ENABLE_OFFLINE_MODE: true,
  ENABLE_WEBSOCKET: true,
  ENABLE_PUSH_NOTIFICATIONS: false,
  ENABLE_BIOMETRIC_AUTH: false,
  ENABLE_MULTI_CURRENCY: false,
  ENABLE_RECURRING_EXPENSES: false,
  ENABLE_OCR: false,
  ENABLE_DARK_MODE: true,
} as const;
