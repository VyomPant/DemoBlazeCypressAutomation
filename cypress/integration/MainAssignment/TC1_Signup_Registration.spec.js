import {basePage} from '../pageObjects/base.page.js';
import { go } from '../pageObjects/base.page.js';
import {signUp} from '../pageObjects/sign-up.page.js';

describe ('Sign up', function () {
    let credentials;

    before ('Go to the main page', function () {
        // load credentials
        cy.fixture('credentials.json').then(function(cred){
            credentials = cred;
        }); 
        
        // Access the site
        go.toHomePage();
        basePage.urlShouldContain('/demoblaze.com');
    });

    beforeEach ('Reload page', function(){
        basePage.reload();
    });
       
//Test 1
it ('Registration with empty username', function(){
    signUp.clickOnSignUp();
    signUp.typeUser(credentials.emptyUser);
    signUp.typePassword(credentials.password);
    signUp.clickOnSignUpButton();

    signUp.signUpAlertShouldHaveText('Please fill out Username and Password.');
});


       
//Test 2
it ('Registration with empty password', function(){
    signUp.clickOnSignUp();
    signUp.typeUser(credentials.existingUser);
    signUp.typePassword(credentials.emptyPassword);
    signUp.clickOnSignUpButton();

    signUp.signUpAlertShouldHaveText('Please fill out Username and Password.');
});

//Test 3
    it ('Registration with empty username and empty password', function(){
        signUp.clickOnSignUp();
        signUp.clickOnSignUpButton();

        signUp.signUpAlertShouldHaveText('Please fill out Username and Password.');
    });
//Test4
    it ('Registration with existing user', function(){
        signUp.clickOnSignUp();
        signUp.typeUser(credentials.existingUser);
        signUp.typePassword(credentials.password);
        signUp.clickOnSignUpButton();

        signUp.signUpAlertShouldHaveText('This user already exist.');
    });
//Test 5
    it ('Registration with New User', function() {
        signUp.clickOnSignUp();
        signUp.typeUser(credentials.newUser);
        signUp.typePassword(credentials.password);
        signUp.clickOnSignUpButton();

        signUp.signUpAlertShouldHaveText('Sign up successful.');
    });

   
})