function getDividedString(str = "") {
  return str.split('\n');
}

function readFromFileURL(fileURL = "") {
  return new Promise((resolve, reject) => {
    fetch(fileURL)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = function (event) {
          const text = event.target.result;
          resolve(text);
        };
        reader.onerror = function (event) {
          console.error("Error reading file:", event.target.error);
          reject(event.target.error);
        };
        reader.readAsText(blob);
      })
      .catch(error => {
        console.error("Error:", error);
        reject(error);
      });
  });
}

async function getFileNameList(pathStartsFromIndex = "") {
  try {
    text = await readFromFileURL("https://ivan-krul.github.io/ComixHolder/" + pathStartsFromIndex);
    return getDividedString(text);
  } catch (error) {
    console.error("Error:", error);
  }
}

// We have this format of file names -> [author] - [name] [page number].[format]
function getComixListFromAuthor(fileContent = [""], author = "") {
  let comixList = [];

  let authorComixList = fileContent.filter(function (finename) {
    return finename.split("()")[0] === author
  });
  let comixNameList = authorComixList.map(function (authorComixFilename) {
    return authorComixFilename.split("()")[1];
  });

  for (let i = 0; i < comixNameList.length; i++) {
    if (comixList.findIndex(x => x === comixNameList[i]) === -1)
      comixList.push(comixNameList[i]);
  }

  return comixList;
}

function generateGoToComixButtons(author = "", comixList = []) {
  let tagUl = document.getElementById("comixlist");
  for (let i = 0; i < comixList.length; i++) {
    let tagLi = document.createElement("li");
    let tagA = document.createElement("a");
    tagA.href = "comix_content.html?author=" + author + "&comix=" + comixList[i];
    tagA.innerText = comixList[i];
    tagLi.appendChild(tagA);
    tagUl.appendChild(tagLi);
  }
}

if (localStorage.length !== 0) {
  localStorage.clear();
}

(async () => {
  const fileContent = await getFileNameList("comix/content.txt");
  console.log(fileContent);
  const urlParams = new URLSearchParams(window.location.search);
  const author = urlParams.get('author');
  //const comix = urlParams.get('comix');

  let comixList = getComixListFromAuthor(fileContent, author);
  console.log(comixList);

  generateGoToComixButtons(author, comixList);
})();
