import { validateJwt } from '@/app/_utils';
export default function Page() {
  validateJwt();

  return (
    <>
      <div>123</div>
    </>
  );
}
