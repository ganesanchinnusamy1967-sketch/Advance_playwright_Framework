/**
 * BasePage: common functionality shared by all page objects.
 *
 * Provides:
 * - a Playwright `page` instance
 * - a scoped `log` (winston) for the page
 * - a `util` instance (UtilElementLocator) for common interactions
 */
import { type Page } from '@playwright/test';
import { createLogger, type Logger } from '../utils/logger';
import { UtilElementLocator } from '../utils/UtilElementLocator';

export class BasePage {
	protected readonly page: Page;
	protected readonly log: Logger;
	protected readonly util: UtilElementLocator;

	constructor(page: Page, scope?: string) {
		this.page = page;
		const s = scope ?? this.constructor.name;
		this.log = createLogger(s);
		this.util = new UtilElementLocator(page, s);
	}

	/** Navigate to an absolute URL (or path resolved by test's baseURL). */
	async navigateTo(urlOrPath: string): Promise<void> {
		this.log.info(`navigateTo ${urlOrPath}`);
		await this.page.goto(urlOrPath);
		await this.util.waitForPageLoad();
	}

	async goto(urlOrPath: string): Promise<void> {
		await this.navigateTo(urlOrPath);
	}

	getUtils(): UtilElementLocator {
		return this.util;
	}
}

