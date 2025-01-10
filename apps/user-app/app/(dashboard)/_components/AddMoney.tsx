"use client";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Inputbox } from "@repo/ui/inputbox";
import { Selectbox } from "@repo/ui/selectbox";
import { getOnRampTransaction } from "../_utility/databasecall";
import { useState } from "react";
import CreateonRampTransaction from "../../lib/actions/onRampTransaction";
import { useRouter } from "next/navigation";

const AddMoney = () => {
  const router = useRouter();
  const options = ["Nabil bank", "Sanima bank"];
  const [amount, setAmount] = useState<number>();
  const [bankoption, setBankoption] = useState<string>("Nabil bank");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const onChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBankoption(e.target.value);
  };

  const addMoneyHandler = async () => {
    await CreateonRampTransaction(Number(amount) * 100, bankoption);
    if (bankoption == "Nabil bank") {
      router.push("https://www.nabilbank.com/");
    } else {
      router.push("https://www.sanimabank.com/en/know-us");
    }
  };
  return (
    <div>
      <Card
        className="md:min-w-[40%] flex flex-col  p-6 min-h-80 gap-6  "
        title="Add Money"
      >
        <div>
          <Inputbox
            label="Amount"
            placeholder="Enter amount"
            type="Number"
            className=""
            onChange={onChangeHandler}
          ></Inputbox>
        </div>
        <div>
          <Selectbox
            label="Banks:"
            options={options}
            name="banks"
            className="ml-8"
            onChangeHandler={onChangeOption}
          ></Selectbox>
        </div>
        <Button onClick={addMoneyHandler} className="">
          Add Money
        </Button>
      </Card>
    </div>
  );
};

export default AddMoney;
