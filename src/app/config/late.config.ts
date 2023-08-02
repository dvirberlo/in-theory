export function lateConfig() {
  late(async () => {
    Promise.all([
      import('./analytics.config'),
      import('./auth.config'),
      import('./firestore.config'),
    ]);
  });
}

function late(func: () => unknown) {
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', () => setTimeout(func, 100));
  else func();
}
