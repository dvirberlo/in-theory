import { ParentComponent } from 'solid-js';
import { classes } from '../../utils/tw';

export const ExternalLink: ParentComponent<{ href: string; class?: string }> = (
  props,
) => {
  return (
    <a
      class={classes('text-blue-500 hover:text-opacity-80', props.class ?? '')}
      href={props.href}
      children={props.children}
    />
  );
};
