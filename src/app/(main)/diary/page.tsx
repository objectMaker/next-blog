import { getUserInfoByJwt } from '@/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function Page() {
  try {
    const user = await getUserInfoByJwt();
    if (!user) {
      revalidatePath('/notFound');
      redirect('/notFound');
    }
  } catch (error) {
    console.log(error);
    revalidatePath('/notFound');
    redirect('/notFound');
  }
  return <div>diary</div>;
}
