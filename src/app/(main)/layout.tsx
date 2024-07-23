import SideBar from '@/app/_components/SideBar';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideBar></SideBar>
      <div className="h-full flex-1 overflow-y-auto transition-all duration-100 ease-out">
        {children}
      </div>
    </div>
  );
}
