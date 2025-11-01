/**
 * Synchronization utilities
 */

import { SyncStatus, type SyncQueueItem, type OfflineOperation } from '@shared/types';

/**
 * Generate sync queue item
 * @param type - Operation type
 * @param resourceType - Resource type
 * @param resourceId - Resource ID
 * @param data - Optional data
 * @returns Sync queue item
 */
export function createSyncQueueItem(
  type: 'create' | 'update' | 'delete',
  resourceType: 'expense' | 'category' | 'split',
  resourceId: string,
  data?: unknown
): SyncQueueItem {
  return {
    id: generateUUID(),
    type,
    resourceType,
    resourceId,
    data,
    timestamp: new Date(),
    retryCount: 0,
    status: SyncStatus.PENDING,
  };
}

/**
 * Check if sync is needed based on last sync time
 * @param lastSyncTime - Last successful sync timestamp
 * @param intervalMs - Sync interval in milliseconds
 * @returns True if sync is needed
 */
export function shouldSync(lastSyncTime: Date | null, intervalMs: number): boolean {
  if (!lastSyncTime) return true;

  const now = Date.now();
  const lastSync = lastSyncTime.getTime();

  return now - lastSync >= intervalMs;
}

/**
 * Resolve sync conflict using last-write-wins strategy
 * @param localVersion - Local update timestamp
 * @param serverVersion - Server update timestamp
 * @returns True if server version should win
 */
export function resolveConflict(localVersion: Date, serverVersion: Date): boolean {
  return serverVersion.getTime() > localVersion.getTime();
}

/**
 * Generate a simple UUID v4
 * @returns UUID string
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Create offline operation record
 * @param operation - Operation type
 * @param entity - Entity type
 * @param entityId - Entity ID
 * @param payload - Operation payload
 * @returns Offline operation
 */
export function createOfflineOperation(
  operation: 'create' | 'update' | 'delete',
  entity: string,
  entityId: string,
  payload: unknown
): OfflineOperation {
  return {
    id: generateUUID(),
    operation,
    entity,
    entityId,
    payload,
    timestamp: new Date(),
    synced: false,
  };
}

/**
 * Batch operations for sync
 * @param operations - Array of operations
 * @param batchSize - Maximum batch size
 * @returns Array of batched operations
 */
export function batchOperations<T>(operations: T[], batchSize: number): T[][] {
  const batches: T[][] = [];

  for (let i = 0; i < operations.length; i += batchSize) {
    batches.push(operations.slice(i, i + batchSize));
  }

  return batches;
}

/**
 * Calculate exponential backoff delay
 * @param retryCount - Number of retries attempted
 * @param baseDelay - Base delay in milliseconds
 * @param maxDelay - Maximum delay in milliseconds
 * @returns Delay in milliseconds
 */
export function calculateBackoffDelay(
  retryCount: number,
  baseDelay: number,
  maxDelay: number
): number {
  const delay = baseDelay * Math.pow(2, retryCount);
  return Math.min(delay, maxDelay);
}

/**
 * Check if item should be retried
 * @param item - Sync queue item
 * @param maxRetries - Maximum retry attempts
 * @returns True if should retry
 */
export function shouldRetry(item: SyncQueueItem, maxRetries: number): boolean {
  return item.retryCount < maxRetries && item.status === SyncStatus.ERROR;
}

/**
 * Merge local and server changes
 * @param localData - Local data
 * @param serverData - Server data
 * @param strategy - Merge strategy
 * @returns Merged data
 */
export function mergeChanges<T extends { updatedAt: Date }>(
  localData: T,
  serverData: T,
  strategy: 'server-wins' | 'client-wins' | 'last-write-wins' = 'last-write-wins'
): T {
  switch (strategy) {
    case 'server-wins':
      return serverData;

    case 'client-wins':
      return localData;

    case 'last-write-wins':
      return localData.updatedAt.getTime() > serverData.updatedAt.getTime()
        ? localData
        : serverData;

    default:
      return serverData;
  }
}
