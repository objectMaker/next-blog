'use client';
import { credentialAction } from '@/actions/user';
import { toast } from 'sonner';

export default function Credentials() {
  function handleSubmit(formData: FormData) {
    const asyncFn = async () => {
      try {
        await credentialAction(formData);
      } catch (e) {
        console.log(e, 'eeeeee');
        toast.error(e.message);
      }
    };
    asyncFn();
  }
  return (
    <form action={handleSubmit}>
      <div>
        email: <input type="email" name="email" className="border" />
      </div>
      <div>
        password: <input type="password" name="password" className="border" />
      </div>
      <button>submit credentials</button>
    </form>
  );
}
