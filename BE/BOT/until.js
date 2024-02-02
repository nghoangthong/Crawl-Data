
// function findAndLick(){
// const xpathExpression = "//*[text()='Xem thêm bình luận']";
// const result = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

// const element = result.singleNodeValue;


// if (element) {
//   element.click();
// } else {
//   console.log("Không tìm thấy phần tử.");
// }
// }

function extractAllNumbersFromLink(link) {
  const matches = link.match(/\d+/g);
  
  if (matches) {
    return matches.join('-');
  } else {
    return null;
  }
}



module.exports = {extractAllNumbersFromLink};


