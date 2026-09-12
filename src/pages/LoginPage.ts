import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  static readonly PATH = '/playwright/ttacart/index.html';
 // private readonly page: Page;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly errorBox: Locator;
  private readonly loginCredentialsHint: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    //this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorBox = page.locator('[data-test="error"]');
    this.loginCredentialsHint = page.locator('[data-test="login-credentials"]');
  }

  async open(): Promise<void> {
    await this.goto(LoginPage.PATH);
  }

  async LoginAs(username:string , password : string):Promise<void>{
    this.log.info(`Login attempt for user: ${username}`);
    await this.util.fill(this.username, username);
    await this.util.fill(this.password, password);
    await this.util.click(this.loginButton);

    // Wait for page to finish loading after login action
    await this.util.waitForPageLoad();

    // If an error box is visible, log the error text
    if (await this.util.isVisible(this.errorBox)) {
      const txt = await this.util.getText(this.errorBox);
      this.log.warn(`Login failed for ${username}: ${txt}`);
    } else {
      this.log.info(`Login succeeded for ${username}`);
    }
  }
}
