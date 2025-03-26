import { Hex } from "viem";

export const truncateAddress = (address: Hex) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
