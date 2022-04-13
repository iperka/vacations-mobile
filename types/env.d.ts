declare module '@env' {
  export const AUTH0_DOMAIN: string;
  export const AUTH0_CLIENT_ID: string;
  export const AUTH0_AUDIENCE: string;
  export const ONE_SIGNAL_APP_ID: string;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
