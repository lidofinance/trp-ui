import { Main } from 'shared/ui';
import { AragonWallet } from './aragonWallet';
import { AragonForm } from './aragonForm';
import { VestingCarousel } from './vestingsCarousel';

export const Aragon = () => {
  return (
    <Main>
      <AragonWallet></AragonWallet>

      <Main.Card>
        <VestingCarousel />
        <AragonForm />
      </Main.Card>
    </Main>
  );
};
