'use client'

import { Dialog, DialogContent, DialogPortal, DialogTrigger } from '@/components/ui/dialog';
import { CircleUserRound } from 'lucide-react';
import { AuthForms } from '../../../components/app-header/components/auth-forms';

export const Auth = () => {
  return (
    <Dialog>
      <DialogTrigger className="group px-3 py-2">
        <CircleUserRound
          size={28}
          color="#818B9C"
          className="group-hover:stroke-[#7B5E57] duration-200 ease-in-out"
        />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent aria-labelledby="auth-dialog-title" aria-describedby="auth-dialog-description">
          <h2 id="auth-dialog-title" className="sr-only">Authorization</h2>
          <p id="auth-dialog-description" className="sr-only">Enter your details for authorization.</p>
          <AuthForms />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
