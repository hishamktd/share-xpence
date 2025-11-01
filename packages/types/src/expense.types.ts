/**
 * Expense-related types
 */

import { Currency, ExpenseStatus, SyncStatus } from './enums';

export interface Expense {
  id: string;
  userId: string;
  title: string;
  amount: number;
  currency: Currency;
  categoryId: string;
  subcategoryId?: string;
  date: Date;
  time: string;
  notes?: string;
  attachments?: string[];
  status: ExpenseStatus;
  syncStatus: SyncStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ExpenseFilter {
  userId?: string;
  categoryId?: string;
  subcategoryId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  amountMin?: number;
  amountMax?: number;
  search?: string;
  status?: ExpenseStatus;
  syncStatus?: SyncStatus;
}

export interface ExpenseSortOptions {
  field: 'date' | 'amount' | 'title' | 'category' | 'createdAt';
  order: 'asc' | 'desc';
}

export interface ExpenseAttachment {
  id: string;
  expenseId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
}

export interface ExpenseSummary {
  totalExpenses: number;
  totalAmount: number;
  averageAmount: number;
  expenseCount: number;
  currency: Currency;
  period: {
    from: Date;
    to: Date;
  };
}

export interface CategoryExpenseSummary {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
  expenseCount: number;
  percentage: number;
}
