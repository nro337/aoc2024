const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

// Needed help from https://www.reddit.com/r/adventofcode/comments/1h4ncyr/2024_day_2_solutions/

function checkReport(delimited) {
  let issueIndex = null
  for (let i = 0; i < delimited.length; i++) {
    // If at beginning or end, skip
    if (i === 0 || i === delimited.length - 1) {
      continue
    }
    if ((delimited[i+1] >= delimited[i] && delimited[i-1] >= delimited[i]) || 
        (delimited[i+1] <= delimited[i] && delimited[i-1] <= delimited[i]) || 
        (Math.abs(delimited[i+1] - delimited[i]) > 3) ||
        (Math.abs(delimited[i-1] - delimited[i]) > 3)) {
          issueIndex = i
          break
      }
  }
  return issueIndex
}

// Helper for removing index from array
// needed to check if removing the index would fix the issue
function removeFromArray(arr, index) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  let reports = []
  for (const row of arr) {
    let delimited = row.split(' ').map(Number)
    const issueIndex = checkReport(delimited)
    if (issueIndex === null) {
      reports.push(delimited)
      continue
    }

    const prevIssueIndex = checkReport(removeFromArray(delimited, issueIndex-1))
    const currentIssueIndex = checkReport(removeFromArray(delimited, issueIndex))
    const nextIssueIndex = checkReport(removeFromArray(delimited, issueIndex+1))
    if (prevIssueIndex === null || currentIssueIndex === null || nextIssueIndex === null) {
      reports.push(delimited)
      continue
    }
  }

  // console.log(reports)
  console.log(reports.length)

}

syncReadFile('./2.txt');