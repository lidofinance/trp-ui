import { Block } from '@lidofinance/lido-ui';
import { useVestings } from 'features/vesting';

export const AdminForm = () => {
  const vestings = useVestings();

  console.log(vestings);

  return <Block>Admin</Block>;
};
