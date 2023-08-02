import { Component } from 'solid-js';
import type { AwesomeIconType } from './awesomeIconType';

export const AwesomeIcon: Component<{
  icon: AwesomeIconType;
  class?: string;
  onClick?: () => void;
  rtl?: boolean;
}> = (props) => (
  <i
    class={`
  ${props.icon}
  ${props.class ?? ''}
  ${props.rtl ? 'rtl:transform rtl:-scale-x-100' : ''}
  `}
    onClick={props.onClick}
  />
);
