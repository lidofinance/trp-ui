import { memo } from 'react';
import { Component } from 'shared/ui/components';

export type FormatDateComponent = Component<
  'time',
  {
    timeStamp: number;
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
  }
>;

const LOCALE = 'en-US';

const FormatDate: FormatDateComponent = (props) => {
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
};

export default memo(FormatDate);
