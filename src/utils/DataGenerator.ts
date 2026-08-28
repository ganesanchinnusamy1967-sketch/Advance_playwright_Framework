import { faker } from '@faker-js/faker';

export type UserCredentials = {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

/**
 * Generate a single set of user credentials for use in login tests.
 * Accepts optional overrides to pin any of the fields.
 */
export function generateCredentials(overrides: Partial<UserCredentials> = {}): UserCredentials {
  const firstName = overrides.firstName ?? faker.person.firstName();
  const lastName = overrides.lastName ?? faker.person.lastName();
  const username = overrides.username ?? String(faker.internet.userName({ firstName, lastName }));
  const password = overrides.password ?? faker.internet.password({ length: 10 });
  const email = overrides.email ?? String(faker.internet.email({ firstName, lastName }));

  return {
    username,
    password,
    firstName,
    lastName,
    email,
  };
}

/**
 * Convenience helper to generate multiple credentials at once.
 */
export function generateUsers(count = 1, overrides: Partial<UserCredentials> = {}) {
  const users: UserCredentials[] = [];
  for (let i = 0; i < count; i++) {
    users.push(generateCredentials(overrides));
  }
  return users;
}

/**
 * Build the payload object commonly used to submit the login form.
 * This mirrors the fields used by the `LoginPage` page object.
 */
export function buildLoginPayload(creds: UserCredentials) {
  return {
    username: creds.username,
    password: creds.password,
  };
}

/**
 * Some test suites prefer a deterministic, known user. This returns a
 * predictable user object you can use when a stable account is required.
 * Update these values if you have a canonical test account for the app.
 */
export function knownTestUser() : UserCredentials {
  return {
    username: 'test_user',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@example.com',
  };
}

export default {
  generateCredentials,
  generateUsers,
  buildLoginPayload,
  knownTestUser,
};
