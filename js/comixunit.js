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
    text = await readFromFileURL("https://ivan-krul.github.io/ComixHolder/"+ pathStartsFromIndex);
    return getDividedString(text);
  } catch (error) {
    console.error("Error:", error);
  }
}

// We have this format of file names -> [author] - [name] [page number].[format]
async function getAuthorsFromFileNameList(fileContent = [""]) {
  var authorList = [];
  var filename = "";

  for (let index = 0; index < fileContent.length - 1; index++) {
    filename = fileContent[index];
    var author = filename.split(" - ")[0];

    if(authorList.findIndex(x => x == author) === -1)
      authorList.push(author);
  }

  return authorList;
}

function generateGoToAuthorButtons(authorList = [])
{
  var mainFrame = document.getElementById("authorlist");
  for(var i = 0; i < authorList.length; i++)
  {
    var tagLi = document.createElement("li");
    var tagA = document.createElement("a");
    tagA.href = "./comix/" + authorList[i] + ".html";
    tagA.innerText = authorList[i];
    tagLi.appendChild(tagA);
    mainFrame.appendChild(tagLi);
  }
}

(async () => {
  const fileContent = await getFileNameList("comix/content.txt");
  const authors = await getAuthorsFromFileNameList(fileContent);
  console.log(authors);
  generateGoToAuthorButtons(authors);
  // Perform additional operations with the `authors` variable here
  // ...
})();
