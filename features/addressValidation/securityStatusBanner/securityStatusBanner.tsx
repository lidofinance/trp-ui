import { Modal } from '@lidofinance/lido-ui';

import { Wrapper, WarningBlock, WarningText } from './styles';
import { useAddressValidation } from '../addressValidationProvider';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';
import WarningIcon from '../icons/warning.svg';

export const SecurityStatusBanner = () => {
  const { isValidAddress, setIsValidAddress } = useAddressValidation();

  return (
    <NoSSRWrapper>
      <Modal
        open={!isValidAddress}
        onClose={!isValidAddress ? () => setIsValidAddress(true) : undefined}
      >
        <Wrapper>
          <WarningIcon />
          <WarningBlock>
            <WarningText>Sorry, access is currently unavailable.</WarningText>
          </WarningBlock>
        </Wrapper>
      </Modal>
    </NoSSRWrapper>
  );
};
