const CONSTANTS = require("../Config/constant");
const fs = require("fs");
const browserObject = require("./browser");
const scraperController = require("./pageController");
const model = require("../Model/model")
const Until = require('./until')

async function scrollDownMultipleTimes(page, scrollCount, scrollAmount) {
  try {
    const distance = scrollAmount || 100;
    for (let i = 0; i < scrollCount; i++) {
      await page.evaluate((distance) => {
        window.scrollBy(0, distance);
      }, distance);
      await page.waitForTimeout(4000);
    }
  } catch (error) {
    console.error("Error while scrolling:", error);
  }
}

async function findElement(page, elementSelector) {
  const subjectElements = await page.$x(elementSelector);

  if (subjectElements) {
    const elementCount = subjectElements.length;
    console.log("số element:", elementCount);
    return subjectElements;
  } else {
    console.log("không tìm thấy element");
    return null;
  }
}

async function findAndLick(page) {
  const elementSelector = "//*[text()='Xem thêm bình luận']";
  const elements = await page.$x(elementSelector);

  if (elements && elements.length > 0) {
    console.log("Tìm thấy phần tử. Đang click...");
    await elements[0].click();
    console.log("Đã click thành công.");
  } else {
    console.log("Không tìm thấy phần tử.");
  }
}

// async function textElement(page, elementSelector) {
//   let subjectElements = await findElement(page, elementSelector);
//   if (subjectElements) {
//     const textContent = await page.evaluate(
//       (element) => element.textContent,
//       subjectElements[0]
//     );
//     console.log("text:", textContent);
//     return textContent;
//   }
// }

// async function appendToJson(name, comment) {
//   const data = {
//     name: name,
//     comment: comment
//   };
//   try {
//     const jsonData = JSON.stringify(data, null, 2);
//     await fs.promises.appendFile('output.json', jsonData + '\n');
//     console.log('Dữ liệu đã được thêm vào file output.json');
//   } catch (error) {
//     console.error('Lỗi khi thêm vào file JSON:', error);
//   }
// }

// function findText(document) {
// const childElements = document.querySelectorAll('.xv55zj0.x1vvkbs.x1rg5ohu.xxymvpz > *');
// childElements.forEach((childElement, index) => {
//   console.log(`Nội dung của thẻ con thứ ${index + 1}: ${childElement.textContent.trim()}`);
// });

// }

async function findText(page) {
  try {
    const result = await page.evaluate(() => {
      const parentElements = document.querySelectorAll('div[class="xv55zj0 x1vvkbs x1rg5ohu xxymvpz"]');
      const data = [];

      parentElements.forEach((parentElement, index) => {
        try {
          const textA = parentElement.querySelector('span.xt0psk2').textContent.trim();
          const textB = parentElement.querySelector('.x1lliihq.xjkvuk6.x1iorvi4').textContent.trim();

          data.push({ Name: textA, Comments: textB });
        } catch (error) {
          console.error(`Lỗi khi xử lý thẻ con thứ ${index + 1}:`, error);
        }
      });

      return data;
    });

    // console.log(result);
    return result;
  } catch (error) {
    console.error("Lỗi khi thực hiện findText:", error);
    return [];
  }
}


async function login(page) {
  await page.type("#email", "61555877131908");

  await page.waitForTimeout(2000);

  await page.type("#pass", "vietasoft");

  await page.waitForTimeout(2000);

  await page.click('button[name="login"]');
}

async function scraperFunction(browser, url) {
  let page = await browser.newPage();
  console.log(`Chuyển đến ${CONSTANTS.URL_FACEBOOK}...`);
  await page.goto(CONSTANTS.URL_FACEBOOK);

  await page.waitForTimeout(4000);

  await login(page);

  await page.waitForTimeout(5000);

  await page.goto(url);

  await page.waitForTimeout(3000);

  scrollDownMultipleTimes(page, 2, 500);

  await page.waitForTimeout(3000);

  findAndLick(page);

  await page.waitForTimeout(5000);

  scrollDownMultipleTimes(page, 2, 300);

  const vauleText = await findText(page);
  // const nameJson = Until.extractAllNumbersFromLink(url)
  await page.waitForTimeout(5000);
  await browser.close()

  return vauleText
}

// async function runScraper() {
//   try {
//     let browserInstance = await browserObject.startBrowser();

//     await scraperController(browserInstance);
//   } catch (error) {
//     console.error("Error running the scraper:", error);
//   }
// }

module.exports = { scraperFunction };
