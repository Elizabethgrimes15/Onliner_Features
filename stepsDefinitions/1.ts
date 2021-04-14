import { browser, by, element, ElementFinder, ExpectedConditions } from "protractor";
import { BrowserHacks } from "../../support/browserHacks";

const defaultTimeout = browser.params.defaultTimeout;

export = function exampleSteps() {

    //Default cucumber timeout
    this.setDefaultTimeout(600 * 1000);

    //Loading browser hacks
    let browserHacks = new BrowserHacks;

    //Hooks
    this.Before(async () => {
        //ACTIONS BEFORE EXECUTING EACH TEST, I.E. SOME PRE-REQS FOR TEST OR SETUP
    });

    this.After(async () => {
        //ACTIONS AFTER EXECUTING EACH TEST, I.E. CLEANUP
        await browserHacks.ClearBrowserData();
    });

    //Step Definitions

    //Given expression, can only be used with Given in .feature file
    this.Given(/^I am on Onliner homepage$/, async () => {
        browser.navigate().to(browser.params.onlinerByURL);
    });

    this.Then(/^I see Baraholka button$/, async () => {
        //Looking for Baraholka matches
        let baraholkabutton:ElementFinder = await element(by.xpath("//a[contains(text(), 'Барахолка')]"));
        await browser.wait(ExpectedConditions.visibilityOf(baraholkabutton), defaultTimeout, "Baraholka button doesn't exist or has incorrect locator");
    });

    this.Then(/^I switched to Baraholka page$/, async () => {
        let baraholkaurl:ElementFinder = await element(by.xpath("//a[contains(text(), 'Барахолка')]"));
        await baraholkaurl.click();
        await browser.wait(ExpectedConditions.urlContains("https://baraholka.onliner.by/"), defaultTimeout, "URL wasn't changed");
    });

}