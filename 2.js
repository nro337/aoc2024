const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  let reports = []
  arr.forEach((row) => {
    let delimited = row.split(' ').map(Number)
    for (let i = 0; i < delimited.length; i++) {
      // Not ascending
      if (delimited[i] < delimited[i+1] && delimited[i+2] < delimited[i+1]) {
        return
      }
      else if (delimited[i] > delimited[i+1] && delimited[i+2] > delimited[i+1]) {
        return
      }
      // Not descending
      else if (delimited[i] > delimited[i+1] && delimited[i+2] > delimited[i+1]) {
        return
      } 
      else if (delimited[i] < delimited[i+1] && delimited[i+2] < delimited[i+1]) {
        return
      }
      else if ((Math.abs(delimited[i+1] - delimited[i]) < 1) || Math.abs(delimited[i+1] - delimited[i]) > 3) {
        return
      }
    }
    reports.push(delimited)
  })

  console.log(reports.length)

}

syncReadFile('./2.txt');