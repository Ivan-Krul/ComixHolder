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
async function getComixListFromAuthor(fileContent = [""], author = "") {
  let comixList = [];

  fileContent = fileContent.filter(function(finename) { return finename.split("()")[0] === author});
  console.log(fileContent);

  return comixList;
}

function generateGoToAuthorButtons(authorList = []) {
  let mainFrame = document.getElementById("authorlist");
  for (let i = 0; i < authorList.length; i++) {
    let tagLi = document.createElement("li");
    let tagA = document.createElement("a");
    tagA.href = "./comix/author_content.html?author=" + authorList[i];
    tagA.innerText = authorList[i];
    //tagA.addEventListener('click', function() {
    //  // Your logic here
    //  localStorage.setItem("author",tagA.innerText);
    //});
    tagLi.appendChild(tagA);
    mainFrame.appendChild(tagLi);
  }
}

if (localStorage.length !== 0) {
  localStorage.clear();
}

(async () => {
  const fileContent = await getFileNameList("comix/content.txt");
  const urlParams = new URLSearchParams(window.location.search);
  const author = urlParams.get('author');
  console.log(author);
  getComixListFromAuthor(fileContent, author);
})();
