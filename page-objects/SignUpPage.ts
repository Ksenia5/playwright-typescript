import { expect, Locator, Page } from "@playwright/test";

export class SignUpPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly userName: Locator;
    readonly userEmail: Locator;
    readonly userPassword: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#new_user_first_name');
        this.lastName = page.locator('#new_user_last_name');
        this.userName = page.locator('#new_user_username');
        this.userEmail = page.locator('#new_user_email');
        this.userPassword = page.locator('#new_user_password');
        this.registerButton = page.locator("[data-qa-selector='new_user_register_button']");
    }

    async signUp(firstname: string, lastname: string, username: string, useremail:string, userpassword: string) {
        await this.firstName.fill(firstname)
        await this.lastName.fill(lastname)
        await this.userName.fill(username)
        await this.userEmail.fill(useremail)
        await this.userPassword.fill(userpassword)
        await this.registerButton.click()
    }
}