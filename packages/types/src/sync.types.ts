/**
 * Synchronization types
 */

import { SyncStatus } from './enums';

export interface SyncQueueItem {
  id: string;
  type: 'create' | 'update' | 'delete';
  resourceType: 'expense' | 'category' | 'split';
  resourceId: string;
  data?: unknown;
  timestamp: Date;
  retryCount: number;
  status: SyncStatus;
  error?: string;
}

export interface SyncState {
  lastSyncTime?: Date;
  isSyncing: boolean;
  pendingChanges: number;
  conflictCount: number;
  errorCount: number;
}

export interface OfflineOperation {
  id: string;
  operation: 'create' | 'update' | 'delete';
  entity: string;
  entityId: string;
  payload: unknown;
  timestamp: Date;
  synced: boolean;
}
