import { useEffect, useState } from "react";
import QRCode from "qrcode";

/** Encodes the exact public_url returned by the RPC — never a reconstructed URL. */
export function QrPanel({ url, label }: { url: string; label?: string | null }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, { margin: 1, width: 320, errorCorrectionLevel: "M" })
      .then((dataUrl) => {
        if (active) setSrc(dataUrl);
      })
      .catch(() => {
        if (active) setSrc(null);
      });
    return () => {
      active = false;
    };
  }, [url]);

  if (!src) return null;

  return (
    <figure className="mx-auto w-fit text-center">
      <div className="zar-frame rounded-md bg-[var(--mural-paper)] p-3">
        <img src={src} alt="QR code linking to this invitation" className="h-32 w-32" />
      </div>
      <figcaption className="mt-2 font-body text-[0.6rem] uppercase tracking-[0.3em] text-[var(--mural-ink-soft)]">
        {label?.trim() || "Scan to open"}
      </figcaption>
    </figure>
  );
}
