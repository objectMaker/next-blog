import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-1">
        <Image src="/pig.svg" width={70} height={70} alt="Picture of the pig" />
        <div className="h-8 font-bold">well come to login</div>
      </div>
      {children}
    </div>
  );
}
