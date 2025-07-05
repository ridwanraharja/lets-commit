import { useState } from "react";
import { Copy, Check } from "lucide-react";
import QRCode from "react-qr-code";

interface QRGeneratorProps {
  sessionId: string;
  sessionTitle: string;
  eventTitle: string;
  sessionCode: string;
  eventId?: string;
}

export function QRGenerator({
  sessionId,
  sessionTitle,
  eventTitle,
  sessionCode,
  eventId,
}: QRGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const qrLink = `${
    window.location.origin
  }/checkin/${sessionId}?code=${sessionCode}${
    eventId ? `&eventId=${eventId}` : ""
  }`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="text-center p-4">
      <div className="bg-white p-4 rounded-lg mx-auto mb-4 inline-block">
        <QRCode
          size={192}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrLink}
          viewBox={`0 0 256 256`}
          fgColor="#2563eb"
          bgColor="#ffffff"
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {eventTitle}
      </p>
      <p className="font-semibold text-deep-navy dark:text-foreground mb-3">
        {sessionTitle}
      </p>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Check-in Link:
          </p>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-commitment-blue text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
        <p className="text-xs font-mono text-commitment-blue break-all bg-white dark:bg-gray-800 p-2 rounded border">
          {qrLink}
        </p>
      </div>
      <div className="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-500">
        <span>Session ID: {sessionId}</span>
        <span>•</span>
        <span>Code: {sessionCode}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 italic">
        Participants scan QR code or access link to check-in
      </p>
    </div>
  );
}
