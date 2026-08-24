import Image from "next/image";

export default function JimfocugLogo() {
  return (
    <div
      className="flex items-center justify-center rounded-lg p-2
         bg-black "
    >
      <Image
        src={"/jimfocug-logo-1.png"}
        alt="company logo"
        width={25}
        height={25}
      />
    </div>
  );
}
