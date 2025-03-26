import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { homePageLink } from '../../support/helpers'
import { HomePage } from '../../page-objects/HomePage'
import { User } from '../../support/Models/User';
import * as fs from 'fs-extra';

test.describe('SignIn Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePageLink(page)
    })

    test('Negative scenario with invalid creds', async ({page}) => {        
        await loginPage.signIn('invalid name', 'random password')
        await expect(loginPage.errorMessage).toContainText('Invalid login or password.')
    })

    test('Positive scenario for login', async ({page}) => {
        const userCreds: User = await fs.readJson('resources/.auth/userCreds.json')
        await loginPage.signIn(userCreds.username, userCreds.userpassword)
        await expect(homePage.welcomeTitle).toBeVisible()
    })
})