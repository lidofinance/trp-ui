import { Component } from 'shared/ui';

export type FormatDateComponent = Component<
  'time',
  {
    timeStamp: number;
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
  }
>;
