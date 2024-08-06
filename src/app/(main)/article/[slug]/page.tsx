import db from '@/db';
export default async function Page(props: {
  params: {
    slug: string;
  };
}) {
  console.log(props.params.slug, 'xxxxxxxxxxxxxxxxx');
  const article = await db.article.findFirst({
    where: {
      id: props.params.slug,
    },
  });
  return (
    <div>
      <div>{article?.title}</div>
      <div>{article?.content}</div>
    </div>
  );
}
