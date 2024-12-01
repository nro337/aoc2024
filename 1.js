const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

let totalDifference = 0

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  let lst1 = []
  let lst2 = []
  arr.forEach(idx => {
    lst1.push(idx.split('   ')[0])
    lst2.push(idx.split('   ')[1])
  })
  lst1 = lst1.toSorted()
  lst2 = lst2.toSorted()

  lst1.forEach((value, index) => {
    console.log(lst1[index], lst2[index])
    let diff = Math.abs(lst1[index] - lst2[index])
    console.log(diff)
    totalDifference += diff
  })
  console.log(totalDifference)


}

syncReadFile('./1.txt');