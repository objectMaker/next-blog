import { redirect } from 'next/navigation';
import { signIn, providerMap } from '@/auth';
import { AuthError } from 'next-auth';
import Credentials from './_components/Credentials';

export default async function SignInPage() {
  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <div key={provider.name}>
          {provider.id === 'credentials' ? (
            <Credentials />
          ) : (
            <form
              action={async () => {
                'use server';
                try {
                  await signIn(provider.id);
                } catch (error) {
                  console.log(error, 'errorrrr');
                  // Signin can fail for a number of reasons, such as the user
                  // not existing, or the user not having the correct role.
                  // In some cases, you may want to redirect to a custom error
                  if (error instanceof AuthError) {
                    return redirect(`${'xx'}?error=${error.type}`);
                  }

                  // Otherwise if a redirects happens NextJS can handle it
                  // so you can just re-thrown the error and let NextJS handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error;
                }
              }}
            >
              <button type="submit">
                <span>Sign in with {provider.name}</span>
                <div>{provider.id}</div>
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
