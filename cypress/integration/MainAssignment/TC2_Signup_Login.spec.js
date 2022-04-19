import {basePage} from '../pageObjects/base.page.js';
import { go } from '../pageObjects/base.page.js';
import {logIn} from '../pageObjects/login.page.js';

describe ('log in the site', function () {
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
    it ('Login with incorrect username and incorrect password', function () {
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.wrongUSer);
        logIn.typePassword(credentials.wrongPassword);
        logIn.clickOnLogInButton();

        logIn.logInAlertShouldHaveText('User does not exist.');
    });
//Test2
it ('Login with correct username and empty password', function(){
    logIn.clickOnLogInLink();
    logIn.typeUser(credentials.user);
    logIn.typePassword(credentials.emptyPassword);
    logIn.clickOnLogInButton();

    logIn.logInAlertShouldHaveText('Please fill out Username and Password.');
});
//Test 3
    it ('Login with empty  username and valid password', function(){
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.emptyUser);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();

        logIn.logInAlertShouldHaveText('Please fill out Username and Password.');
    });
//Test 4
    it ('Login with invalid username', function () {
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.wrongUSer);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();

        logIn.logInAlertShouldHaveText('User does not exist.');
    });


//Test 5
    it ('Login with valid username and password', function(){
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.user);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();

        logIn.welcomeMessageShouldGreet(credentials.user);
    });

   
});