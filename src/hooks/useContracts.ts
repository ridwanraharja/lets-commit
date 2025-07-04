import { usePublicClient, useWalletClient } from "wagmi";
import { CONTRACT_ADDRESSES } from "../contracts/addresses";
import mIDRXTokenABI from "../contracts/abi/mIDRXToken.json";
import letsCommitABI from "../contracts/abi/letsCommit.json";

export const useContracts = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  return {
    publicClient,
    walletClient,
    contracts: {
      mIDRXToken: {
        address: CONTRACT_ADDRESSES.MIDRX_TOKEN as `0x${string}`,
        abi: mIDRXTokenABI,
      },
      letsCommit: {
        address: CONTRACT_ADDRESSES.LETS_COMMIT as `0x${string}`,
        abi: letsCommitABI,
      },
    },
  };
};
