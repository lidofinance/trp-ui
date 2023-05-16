import {
  SectionStyle,
  SectionHeaderStyle,
  SectionTitleStyle,
  SectionHeaderDecoratorStyle,
  SectionContentStyle,
} from './sectionStyles';
import { ComponentProps, FC } from 'react';

export type SectionProps = Omit<ComponentProps<'section'>, 'ref'> & {
  title?: React.ReactNode;
  headerDecorator?: React.ReactNode;
};

export const Section: FC<SectionProps> = (props) => {
  const { title, headerDecorator, children, ...rest } = props;
  const hasDecorator = !!headerDecorator;

  return (
    <SectionStyle {...rest}>
      <SectionHeaderStyle>
        <SectionTitleStyle>{title}</SectionTitleStyle>
        {hasDecorator && (
          <SectionHeaderDecoratorStyle>
            {headerDecorator}
          </SectionHeaderDecoratorStyle>
        )}
      </SectionHeaderStyle>
      <SectionContentStyle>{children}</SectionContentStyle>
    </SectionStyle>
  );
};
