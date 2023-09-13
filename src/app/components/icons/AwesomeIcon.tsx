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
  ${props.rtl ? 'rtl:-scale-x-100 rtl:transform' : ''}
  `}
    onClick={props.onClick}
  />
);
