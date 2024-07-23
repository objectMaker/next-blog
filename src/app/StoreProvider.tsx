'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';
import { initializeCount } from '../lib/counterSlice';
import { initializeCollapse } from '@/lib/collapseStore';

export default function StoreProvider({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeCount(count));
    storeRef.current.dispatch(initializeCollapse(false));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
