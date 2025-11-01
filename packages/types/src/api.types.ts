/**
 * API Request and Response DTOs
 */

import { Currency, SplitType, Theme } from './enums';
import { Expense, ExpenseFilter, ExpenseSortOptions } from './expense.types';
import { Category, SubCategory } from './category.types';
import { SplitGroup } from './split.types';
import { User } from './user.types';

// ============================================
// Authentication DTOs
// ============================================

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ResetPasswordDto {
  email: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// ============================================
// User DTOs
// ============================================

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdatePreferencesDto {
  currency?: Currency;
  theme?: Theme;
  notifications?: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

// ============================================
// Expense DTOs
// ============================================

export interface CreateExpenseDto {
  title: string;
  amount: number;
  currency: Currency;
  categoryId: string;
  subcategoryId?: string;
  date: Date;
  time: string;
  notes?: string;
  attachments?: string[];
}

export interface UpdateExpenseDto {
  title?: string;
  amount?: number;
  categoryId?: string;
  subcategoryId?: string;
  date?: Date;
  time?: string;
  notes?: string;
  attachments?: string[];
}

export interface ExpenseListDto {
  expenses: Expense[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ExpenseQueryDto {
  filter?: ExpenseFilter;
  sort?: ExpenseSortOptions;
  page?: number;
  pageSize?: number;
}

// ============================================
// Category DTOs
// ============================================

export interface CreateCategoryDto {
  name: string;
  icon?: string;
  color?: string;
  description?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  icon?: string;
  color?: string;
  description?: string;
}

export interface CreateSubCategoryDto {
  categoryId: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface UpdateSubCategoryDto {
  name?: string;
  icon?: string;
  description?: string;
}

export interface CategoryListDto {
  categories: Category[];
  subCategories: SubCategory[];
}

// ============================================
// Split Group DTOs
// ============================================

export interface CreateSplitGroupDto {
  name: string;
  description?: string;
  members: Array<{
    userId?: string;
    name: string;
    email?: string;
    type: 'registered' | 'dummy';
  }>;
}

export interface UpdateSplitGroupDto {
  name?: string;
  description?: string;
}

export interface AddMemberDto {
  userId?: string;
  name: string;
  email?: string;
  type: 'registered' | 'dummy';
}

export interface RemoveMemberDto {
  memberId: string;
}

export interface CreateSplitExpenseDto {
  expenseId: string;
  paidBy: string; // memberId
  splitType: SplitType;
  splits: Array<{
    memberId: string;
    amount?: number;
    percentage?: number;
  }>;
}

export interface MigrateDummyUserDto {
  dummyUserId: string;
  registeredUserId: string;
}

export interface SplitGroupListDto {
  groups: SplitGroup[];
  total: number;
}

// ============================================
// Sync DTOs
// ============================================

export interface SyncChangeSet {
  created: Expense[];
  updated: Expense[];
  deleted: string[]; // expense IDs
}

export interface SyncRequestDto {
  lastSyncTime: Date;
  changes: {
    expenses: SyncChangeSet;
    categories?: {
      created: Category[];
      updated: Category[];
      deleted: string[];
    };
    splits?: {
      created: SplitGroup[];
      updated: SplitGroup[];
      deleted: string[];
    };
  };
}

export interface SyncConflict {
  resourceType: 'expense' | 'category' | 'split';
  resourceId: string;
  localVersion: Date;
  serverVersion: Date;
  serverData: unknown;
}

export interface SyncResponseDto {
  serverTime: Date;
  changes: {
    expenses: SyncChangeSet;
    categories?: {
      created: Category[];
      updated: Category[];
      deleted: string[];
    };
    splits?: {
      created: SplitGroup[];
      updated: SplitGroup[];
      deleted: string[];
    };
  };
  conflicts: SyncConflict[];
}

// ============================================
// Report DTOs
// ============================================

export interface GenerateReportDto {
  type: 'expense' | 'split';
  format: 'pdf' | 'csv' | 'json';
  dateFrom?: Date;
  dateTo?: Date;
  categoryIds?: string[];
  groupId?: string;
}

export interface ReportResponseDto {
  reportId: string;
  url: string;
  expiresAt: Date;
}

// ============================================
// Pagination & Common DTOs
// ============================================

export interface PaginationDto {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface ErrorResponseDto {
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
  path: string;
}

export interface SuccessResponseDto<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}
