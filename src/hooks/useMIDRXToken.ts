import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import { useContracts } from "./useContracts";

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

export interface TokenBalance {
  balance: string;
  formattedBalance: string;
}

export interface TokenAllowance {
  allowance: string;
  formattedAllowance: string;
}

export const useMIDRXToken = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();
  const { contracts } = useContracts();

  const contract = contracts.mIDRXToken;

  // Read token information
  const { data: tokenName } = useReadContract({
    ...contract,
    functionName: "name",
  });

  const { data: tokenSymbol } = useReadContract({
    ...contract,
    functionName: "symbol",
  });

  const { data: tokenDecimals } = useReadContract({
    ...contract,
    functionName: "decimals",
  });

  const { data: tokenTotalSupply } = useReadContract({
    ...contract,
    functionName: "totalSupply",
  });

  // Read user's token balance
  const { data: userBalance } = useReadContract({
    ...contract,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get token information
  const getTokenInfo = (): TokenInfo | null => {
    if (!tokenName || !tokenSymbol || !tokenDecimals || !tokenTotalSupply) {
      return null;
    }

    return {
      name: tokenName as string,
      symbol: tokenSymbol as string,
      decimals: tokenDecimals as number,
      totalSupply: formatEther(tokenTotalSupply as bigint),
    };
  };

  // Get user's token balance
  const getUserBalance = (): TokenBalance | null => {
    if (!userBalance) {
      return null;
    }

    return {
      balance: (userBalance as bigint).toString(),
      formattedBalance: formatEther(userBalance as bigint),
    };
  };

  // Get balance for any address
  const useBalance = (targetAddress: string) => {
    return useReadContract({
      ...contract,
      functionName: "balanceOf",
      args: [targetAddress as `0x${string}`],
    });
  };

  // Get allowance
  const useAllowance = (owner: string, spender: string) => {
    return useReadContract({
      ...contract,
      functionName: "allowance",
      args: [owner as `0x${string}`, spender as `0x${string}`],
    });
  };

  // Transfer tokens
  const transfer = async (to: string, amount: string): Promise<string> => {
    if (!isConnected || !address) {
      throw new Error("No wallet connected");
    }

    const parsedAmount = parseEther(amount);

    return new Promise((resolve, reject) => {
      writeContract(
        {
          ...contract,
          functionName: "transfer",
          args: [to as `0x${string}`, parsedAmount],
        },
        {
          onSuccess: (hash) => resolve(hash),
          onError: (error) => reject(error),
        }
      );
    });
  };

  // Approve tokens
  const approve = async (spender: string, amount: string): Promise<string> => {
    if (!isConnected || !address) {
      throw new Error("No wallet connected");
    }

    const parsedAmount = parseEther(amount);

    return new Promise((resolve, reject) => {
      writeContract(
        {
          ...contract,
          functionName: "approve",
          args: [spender as `0x${string}`, parsedAmount],
        },
        {
          onSuccess: (hash) => resolve(hash),
          onError: (error) => reject(error),
        }
      );
    });
  };

  // Transfer from (requires approval)
  const transferFrom = async (
    from: string,
    to: string,
    amount: string
  ): Promise<string> => {
    if (!isConnected || !address) {
      throw new Error("No wallet connected");
    }

    const parsedAmount = parseEther(amount);

    return new Promise((resolve, reject) => {
      writeContract(
        {
          ...contract,
          functionName: "transferFrom",
          args: [from as `0x${string}`, to as `0x${string}`, parsedAmount],
        },
        {
          onSuccess: (hash) => resolve(hash),
          onError: (error) => reject(error),
        }
      );
    });
  };

  // Mint tokens (only if you have minting rights)
  const mint = async (to: string, amount: string): Promise<string> => {
    if (!isConnected || !address) {
      throw new Error("No wallet connected");
    }

    const parsedAmount = parseEther(amount);

    return new Promise((resolve, reject) => {
      writeContract(
        {
          ...contract,
          functionName: "mint",
          args: [to as `0x${string}`, parsedAmount],
        },
        {
          onSuccess: (hash) => resolve(hash),
          onError: (error) => reject(error),
        }
      );
    });
  };

  // Utility functions
  const getContractAddress = (): string => {
    return contract.address;
  };

  const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    // State
    isConnected,
    address,
    isPending,
    error,

    // Token info
    getTokenInfo,
    getUserBalance,
    useBalance,
    useAllowance,

    // Actions
    transfer,
    approve,
    transferFrom,
    mint,

    // Utilities
    getContractAddress,
    isValidAddress,
    formatAddress,
  };
};
