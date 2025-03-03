import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly userPassword: Locator;
    readonly signInButton: Locator;
    readonly errorMessage: Locator;
    readonly welcomePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#user_login');
        this.userPassword = page.locator('#user_password');
        this.signInButton = page.locator("button[name='button']");
        this.errorMessage = page.locator('.flash-alert.mb-2');
        this.welcomePage = page.locator('.gl-font-size-h1')
    }

    async signIn(username: string, userpassword: string) {
        await this.userName.fill(username)
        await this.userPassword.fill(userpassword)
        await this.signInButton.click()
    }
}