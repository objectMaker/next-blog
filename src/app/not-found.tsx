import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex size-full flex-col items-center justify-center gap-y-2">
      <h2 className="rounded-sm bg-green-400 p-2 text-xl font-bold text-white shadow-sm">
        Not Found
      </h2>
      <p className="bg-red-500 p-2 font-serif text-white">
        Could not find requested resource
      </p>
      <Button asChild variant="default">
        <Link href="/">Return Home</Link>
      </Button>
    </section>
  );
}
