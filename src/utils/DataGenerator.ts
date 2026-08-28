import { faker } from '@faker-js/faker';

export type Credentials = {
	username: string;
	password: string;
	firstName?: string;
	lastName?: string;
	email?: string;
};

/**
 * Generate a realistic-looking username and password for TTA Cart tests.
 * Returns a small object with `username` and `password` fields and optional profile data.
 */
export function generateCredentials(overrides: Partial<Credentials> = {}): Credentials {
	const firstName = overrides.firstName ?? faker.person.firstName();
	const lastName = overrides.lastName ?? faker.person.lastName();
	// build a readable username using first/last parts
	const baseUsername = `${firstName}.${lastName}`.toLowerCase().replace(/\s+/g, '_');
	const username = overrides.username ?? `${baseUsername}${faker.number.int({ min: 1, max: 999 })}`;
	const password = overrides.password ?? faker.internet.password({ length: 12 });
	const email = overrides.email ?? faker.internet.email({ firstName, lastName }).toString();

	return {
		username,
		password,
		firstName,
		lastName,
		email,
	};
}

/**
 * Simple helper that returns only username/password suitable for quick login calls.
 */
export function fakeLogin(overrides: Partial<Credentials> = {}): Pick<Credentials, 'username' | 'password'> {
	const creds = generateCredentials(overrides);
	return { username: creds.username, password: creds.password };
}

/**
 * Known stable accounts you can use when a deterministic user is required.
 * Update these if you have canonical test accounts for the TTA Cart application.
 */
export const knownAccounts = {
	stable: { username: 'test_user', password: 'Password123!' },
	demo: { username: 'demo_user', password: 'DemoPass123!' },
};

/**
 * Return a stable test account to use when a known user is required.
 */
export function stableTestLogin(): Credentials {
	const a = knownAccounts.stable;
	return { username: a.username, password: a.password };
}

/**
 * Build the payload object commonly used to submit the login form.
 */
export function buildLoginPayload(creds: Pick<Credentials, 'username' | 'password'>) {
	return { username: creds.username, password: creds.password };
}

export default {
	generateCredentials,
	fakeLogin,
	stableTestLogin,
	knownAccounts,
	buildLoginPayload,
};
