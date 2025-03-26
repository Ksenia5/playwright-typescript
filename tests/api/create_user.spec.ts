import { test, expect } from '@playwright/test'
import { User } from '../../support/Models/User'

test('Create user for signup', async ({ request }) => {
    const newUser = User.newUser();
    const response = await request.post('https://gitlab.testautomate.me/api/v4/users', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
        },
        data: {
            "name": newUser.firstname,
            "lastname": newUser.lastname,
            "username": newUser.username,
            "email": newUser.useremail,
            "password": newUser.userpassword,
            "skip_confirmation": true
        }
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.username).toBe(newUser.username);

    const getUser = await request.get(`https://gitlab.testautomate.me/api/v4/users/${responseBody.id}`, {
        headers: {
            'Authorization': 'Bearer FKzy_BpV5wAybKf7Z9JX',
        }
    });
    expect(getUser.status()).toBe(200);
});

