import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly userPassword: Locator;
    readonly signInButton: Locator;
    readonly errorMessage: Locator;
    readonly registerNowButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#user_login');
        this.userPassword = page.locator('#user_password');
        this.signInButton = page.locator("button[name='button']");
        this.errorMessage = page.locator('.flash-alert.mb-2');
        this.registerNowButton = page.locator("[data-qa-selector='register_link']")
    }

    async signIn(username: string, userpassword: string) {
        await this.userName.fill(username)
        await this.userPassword.fill(userpassword)
        await this.signInButton.click()
    }
}