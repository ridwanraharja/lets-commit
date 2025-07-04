import { useCallback } from "react";
import { useAccount } from "wagmi";
import { useContracts } from "./useContracts";
import {
  CreateEventParams,
  Event,
  Session,
  UnattendedFeesPreview,
} from "../types/contracts";

export const useLetsCommit = () => {
  const { publicClient, walletClient, contracts } = useContracts();
  const { address } = useAccount();

  const contract = contracts.letsCommit;

  // Read Functions
  const getEvent = useCallback(
    async (eventId: bigint): Promise<Event> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getEvent",
        args: [eventId],
      });

      return result as Event;
    },
    [publicClient, contract]
  );

  const getSession = useCallback(
    async (eventId: bigint, sessionIndex: number): Promise<Session> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getSession",
        args: [eventId, sessionIndex],
      });

      return result as Session;
    },
    [publicClient, contract]
  );

  const getEnrolledParticipantsCount = useCallback(
    async (eventId: bigint): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getEnrolledParticipantsCount",
        args: [eventId],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const isParticipantEnrolled = useCallback(
    async (eventId: bigint, participant: `0x${string}`): Promise<boolean> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "isParticipantEnrolled",
        args: [eventId, participant],
      });

      return result as boolean;
    },
    [publicClient, contract]
  );

  const hasParticipantAttendedSession = useCallback(
    async (
      eventId: bigint,
      participant: `0x${string}`,
      sessionIndex: number
    ): Promise<boolean> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "hasParticipantAttendedSession",
        args: [eventId, participant, sessionIndex],
      });

      return result as boolean;
    },
    [publicClient, contract]
  );

  const getParticipantAttendance = useCallback(
    async (
      eventId: bigint,
      participant: `0x${string}`,
      sessionIndex: number
    ): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getParticipantAttendance",
        args: [eventId, participant, sessionIndex],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const getParticipantAttendedSessionsCount = useCallback(
    async (eventId: bigint, participant: `0x${string}`): Promise<number> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getParticipantAttendedSessionsCount",
        args: [eventId, participant],
      });

      return result as number;
    },
    [publicClient, contract]
  );

  const getParticipantCommitmentFee = useCallback(
    async (eventId: bigint, participant: `0x${string}`): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getParticipantCommitmentFee",
        args: [eventId, participant],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const getOrganizerClaimableAmount = useCallback(
    async (eventId: bigint, organizer: `0x${string}`): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getOrganizerClaimableAmount",
        args: [eventId, organizer],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const getOrganizerClaimedAmount = useCallback(
    async (eventId: bigint, organizer: `0x${string}`): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getOrganizerClaimedAmount",
        args: [eventId, organizer],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const getOrganizerVestedAmount = useCallback(
    async (eventId: bigint, organizer: `0x${string}`): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getOrganizerVestedAmount",
        args: [eventId, organizer],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const getOrganizerVestedAmountPerSession = useCallback(
    async (eventId: bigint): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getOrganizerVestedAmountPerSession",
        args: [eventId],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const getSessionAttendedCount = useCallback(
    async (eventId: bigint, sessionIndex: number): Promise<bigint> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "getSessionAttendedCount",
        args: [eventId, sessionIndex],
      });

      return result as bigint;
    },
    [publicClient, contract]
  );

  const hasSessionCode = useCallback(
    async (eventId: bigint, sessionIndex: number): Promise<boolean> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "hasSessionCode",
        args: [eventId, sessionIndex],
      });

      return result as boolean;
    },
    [publicClient, contract]
  );

  const hasClaimedUnattendedFees = useCallback(
    async (eventId: bigint, sessionIndex: number): Promise<boolean> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "hasClaimedUnattendedFees",
        args: [eventId, sessionIndex],
      });

      return result as boolean;
    },
    [publicClient, contract]
  );

  const previewUnattendedFeesForSession = useCallback(
    async (
      eventId: bigint,
      sessionIndex: number
    ): Promise<UnattendedFeesPreview> => {
      if (!publicClient) throw new Error("Public client not available");

      const result = await publicClient.readContract({
        ...contract,
        functionName: "previewUnattendedFeesForSession",
        args: [eventId, sessionIndex],
      });

      return result as UnattendedFeesPreview;
    },
    [publicClient, contract]
  );

  const getProtocolTVL = useCallback(async (): Promise<bigint> => {
    if (!publicClient) throw new Error("Public client not available");

    const result = await publicClient.readContract({
      ...contract,
      functionName: "getProtocolTVL",
      args: [],
    });

    return result as bigint;
  }, [publicClient, contract]);

  // Write Functions
  const createEvent = useCallback(
    async (params: CreateEventParams): Promise<`0x${string}`> => {
      if (!walletClient || !address || !publicClient)
        throw new Error("Wallet not connected");

      const { request } = await publicClient.simulateContract({
        ...contract,
        functionName: "createEvent",
        args: [
          params.title,
          params.description,
          params.location,
          params.imageUri,
          params.priceAmount,
          params.commitmentAmount,
          params.maxParticipant,
          params.startSaleDate,
          params.endSaleDate,
          params.tags,
          params.sessions,
        ],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      return hash;
    },
    [walletClient, publicClient, address, contract]
  );

  const enrollEvent = useCallback(
    async (eventId: bigint): Promise<`0x${string}`> => {
      if (!walletClient || !address || !publicClient)
        throw new Error("Wallet not connected");

      const { request } = await publicClient.simulateContract({
        ...contract,
        functionName: "enrollEvent",
        args: [eventId],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      return hash;
    },
    [walletClient, publicClient, address, contract]
  );

  const setSessionCode = useCallback(
    async (
      eventId: bigint,
      sessionIndex: number,
      code: string
    ): Promise<`0x${string}`> => {
      if (!walletClient || !address || !publicClient)
        throw new Error("Wallet not connected");

      const { request } = await publicClient.simulateContract({
        ...contract,
        functionName: "setSessionCode",
        args: [eventId, sessionIndex, code],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      return hash;
    },
    [walletClient, publicClient, address, contract]
  );

  const attendSession = useCallback(
    async (
      eventId: bigint,
      sessionIndex: number,
      sessionCode: string
    ): Promise<`0x${string}`> => {
      if (!walletClient || !address || !publicClient)
        throw new Error("Wallet not connected");

      const { request } = await publicClient.simulateContract({
        ...contract,
        functionName: "attendSession",
        args: [eventId, sessionIndex, sessionCode],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      return hash;
    },
    [walletClient, publicClient, address, contract]
  );

  const claimFirstPortion = useCallback(
    async (eventId: bigint): Promise<`0x${string}`> => {
      if (!walletClient || !address || !publicClient)
        throw new Error("Wallet not connected");

      const { request } = await publicClient.simulateContract({
        ...contract,
        functionName: "claimFirstPortion",
        args: [eventId],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      return hash;
    },
    [walletClient, publicClient, address, contract]
  );

  const claimUnattendedFees = useCallback(
    async (eventId: bigint, sessionIndex: number): Promise<`0x${string}`> => {
      if (!walletClient || !address || !publicClient)
        throw new Error("Wallet not connected");

      const { request } = await publicClient.simulateContract({
        ...contract,
        functionName: "claimUnattendedFees",
        args: [eventId, sessionIndex],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      return hash;
    },
    [walletClient, publicClient, address, contract]
  );

  const claim = useCallback(async (): Promise<`0x${string}`> => {
    if (!walletClient || !address || !publicClient)
      throw new Error("Wallet not connected");

    const { request } = await publicClient.simulateContract({
      ...contract,
      functionName: "claim",
      args: [],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
    return hash;
  }, [walletClient, publicClient, address, contract]);

  const enrollAndAttend = useCallback(async (): Promise<`0x${string}`> => {
    if (!walletClient || !address || !publicClient)
      throw new Error("Wallet not connected");

    const { request } = await publicClient.simulateContract({
      ...contract,
      functionName: "enrollAndAttend",
      args: [],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
    return hash;
  }, [walletClient, publicClient, address, contract]);

  return {
    // Read functions
    getEvent,
    getSession,
    getEnrolledParticipantsCount,
    isParticipantEnrolled,
    hasParticipantAttendedSession,
    getParticipantAttendance,
    getParticipantAttendedSessionsCount,
    getParticipantCommitmentFee,
    getOrganizerClaimableAmount,
    getOrganizerClaimedAmount,
    getOrganizerVestedAmount,
    getOrganizerVestedAmountPerSession,
    getSessionAttendedCount,
    hasSessionCode,
    hasClaimedUnattendedFees,
    previewUnattendedFeesForSession,
    getProtocolTVL,

    // Write functions
    createEvent,
    enrollEvent,
    setSessionCode,
    attendSession,
    claimFirstPortion,
    claimUnattendedFees,
    claim,
    enrollAndAttend,

    // Contract info
    contractAddress: contract.address,
    isConnected: !!address,
    address,
  };
};
