/**
 * API endpoint constants
 */

export const API_VERSION = 'v1';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: `/api/${API_VERSION}/auth/register`,
    LOGIN: `/api/${API_VERSION}/auth/login`,
    LOGOUT: `/api/${API_VERSION}/auth/logout`,
    REFRESH: `/api/${API_VERSION}/auth/refresh`,
    VERIFY_EMAIL: `/api/${API_VERSION}/auth/verify-email`,
    RESET_PASSWORD: `/api/${API_VERSION}/auth/reset-password`,
    CHANGE_PASSWORD: `/api/${API_VERSION}/auth/change-password`,
  },

  // User
  USER: {
    PROFILE: `/api/${API_VERSION}/user/profile`,
    PREFERENCES: `/api/${API_VERSION}/user/preferences`,
    DELETE_ACCOUNT: `/api/${API_VERSION}/user/delete`,
    EXPORT_DATA: `/api/${API_VERSION}/user/export`,
  },

  // Expenses
  EXPENSES: {
    LIST: `/api/${API_VERSION}/expenses`,
    CREATE: `/api/${API_VERSION}/expenses`,
    GET: (id: string) => `/api/${API_VERSION}/expenses/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/expenses/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/expenses/${id}`,
    SUMMARY: `/api/${API_VERSION}/expenses/summary`,
    SEARCH: `/api/${API_VERSION}/expenses/search`,
  },

  // Categories
  CATEGORIES: {
    LIST: `/api/${API_VERSION}/categories`,
    CREATE: `/api/${API_VERSION}/categories`,
    GET: (id: string) => `/api/${API_VERSION}/categories/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/categories/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/categories/${id}`,
    SYSTEM: `/api/${API_VERSION}/categories/system`,
  },

  // SubCategories
  SUBCATEGORIES: {
    LIST: (categoryId: string) => `/api/${API_VERSION}/categories/${categoryId}/subcategories`,
    CREATE: `/api/${API_VERSION}/subcategories`,
    GET: (id: string) => `/api/${API_VERSION}/subcategories/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/subcategories/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/subcategories/${id}`,
  },

  // Split Groups
  SPLIT_GROUPS: {
    LIST: `/api/${API_VERSION}/split-groups`,
    CREATE: `/api/${API_VERSION}/split-groups`,
    GET: (id: string) => `/api/${API_VERSION}/split-groups/${id}`,
    UPDATE: (id: string) => `/api/${API_VERSION}/split-groups/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/split-groups/${id}`,
    ADD_MEMBER: (id: string) => `/api/${API_VERSION}/split-groups/${id}/members`,
    REMOVE_MEMBER: (groupId: string, memberId: string) =>
      `/api/${API_VERSION}/split-groups/${groupId}/members/${memberId}`,
    ADD_EXPENSE: (id: string) => `/api/${API_VERSION}/split-groups/${id}/expenses`,
    GET_BALANCES: (id: string) => `/api/${API_VERSION}/split-groups/${id}/balances`,
    SIMPLIFY_DEBTS: (id: string) => `/api/${API_VERSION}/split-groups/${id}/simplify`,
    MIGRATE_DUMMY: `/api/${API_VERSION}/split-groups/migrate-dummy`,
  },

  // Sync
  SYNC: {
    SYNC: `/api/${API_VERSION}/sync`,
    STATUS: `/api/${API_VERSION}/sync/status`,
    CONFLICTS: `/api/${API_VERSION}/sync/conflicts`,
    RESOLVE: (id: string) => `/api/${API_VERSION}/sync/conflicts/${id}/resolve`,
  },

  // Reports
  REPORTS: {
    GENERATE: `/api/${API_VERSION}/reports/generate`,
    GET: (id: string) => `/api/${API_VERSION}/reports/${id}`,
    DOWNLOAD: (id: string) => `/api/${API_VERSION}/reports/${id}/download`,
  },

  // Attachments
  ATTACHMENTS: {
    UPLOAD: `/api/${API_VERSION}/attachments/upload`,
    GET: (id: string) => `/api/${API_VERSION}/attachments/${id}`,
    DELETE: (id: string) => `/api/${API_VERSION}/attachments/${id}`,
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
