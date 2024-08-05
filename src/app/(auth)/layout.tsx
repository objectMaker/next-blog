import { githubSignInAction } from '@/actions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Github } from 'lucide-react';
import Image from 'next/image';
import NavLink from './_components/NavLink';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="-mt-16">
        <div className="flex flex-col items-center gap-y-1 pb-4">
          <Image
            src="/pig.svg"
            width={120}
            height={120}
            alt="Picture of the pig"
          />
        </div>
        <div className="w-[500px] overflow-hidden rounded-md border border-gray-200 shadow-lg">
          <div className="p-5 shadow-lg">
            {children}
            <div className="flex items-center justify-between">
              <div className="text-gray-500">already have an account?</div>
              <NavLink />
            </div>
            <Separator className="my-2"></Separator>
            <footer className="flex w-full items-center justify-between text-gray-500">
              <div>third party login:</div>
              <div className="flex items-center gap-x-2">
                <form action={githubSignInAction}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="size-10 rounded-full p-2">
                          <Github className="size-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>github login</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </form>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
