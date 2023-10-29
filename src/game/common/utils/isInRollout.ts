export function isInRollout(): boolean {
  const url = window.location.href;
  const queryParams = new URLSearchParams(url.split('?')[1]);

  return queryParams.has('release') && queryParams.get('release') === 'true';
}
