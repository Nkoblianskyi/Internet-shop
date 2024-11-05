import ProfileRow from '@/components/ProfileButton/components/ProfileRow';
import { Coins, Wallet } from 'lucide-react';
import numberToCurrency from '@/utils/numberToCurrency';
import { mockedUser } from '@/mocks/user';

const UserBalanceInfo = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-[#818B9C] text-[1.25rem]">
        Wallet
      </p>
      <div className="flex flex-col gap-2">
        <ProfileRow
          icon={<Wallet size={24} />}
          name="Balance"
          value={numberToCurrency(mockedUser.balance)}
        />
        <ProfileRow
          icon={<Coins size={24} />}
          name="Coins"
          value={mockedUser.coins}
        />
      </div>
    </div>
  );
};

export default UserBalanceInfo;
