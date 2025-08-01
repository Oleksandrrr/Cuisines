export function login(parameters) {
  fetch('url', {
    body: parameters,
    method: 'GET',
  });
}
