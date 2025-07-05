import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
} from "lucide-react";
import { useMIDRXToken } from "../hooks/useMIDRXToken";
import { CONTRACT_ADDRESSES } from "../contracts/addresses";
import { formatEther } from "viem";
import numeral from "numeral";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproved: () => void;
  eventTitle: string;
  totalAmount: number;
}

export default function ApprovalModal({
  isOpen,
  onClose,
  onApproved,
  eventTitle,
  totalAmount,
}: ApprovalModalProps) {
  const [step, setStep] = useState<
    "checking" | "approving" | "success" | "error"
  >("checking");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    address,
    isConnected,
    useAllowance,
    approve,
    getUserBalance,
    formatAddress,
    isPending,
    error: tokenError,
  } = useMIDRXToken();

  // Get current allowance for LetsCommit contract
  const { data: currentAllowance, refetch: refetchAllowance } = useAllowance(
    address || "0x0000000000000000000000000000000000000000",
    CONTRACT_ADDRESSES.LETS_COMMIT
  );

  const allowance = Number(currentAllowance) / 100;

  // Get user balance
  const userBalance = getUserBalance();

  // Convert total amount to wei (assuming totalAmount is in ETH/MIDRX units)
  const requiredAmount = totalAmount;

  useEffect(() => {
    if (isOpen) {
      setStep("checking");
      setErrorMessage("");
      // Refetch allowance when modal opens
      refetchAllowance();
    }
  }, [isOpen, refetchAllowance]);

  useEffect(() => {
    if (tokenError) {
      setErrorMessage(tokenError.message || "Token operation failed");
      setStep("error");
    }
  }, [tokenError]);

  const handleApprove = async () => {
    if (!isConnected || !address) {
      setErrorMessage("Please connect your wallet first");
      setStep("error");
      return;
    }

    if (!userBalance) {
      setErrorMessage("Unable to fetch token balance");
      setStep("error");
      return;
    }

    if (userBalance.balance < requiredAmount) {
      setErrorMessage(
        `Insufficient MIDRX balance. You need ${totalAmount} MIDRX but have ${userBalance.balance.toFixed(
          2
        )} MIDRX`
      );
      setStep("error");
      return;
    }

    if (allowance >= requiredAmount) {
      setStep("success");
      setTimeout(() => {
        onApproved();
        onClose();
      }, 1500);
      return;
    }

    setStep("approving");

    try {
      await approve(
        CONTRACT_ADDRESSES.LETS_COMMIT,
        (totalAmount * 100).toString()
      );

      // Wait a bit for the transaction to be processed
      setTimeout(async () => {
        await refetchAllowance();
        setStep("success");
        setTimeout(() => {
          onApproved();
          onClose();
        }, 1500);
      }, 2000);
    } catch (error) {
      console.error("Approval failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Approval failed. Please try again."
      );
      setStep("error");
    }
  };

  const formatAllowance = (allowance: string) => {
    const allowanceNumber = parseFloat(formatEther(BigInt(allowance || "0")));
    return allowanceNumber.toFixed(2);
  };

  const isApprovalNeeded = () => {
    return Number(allowance) < requiredAmount;
  };

  const getAllowanceStatus = () => {
    if (allowance >= requiredAmount) {
      return {
        status: "approved",
        text: "✅ Already approved",
        color: "text-green-600 dark:text-green-400",
      };
    } else if (allowance || 0n > 0n) {
      return {
        status: "partial",
        text: `⚠️ Partially approved (${formatAllowance(
          allowance?.toString() || "0"
        )} MIDRX)`,
        color: "text-orange-600 dark:text-orange-400",
      };
    } else {
      return {
        status: "none",
        text: "❌ No approval",
        color: "text-red-600 dark:text-red-400",
      };
    }
  };

  const allowanceStatus = getAllowanceStatus();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Token Approval Required
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === "checking" && (
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Checking token allowance...
                  </p>
                </div>
              )}

              {step === "approving" && (
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Approving IDRX tokens for event enrollment...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Please confirm the transaction in your wallet
                  </p>
                </div>
              )}

              {step === "success" && (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Approval Successful!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You can now proceed with event enrollment
                  </p>
                </div>
              )}

              {step === "error" && (
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Approval Failed
                  </h3>
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Event Details */}
              {step === "checking" && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {eventTitle}
                      </h4>
                      <div className="space-y-1 text-gray-600 dark:text-gray-400">
                        <p>
                          Required Amount:{" "}
                          {numeral(totalAmount).format("0,0.00")} IDRX
                        </p>
                        <p>
                          Your Balance:{" "}
                          {userBalance
                            ? numeral(userBalance.balance).format("0,0.00")
                            : "0"}{" "}
                          IDRX
                        </p>
                        <p className={allowanceStatus.color}>
                          {allowanceStatus.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {step === "checking" && (
                <div className="mt-6 space-y-3">
                  {isApprovalNeeded() ? (
                    <button
                      onClick={handleApprove}
                      disabled={isPending}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Approving...
                        </div>
                      ) : (
                        `Approve ${numeral(totalAmount).format("0,0.00")} IDRX`
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setStep("success");
                        setTimeout(() => {
                          onApproved();
                          onClose();
                        }, 1500);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                    >
                      Already Approved - Continue
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {step === "error" && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => {
                      setStep("checking");
                      setErrorMessage("");
                      refetchAllowance();
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              )}

              {/* Wallet Info */}
              {isConnected && address && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Connected: {formatAddress(address)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Contract: {formatAddress(CONTRACT_ADDRESSES.LETS_COMMIT)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
