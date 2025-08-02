export const loginTestData = {
  validUsername: 'john',
  validPassword: 'demo',
  invalidUsername: 'wrong',
  invalidPassword: 'invalid',
};

export const loginSelectors = {
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'input[value="Log In"]',
  welcomeMessage: '#leftPanel > h2',
  errorMessage: '.error',
};
