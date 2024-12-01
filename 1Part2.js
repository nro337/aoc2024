const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

let similarityScore = 0

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


  lst1.forEach((val, index) => {
    let countInList2 = 0
    if (lst2.includes(val)) {
      console.log(val)
      lst2.forEach((val2, index2) => {
        if (val2 === val) {
          countInList2 += 1
        }
      })
      similarityScore += val * countInList2
    }
  })

  console.log(similarityScore)

}

syncReadFile('./1.txt');