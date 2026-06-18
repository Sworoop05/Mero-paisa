"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import type { DashboardStats } from "../../lib/actions/dashboard";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-zinc-500">{p.name}:</span>
          <span className="font-semibold text-zinc-800">
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  const { currentBalance, lockedBalance, totalIncome, totalSpending, monthlyData } =
    stats;

  return (
    <div className="w-full space-y-8 p-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Overview
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Your financial snapshot at a glance
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Current Balance"
          value={currentBalance}
          variant="balance"
        />
        <StatCard
          label="Locked Balance"
          value={lockedBalance}
          variant="locked"
        />
        <StatCard
          label="Total Income"
          value={totalIncome}
          variant="income"
        />
        <StatCard
          label="Total Spending"
          value={totalSpending}
          variant="spending"
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Area Chart */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Cash Flow
            </h2>
            <p className="mt-0.5 text-lg font-semibold text-zinc-900">
              Monthly Overview
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f4f4f5"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#a1a1aa" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#a1a1aa" }}
                  tickFormatter={(v) => `₹${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#incomeGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  name="Spending"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fill="url(#spendGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Comparison
            </h2>
            <p className="mt-0.5 text-lg font-semibold text-zinc-900">
              Income vs Spending
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={6}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f4f4f5"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#a1a1aa" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#a1a1aa" }}
                  tickFormatter={(v) => `₹${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
                />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="spending"
                  name="Spending"
                  fill="#f43f5e"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "balance" | "locked" | "income" | "spending";
}) {
  const palette = {
    balance: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
      ring: "ring-emerald-100",
    },
    locked: {
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      dot: "bg-amber-500",
      text: "text-amber-700",
      ring: "ring-amber-100",
    },
    income: {
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      dot: "bg-indigo-500",
      text: "text-indigo-700",
      ring: "ring-indigo-100",
    },
    spending: {
      bg: "bg-rose-50",
      iconBg: "bg-rose-100",
      dot: "bg-rose-500",
      text: "text-rose-700",
      ring: "ring-rose-100",
    },
  }[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${palette.ring} ring-1 ring-inset`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            {label}
          </p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900">
            {formatCurrency(value)}
          </p>
        </div>
        <div className={`rounded-xl ${palette.iconBg} p-2.5`}>
          <div className={`h-3 w-3 rounded-full ${palette.dot}`} />
        </div>
      </div>
      {/* subtle bottom accent */}
      <div className={`absolute bottom-0 left-0 h-0.5 w-full ${palette.dot}`} />
    </div>
  );
}