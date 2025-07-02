import { QRGenerator } from "./QRGenerator";
import { Session } from "./SessionCard";

interface QRGeneratorModalProps {
  session: Session;
  sessionCode: string;
  setSessionCode: (v: string) => void;
  showCodeInput: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function QRGeneratorModal({
  session,
  sessionCode,
  setSessionCode,
  showCodeInput,
  onClose,
  onConfirm,
}: QRGeneratorModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {showCodeInput ? "Enter Session Code" : "Session Check-in QR"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {showCodeInput ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {session.eventTitle}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {session.sessionTitle}
                </p>
                <label
                  htmlFor="sessionCode"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Enter Session Code:
                </label>
                <input
                  id="sessionCode"
                  type="text"
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value)}
                  placeholder="Example: DEFI2024"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                onClick={onConfirm}
                disabled={!sessionCode.trim()}
                className="w-full px-6 py-2 bg-gradient-to-r from-commitment-blue to-light-blue text-white font-medium rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Generate QR Code
              </button>
            </div>
          ) : (
            <QRGenerator
              sessionId={session.id.toString()}
              sessionTitle={session.sessionTitle}
              eventTitle={session.eventTitle}
              sessionCode={sessionCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
