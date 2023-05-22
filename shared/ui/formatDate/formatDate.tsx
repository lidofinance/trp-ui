import { ComponentProps, FC, memo } from 'react';

const LOCALE = 'en-US';

export type FormatDateProps = ComponentProps<'time'> & {
  timeStamp: number;
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
};

export const FormatDate: FC<FormatDateProps> = memo((props) => {
  const { timeStamp, month, year, day, ...rest } = props;

  const date = new Date(timeStamp);
  const value = date.toLocaleString(LOCALE, {
    year: year || 'numeric',
    month: month || 'long',
    day: day || 'numeric',
  });

  return (
    <time dateTime={date.toISOString()} {...rest}>
      {value}
    </time>
  );
});

FormatDate.displayName = 'FormatDate';
