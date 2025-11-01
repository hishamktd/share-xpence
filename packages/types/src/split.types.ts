/**
 * Split group and expense splitting types
 */

import { MemberType, SplitType, SyncStatus } from './enums';

export interface SplitMember {
  id: string;
  userId?: string; // null for dummy users
  name: string;
  email?: string;
  type: MemberType;
  balance: number; // positive = owed to them, negative = they owe
  avatar?: string;
}

export interface SplitAllocation {
  memberId: string;
  amount: number;
  percentage?: number;
}

export interface SplitExpense {
  id: string;
  expenseId: string;
  groupId: string;
  paidBy: string; // memberId
  splitType: SplitType;
  splits: SplitAllocation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SplitGroup {
  id: string;
  name: string;
  description?: string;
  createdBy: string; // userId
  members: SplitMember[];
  expenses: SplitExpense[];
  syncStatus: SyncStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface SplitGroupSummary {
  groupId: string;
  groupName: string;
  totalExpenses: number;
  totalAmount: number;
  memberCount: number;
  yourBalance: number;
  lastActivity: Date;
}

export interface MemberBalance {
  memberId: string;
  memberName: string;
  balance: number;
  owedTo: Array<{
    memberId: string;
    memberName: string;
    amount: number;
  }>;
  owedBy: Array<{
    memberId: string;
    memberName: string;
    amount: number;
  }>;
}

export interface SimplifiedDebt {
  from: string; // memberId
  to: string; // memberId
  amount: number;
}

export interface DummyUserMigration {
  dummyUserId: string;
  registeredUserId: string;
  groupId: string;
  migratedAt: Date;
}
