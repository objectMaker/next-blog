import ArticleCard from './_component/ArticleCard';
import { findArticle } from '@/actions/article';
import { auth } from '@/auth';

export const revalidate = 300;
export default async function Page() {
  const session = await auth();
  const list = await findArticle(session?.user?.id as string);
  return (
    <div className="grid grid-cols-1  gap-10 p-4 lg:grid-cols-2 2xl:grid-cols-3">
      {list.map((item, index) => {
        return <ArticleCard key={index} item={item} />;
      })}
    </div>
  );
}
