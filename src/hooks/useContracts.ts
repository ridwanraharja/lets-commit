import { usePublicClient, useWalletClient } from "wagmi";
import { CONTRACT_ADDRESSES } from "../contracts/addresses";
import mIDRXTokenABI from "../contracts/abi/mIDRXToken.json";

export const useContracts = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  return {
    publicClient,
    walletClient,
    addresses: CONTRACT_ADDRESSES,
    abis: {
      mIDRXToken: mIDRXTokenABI,
    },
  };
};
