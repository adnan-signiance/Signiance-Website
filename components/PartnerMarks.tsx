import Image from "next/image";

/** The AWS partner badge. */
export default function PartnerMarks({ height = 92 }: { height?: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
      <Image
        src="/media/stand%20alone%20badge%201.png"
        alt="AWS Partner"
        width={120}
        height={120}
        style={{ display: "block", height, width: "auto" }}
      />
    </div>
  );
}
