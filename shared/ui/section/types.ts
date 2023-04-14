import React from 'react';
import { Component } from 'shared/ui';

export type SectionComponent = Component<
  'section',
  {
    title?: React.ReactNode;
    headerDecorator?: React.ReactNode;
  }
>;
