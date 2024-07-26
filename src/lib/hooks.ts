import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUserInfoByJwt } from '@/actions';
import { toast } from 'sonner';
import { User } from '@prisma/client';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    async function a() {
      try {
        const userInfo = await getUserInfoByJwt();
        setUserInfo(userInfo);
      } catch (err) {
        toast.info('login status expired');
        setUserInfo(null);
        console.log(err);
      }
    }
    a();
  }, [pathName]);
  return userInfo;
};
