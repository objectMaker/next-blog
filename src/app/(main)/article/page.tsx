import db from '@/db';
import ArticleCard from './_component/ArticleCard';
export default async function Page() {
  const list = await db.article.findMany({
    include: {
      user: true,
    },
  });
  return (
    <div className="grid grid-cols-1  gap-10 p-4 lg:grid-cols-2 2xl:grid-cols-3">
      {list.map((item, index) => {
        return <ArticleCard key={index} item={item} />;
      })}
    </div>
  );
}
