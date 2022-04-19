import {basePage} from '../pageObjects/base.page.js';
import {logIn} from '../pageObjects/login.page.js';
import { go } from '../pageObjects/base.page.js';
import {buy} from '../pageObjects/difcart-addition.page.js';
import {cart} from '../pageObjects/difcart-addition.page.js';


describe('Select product and add it to cart', function(){
    let credentials;
    let paying;
    before ('Go to the main page', function () {
        cy.fixture('credentials.json').then(function(creds){
            credentials = creds;

            // Access the site
            go.toHomePage();
            basePage.urlShouldContain('/demoblaze.com');

            // Login
            logIn.clickOnLogInLink();
            logIn.typeUser(credentials.user);
            logIn.typePassword(credentials.password);
            logIn.clickOnLogInButton();

            logIn.welcomeMessageShouldGreet(credentials.user);
            basePage.wait();

        })

        cy.fixture('payingData.json').then(function(data){
            paying = data;
             // Clear the cart in case there were products in
            buy.clickOnCart();
            cart.clear(paying.name, paying.creditCard);

        });

        
        
    });

    beforeEach ('Keep cookies and reload', function(){
        Cypress.Cookies.preserveOnce('tokenp_', 'user');
        basePage.reload();
        go.toHomePage();
    })

   

    it ('Validate product title', function() {
        buy.clickOnProduct();
        
        buy.productTitleShouldBeVisible();
    })

   

    it ('Validate product price', function() {
        buy.clickOnProduct();
        
        buy.priceContainerShouldBeVisible();
    })

    it ('Validate product description', function() {
        buy.clickOnProduct();
        
        buy.productDescriptionShouldBeVisible();
    })

    it ('Validate laptop is successfully added  cart', function() {
        buy.clickOnProduct();
        buy.clickOnAddToCart();

        buy.cartAlertShouldHaveText('Product added');
    })

});

describe('Checkout different products in cart', function(){
    let paying;
    let credentials;
    before ('Go to the main page', function () {
        // load credentials
        cy.fixture('credentials.json').then(function(creds){
            credentials = creds;

            // Access the site
            go.toHomePage();
            basePage.urlShouldContain('/demoblaze.com');

            // Login
            logIn.clickOnLogInLink();
            logIn.typeUser(credentials.user);
            logIn.typePassword(credentials.password);
            logIn.clickOnLogInButton();

            logIn.welcomeMessageShouldGreet(credentials.user);
            basePage.wait();

            //Check the cart page loads successfully
            buy.clickOnCart();
            basePage.urlShouldContain('cart');
        });
        
        
        // load paying data
        cy.fixture('payingData.json').then(function(data){
            paying = data;

            // Clear the cart in case there were products in
            cart.clear(paying.name, paying.creditCard);
            // Add three products to the cart
            go.toHomePage();
            buy.clickOnProduct();
            buy.clickOnAddToCart(); 
            basePage.wait();
            go.toHomePage();
            buy.clickOnProductTwo();
            buy.clickOnAddToCart();
            basePage.wait();
            buy.clickOnAddToCart();
        })

        buy.clickOnCart();

    });

    beforeEach ('Keep cookies and reload', function(){
        Cypress.Cookies.preserveOnce('tokenp_', 'user');
        basePage.reload();
        cy.wait(1000);
    });


    it ('Should display the Products title', function(){
        buy.cartPageTitleShouldBe('Products');
    });

    it ('Should display products table header correctly', function(){
        buy.tableHeadImageTextShouldBe('Pic');
        buy.tableHeadTitleTextShouldBe('Title');
        buy.tableHeadPriceTextShouldBe('Price');
        buy.tableHeadDeleteTextShouldBe('x');
    });


    it ('Should display the total price', function(){
        buy.totalPriceShoulBeVisible();
    });

    it ('Should display purchase modal after clicking on place order', function(){
        buy.placeORder();

        buy.orderModalShouldBeVisible();
    });

    it ('Should not allow to place an order without name or card introduced', function(){
        buy.placeORder();
        buy.clickOnPurchase();

        buy.cartAlertShouldHaveText('Please fill out Name and Creditcard.');
    });

    it ('Should place an order after introducing name and card', function(){
        buy.placeORder();
        buy.typeName(paying.name);
        buy.typeCard(paying.creditCard);
        buy.clickOnPurchase();

        buy.sweetAlertShouldBeVisible();
        buy.orderTextShouldContain(paying.name);
        buy.orderTextShouldContain(paying.creditCard);
        buy.orderTextShouldHavePrice()

    });
});