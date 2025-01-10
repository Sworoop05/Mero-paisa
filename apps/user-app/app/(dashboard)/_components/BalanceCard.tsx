import { Card } from "@repo/ui/card";
import React from "react";

interface BalanceType {
  id: number;
  userId: number;
  amount: number;
  locked: number;
}

const BalanceCard = ({ balance }: { balance: BalanceType }) => {
  // Safely get the first balance entry or provide a default object
  let balanceData = balance;
  console.log(balanceData);
  return (
    <div>
      <Card
        className="min-w-[400px] flex flex-col sm:min-w-full"
        title="Balance"
      >
        <div className="mb-10 flex flex-col gap-3">
          <div className="flex justify-between border-b-2 w-full">
            <span>Unlocked Balance</span>
            <span>Rs {balanceData?.amount ?? 0}</span>
          </div>
          <div className="flex justify-between border-b-2 w-full">
            <span>Locked Balance</span>
            <span>Rs {balanceData?.locked ?? 0}</span>
          </div>
        </div>
        <div className="flex justify-between border-b-2 w-full">
          <span>Total Balance</span>
          <span>Rs {balanceData?.amount + balanceData?.locked || 0}</span>
        </div>
      </Card>
    </div>
  );
};

export default BalanceCard;
