import SideBar from '@/app/_components/SideBar';
import { auth } from '@/auth';
export default async function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideBar session={session}></SideBar>
      <div className="h-full flex-1 overflow-y-auto transition-all duration-100 ease-out">
        {children}
      </div>
    </div>
  );
}
