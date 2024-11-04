import { Dialog, DialogContent, DialogPortal, DialogTrigger } from '@/components/ui/dialog';
import { CircleUserRound } from 'lucide-react';

const ProfileButton = () => {
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
        <DialogContent>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ProfileButton;
