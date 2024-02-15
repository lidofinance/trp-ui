/// <reference types="@lidofinance/theme" />
/// <reference types="styled-components/cssprop" />

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

type RuntimeConfig = {
  rpcUrls_1: string[];
  rpcUrls_5: string[];
};
