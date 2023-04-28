import { Input } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const InputStyled = styled(Input)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
