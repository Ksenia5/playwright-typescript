import { faker } from '@faker-js/faker';

export class User {
    constructor(
      public firstname: string, 
      public lastname: string, 
      public username: string, 
      public useremail:string, 
      public userpassword: string,
      public user_role: string,
      public usage_reason: string
    ) {}

    static newUser(): User {
        const userpassword = 'Pwd4test!'
        const user_role = [
            'Software Developer', 
            'Development Team Lead', 
            'DevOps Engineer', 
            'Systems Administrator', 
            'Security Analyst', 
            'Data Analyst', 
            'Product Manager', 
            'Product Designer', 
            'Other'
        ]
        const usage_reason = [
            'I want to learn the basics of Git', 
            'I want to move my repository to GitLab from somewhere else', 
            'I want to explore GitLab to see if it’s worth switching to', 
            'I want to store my code', 
            'I want to use GitLab CI with my existing repository', 
            'A different reason'
        ]
        const timestamp = Date.now()
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const username = `${firstname}.${lastname}.${timestamp}`.toLowerCase();
        const useremail = `${firstname}.${lastname}.${timestamp}@gmail.com`

        return new User(
          firstname,
          lastname,
          username,
          useremail,
          userpassword,
          faker.helpers.arrayElement(user_role),
          faker.helpers.arrayElement(usage_reason)
        );
    }
}