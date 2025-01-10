import React from "react";
import OnRampCard from "./onRampCard";
import BalanceCard from "./BalanceCard";
import AddMoney from "./AddMoney";
import { getOnRampTransaction } from "../_utility/databasecall";
import { getBalance } from "../_utility/databasecall";

const TransferCard = async () => {
  const transaction: any = await getOnRampTransaction();
  const balance: any = await getBalance();
  console.log(balance);
  return (
    <div className="min-w-full md:flex md:flex-col mt-8 ">
      <div className=" m-4 flex gap-10 flex-wrap sm:justify-center">
        <AddMoney />
        <div className="flex flex-col gap-4 w-[50%]">
          <BalanceCard balance={balance} />
          <OnRampCard transaction={transaction} />
        </div>
      </div>
    </div>
  );
};

export default TransferCard;
