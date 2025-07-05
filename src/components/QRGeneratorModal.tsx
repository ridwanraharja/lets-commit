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
  console.log("session", session);
  // const today = new Date().toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });
  // const isToday = session.date === today;

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
          {/* {!isToday ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                QR Code Not Available
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                QR codes can only be generated for sessions happening today (
                {today})
              </p>
            </div>
          ) :  */}
          {showCodeInput ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {session.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {session.date} at {session.time}
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
                  placeholder="Example: SESSION2024"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                onClick={onConfirm}
                disabled={!sessionCode.trim()}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Generate QR Code
              </button>
            </div>
          ) : (
            <QRGenerator
              sessionId={session.id}
              sessionTitle={session.title}
              eventTitle={session.title}
              sessionCode={sessionCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
