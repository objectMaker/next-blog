import { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function DialogCloseButton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  function handleInputChange(e: ChangeEvent<HTMLInputElement>, key: string) {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  }

  async function handleConfirm() {
    await fetch('/api/article', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>create article</DialogTitle>
          <DialogDescription>you can add article right here</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div>title:</div>
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              value={formData.title}
              onChange={(e) => handleInputChange(e, 'title')}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div>content:</div>
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              value={formData.content}
              onChange={(e) => handleInputChange(e, 'content')}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              handleConfirm();
              setOpen(false);
            }}
          >
            confirm
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
