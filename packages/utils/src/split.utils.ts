/**
 * Split calculation utilities
 */

import {
  SplitType,
  type SplitMember,
  type SplitExpense,
  type SplitAllocation,
  type SimplifiedDebt,
  type MemberBalance,
} from '@shared/types';

/**
 * Calculate equal split for an amount
 * @param amount - Total amount in cents
 * @param memberCount - Number of members
 * @returns Array of equal allocations
 */
export function calculateEqualSplit(amount: number, memberCount: number): number[] {
  const baseAmount = Math.floor(amount / memberCount);
  const remainder = amount % memberCount;

  const allocations: number[] = Array.from({ length: memberCount }, () => baseAmount);

  // Distribute remainder to first members
  for (let i = 0; i < remainder; i++) {
    allocations[i]! += 1;
  }

  return allocations;
}

/**
 * Calculate percentage-based split
 * @param amount - Total amount in cents
 * @param percentages - Array of percentages (must sum to 100)
 * @returns Array of amounts
 */
export function calculatePercentageSplit(amount: number, percentages: number[]): number[] {
  const sum = percentages.reduce((acc, p) => acc + p, 0);

  if (Math.abs(sum - 100) > 0.01) {
    throw new Error('Percentages must sum to 100');
  }

  const allocations = percentages.map((percentage) => Math.round((amount * percentage) / 100));

  // Adjust for rounding errors
  const total = allocations.reduce((acc, a) => acc + a, 0);
  const diff = amount - total;

  if (diff !== 0 && allocations.length > 0) {
    allocations[0]! += diff;
  }

  return allocations;
}

/**
 * Calculate member balances from split expenses
 * @param members - Array of split members
 * @param expenses - Array of split expenses
 * @returns Updated members with balances
 */
export function calculateMemberBalances(
  members: SplitMember[],
  expenses: SplitExpense[]
): SplitMember[] {
  const balances = new Map<string, number>();

  // Initialize balances
  members.forEach((member) => {
    balances.set(member.id, 0);
  });

  // Calculate balances from expenses
  expenses.forEach((expense) => {
    const totalAmount = expense.splits.reduce((sum, split) => sum + split.amount, 0);

    // Payer gets credit
    const payerBalance = balances.get(expense.paidBy) || 0;
    balances.set(expense.paidBy, payerBalance + totalAmount);

    // Each member owes their share
    expense.splits.forEach((split) => {
      const memberBalance = balances.get(split.memberId) || 0;
      balances.set(split.memberId, memberBalance - split.amount);
    });
  });

  // Update member objects
  return members.map((member) => ({
    ...member,
    balance: balances.get(member.id) || 0,
  }));
}

/**
 * Simplify debts using greedy algorithm
 * @param members - Array of members with balances
 * @returns Array of simplified debts
 */
export function simplifyDebts(members: SplitMember[]): SimplifiedDebt[] {
  const debts: SimplifiedDebt[] = [];

  // Create copies to avoid mutation
  const creditors = members
    .filter((m) => m.balance > 0)
    .map((m) => ({ id: m.id, amount: m.balance }))
    .sort((a, b) => b.amount - a.amount);

  const debtors = members
    .filter((m) => m.balance < 0)
    .map((m) => ({ id: m.id, amount: Math.abs(m.balance) }))
    .sort((a, b) => b.amount - a.amount);

  let i = 0;
  let j = 0;

  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];

    if (!creditor || !debtor) break;

    const amount = Math.min(creditor.amount, debtor.amount);

    debts.push({
      from: debtor.id,
      to: creditor.id,
      amount,
    });

    creditor.amount -= amount;
    debtor.amount -= amount;

    if (creditor.amount === 0) i++;
    if (debtor.amount === 0) j++;
  }

  return debts;
}

/**
 * Get member balance details with owed/owing breakdown
 * @param member - Member to analyze
 * @param allMembers - All group members
 * @returns Member balance details
 */
export function getMemberBalanceDetails(
  member: SplitMember,
  allMembers: SplitMember[]
): MemberBalance {
  const owedTo: Array<{ memberId: string; memberName: string; amount: number }> = [];
  const owedBy: Array<{ memberId: string; memberName: string; amount: number }> = [];

  const simplifiedDebts = simplifyDebts(allMembers);

  simplifiedDebts.forEach((debt) => {
    if (debt.from === member.id) {
      const toMember = allMembers.find((m) => m.id === debt.to);
      if (toMember) {
        owedTo.push({
          memberId: toMember.id,
          memberName: toMember.name,
          amount: debt.amount,
        });
      }
    } else if (debt.to === member.id) {
      const fromMember = allMembers.find((m) => m.id === debt.from);
      if (fromMember) {
        owedBy.push({
          memberId: fromMember.id,
          memberName: fromMember.name,
          amount: debt.amount,
        });
      }
    }
  });

  return {
    memberId: member.id,
    memberName: member.name,
    balance: member.balance,
    owedTo,
    owedBy,
  };
}

/**
 * Validate split allocations
 * @param totalAmount - Total expense amount
 * @param allocations - Split allocations
 * @returns True if valid
 */
export function validateSplitAllocations(
  totalAmount: number,
  allocations: SplitAllocation[]
): boolean {
  const sum = allocations.reduce((acc, allocation) => acc + allocation.amount, 0);
  return Math.abs(sum - totalAmount) < 2; // Allow 1 cent difference for rounding
}

/**
 * Calculate split from type and inputs
 * @param amount - Total amount
 * @param type - Split type
 * @param members - Member IDs
 * @param customData - Custom percentages or amounts
 * @returns Split allocations
 */
export function calculateSplit(
  amount: number,
  type: SplitType,
  members: string[],
  customData?: { [memberId: string]: number }
): SplitAllocation[] {
  switch (type) {
    case SplitType.EQUAL: {
      const amounts = calculateEqualSplit(amount, members.length);
      return members.map((memberId, index) => ({
        memberId,
        amount: amounts[index]!,
      }));
    }

    case SplitType.PERCENTAGE: {
      if (!customData) {
        throw new Error('Percentages required for percentage split');
      }

      const percentages = members.map((id) => customData[id] || 0);
      const amounts = calculatePercentageSplit(amount, percentages);

      return members.map((memberId, index) => ({
        memberId,
        amount: amounts[index]!,
        percentage: percentages[index]!,
      }));
    }

    case SplitType.EXACT: {
      if (!customData) {
        throw new Error('Amounts required for exact split');
      }

      return members.map((memberId) => ({
        memberId,
        amount: customData[memberId]!,
      }));
    }

    default:
      throw new Error(`Unsupported split type: ${type}`);
  }
}
