const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

const mulResults = []
let txtString = ''

function readParsedFile(contents) {
  for (let i = 0; i < contents.length; i++) {
    if (i === contents.length - 1) {
      return null
    }
    // console.log(contents[i], contents[i+1], contents[i+2], contents[i+3])
    if (contents[i] === 'm' && contents[i+1] === 'u' && contents[i+2] === 'l' && contents[i+3] === '(') {
      if (!isNaN(parseFloat(contents[i+4]))) {
        // Look for next comma
        for (const char of contents.slice(i+4)) {
          if (char === ',') {
            let indexOfComma = contents.indexOf(char)
            // If the character before the comma is a number, that's a good sign
            if (!isNaN(parseFloat(contents[indexOfComma-1]))) {
              // console.log(contents[indexOfComma-2])
              // console.log('Found comma')
              console.log(contents.slice(i+4, indexOfComma))
              let temp = contents.slice(contents[i+4], indexOfComma).split('(')[1]
              console.log(`Temp=${temp}`)
              for (const paren of contents.slice(indexOfComma+1)) {
                console.log(contents.slice(indexOfComma+1, indexOfComma+4))
                if (paren === ')') {
                  // let indexOfParen = contents.indexOf(paren)
                  // console.log('Found closing paren')
                  if (isNaN(parseFloat(contents.slice(contents.indexOf(paren)-1)))) {
                    console.log("Hmmmm")
                    let temp2 = contents.slice(indexOfComma+1).split(')')[0]
                    mulResults.push(parseFloat(temp) * parseFloat(temp2))
                    console.log(contents[contents.indexOf(paren)+1])
                    return contents.slice(contents.indexOf(paren)+1)
                    // break
                    // return contents.slice(contents.indexOf(paren)+1)
                  }
                  let temp2 = contents.slice(indexOfComma+1).split(')')[0]
                  // console.log(contents[indexOfComma+1], contents[indexOfComma+2], contents[indexOfComma+3])
                  console.log(`Temp2=${temp2}`)
                  mulResults.push(parseFloat(temp) * parseFloat(temp2))
                  // console.log(contents.slice(contents.indexOf(paren)+1))
                  console.log(contents.slice(contents.indexOf(paren)-1, contents.indexOf(paren)+8))
                  // console.log(contents[contents.indexOf(paren)+1])
                  return contents.slice(contents.indexOf(paren)+1)
                } else {
                  // console.log("Paren",paren)
                }
              }
            }


            // console.log('Found comma')
            // break
          }
        }
      }
    }
  }
}


function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  return contents
  // console.log(contents)

  // const arr = contents.split(/\r?\n/);


  console.log(mulResults)



}

const contents = syncReadFile('./3.txt');
txtString += contents
while (txtString !== null) {
  let reducedContents = readParsedFile(txtString)
  console.log(reducedContents.slice(0, 10))
  txtString = reducedContents
  console.log(mulResults)
  // break
  // return
  // console.log(txtString)
}
// readParsedFile(contents)
// console.log(mulResults)