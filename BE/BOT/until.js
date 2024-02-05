
function extractAllNumbersFromLink(link) {
  const matches = link.match(/\d+/g);
  
  if (matches) {
    return matches.join('-');
  } else {
    return null;
  }
}



module.exports = {extractAllNumbersFromLink};


