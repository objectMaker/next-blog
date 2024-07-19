export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-6">
        <div>logo</div>
        <div>image</div>
      </div>
      {children}
    </div>
  );
}
