const browserObject = require('./browser');
const scraperController = require('./pageController');

async function runScraper(url) {
    try {
        let browserInstance = await browserObject.startBrowser();
        return await scraperController.scrapeAll(browserInstance,url);
    } catch (error) {
        console.error('Error running the scraper:', error);
    }
}

module.exports = {runScraper};


