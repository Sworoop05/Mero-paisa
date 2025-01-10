interface Transaction {
    id: number;
    status: "Pending" | "Failure" | "Success";
    token: string;
    provider: string;
    amount: number;
    startTime: Date;
    userId: number;
}
export type { Transaction }