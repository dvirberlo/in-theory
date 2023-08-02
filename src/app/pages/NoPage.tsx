import { Component } from 'solid-js';
import { CenteredError } from '../components/lib/Error';

const NoPage: Component = () => {
  return <CenteredError message={'דף לא נמצא'} hideReload />;
};

export default NoPage;
