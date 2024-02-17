import { useMutation } from "react-query";
import { transferAmount } from "../api/apis";
import { AmountTransfer } from "../interfaces/common";

const useTransfer = () => {
  const queryKey = "transferAmount";
  const transfer = useMutation(queryKey, transferAmount);

  const tryAmountTransfer = (variables: AmountTransfer) =>
    transfer.mutate(variables);

  return { tryAmountTransfer, ...transfer };
};

export { useTransfer };
