import { memo } from 'react';
import { FormatDateComponent } from './types';

const LOCALE = 'en-US';

export const FormatDate: FormatDateComponent = memo((props) => {
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
