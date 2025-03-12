import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/LoginPage'
import { homePageLink } from '../support/helpers'

test.describe('SignIn Flow', () => {
    let loginPage: LoginPage
    
    test.beforeAll(async ({page}) => {
        loginPage = new LoginPage(page)
        await homePageLink(page)
    })

    test('Negative scenario with invalid creds', async ({page}) => {        
        await loginPage.signIn('invalid name', 'random password')
        await expect(loginPage.errorMessage).toContainText('Invalid login or password.')
    })

    test('Positive scenario for login', async ({page}) => {
        await loginPage.signIn('oksana_test1', 'Pwd4test!')
        await expect(loginPage.welcomePage).toBeVisible()
    })
})