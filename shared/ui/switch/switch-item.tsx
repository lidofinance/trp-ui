import { useCompareWithRouterPath } from 'shared/hooks/useCompareWithRouterPath';

import { SwitchItemStyled } from './styles';
import { SwitchItemComponent } from './types';

export const SwitchItem: SwitchItemComponent = (props) => {
  const { href, ...rest } = props;
  const active = useCompareWithRouterPath(href ?? '');

  return <SwitchItemStyled href={href ?? ''} $active={active} {...rest} />;
};
