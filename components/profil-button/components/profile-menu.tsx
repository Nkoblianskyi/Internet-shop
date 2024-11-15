import ProfileRow from '@/components/profil-button/components/profile-row';
import { Heart, Receipt, Settings } from 'lucide-react';

const ProfileMenu = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-[#818B9C] text-[1.25rem]">
        Menu
      </p>
      <div className="flex flex-col gap-2">
        <ProfileRow
          icon={<Receipt size={24} />}
          name="Purchase"
          linkTo="/purchase"
        />
        <ProfileRow
          icon={<Heart size={24} />}
          name="Wishlist"
          linkTo="/wishlist"
        />
        <ProfileRow
          icon={<Settings size={24} />}
          name="Settings"
          linkTo="/settings"
        />
      </div>
    </div>
  );
};

export default ProfileMenu;
