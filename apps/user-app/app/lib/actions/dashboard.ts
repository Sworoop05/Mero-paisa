"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export interface MonthlyData {
  month: string;
  income: number;
  spending: number;
}

export interface DashboardStats {
  currentBalance: number;
  lockedBalance: number;
  totalIncome: number;
  totalSpending: number;
  monthlyData: MonthlyData[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const userId = Number(session.user.id);

  const balance = await prisma.balance.findFirst({
    where: { userId },
  });

  const onRampTxns = await prisma.onRampTransaction.findMany({
    where: { userId, status: "Success" },
  });

  const p2pSent = await prisma.p2pTransfer.findMany({
    where: { fromUserId: userId },
  });

  const p2pReceived = await prisma.p2pTransfer.findMany({
    where: { toUserId: userId },
  });

  const totalIncome =
    onRampTxns.reduce((sum, t) => sum + t.amount, 0) +
    p2pReceived.reduce((sum, t) => sum + t.amount, 0);

  const totalSpending = p2pSent.reduce((sum, t) => sum + t.amount, 0);

  // Build monthly data (last 6 months)
  const monthlyMap = new Map<string, { income: number; spending: number }>();
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString("en-US", { month: "short", year: "numeric" });
    monthlyMap.set(key, { income: 0, spending: 0 });
  }

  for (const t of onRampTxns) {
    const key = t.startTime.toLocaleString("en-US", { month: "short", year: "numeric" });
    const entry = monthlyMap.get(key);
    if (entry) entry.income += t.amount;
  }

  for (const t of p2pReceived) {
    const key = t.timeStamp.toLocaleString("en-US", { month: "short", year: "numeric" });
    const entry = monthlyMap.get(key);
    if (entry) entry.income += t.amount;
  }

  for (const t of p2pSent) {
    const key = t.timeStamp.toLocaleString("en-US", { month: "short", year: "numeric" });
    const entry = monthlyMap.get(key);
    if (entry) entry.spending += t.amount;
  }

  const monthlyData: MonthlyData[] = Array.from(monthlyMap.entries()).map(
    ([month, data]) => ({
      month,
      income: data.income,
      spending: data.spending,
    })
  );

  return {
    currentBalance: balance?.amount ?? 0,
    lockedBalance: balance?.locked ?? 0,
    totalIncome,
    totalSpending,
    monthlyData,
  };
}