import Image from "next/image";

export default function Avatar({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string | null;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-lg object-cover"
      />
    );
  }

  return (
    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-[10px] font-semibold text-primary">
      {initials}
    </span>
  );
}
