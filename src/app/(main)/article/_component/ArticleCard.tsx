import { Article, User } from '@prisma/client';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ArticleCard({
  item,
  className,
}: {
  item: Article & {
    user: User;
  };
  className?: string;
}) {
  return (
    <Card
      className={cn(
        'w-full transition-all ease-linear hover:shadow-lg',
        className,
      )}
    >
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>tags</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="p-4">{item.content}</div>
      </CardContent>
      <CardFooter>
        <div>create by {item.user.email}</div>
      </CardFooter>
    </Card>
  );
}
