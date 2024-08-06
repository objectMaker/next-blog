import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export default function Submit() {
  const status = useFormStatus();
  return (
    <>
      <Button disabled={status.pending}>Submit</Button>
    </>
  );
}
