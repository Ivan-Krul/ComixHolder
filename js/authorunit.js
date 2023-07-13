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
  let authorList = [];
  let filename = "";

  for (let index = 0; index < fileContent.length - 1; index++) {
    filename = fileContent[index];
    let author = filename.split("()")[0];
    console.log(author);

    if(authorList.findIndex(x => x === author) === -1)
      authorList.push(author);
  }

  return authorList;
}

function generateGoToAuthorButtons(authorList = [])
{
  let tagUl = document.getElementById("authorlist");
  for(let i = 0; i < authorList.length; i++)
  {
    let tagLi = document.createElement("li");
    let tagA = document.createElement("a");
    tagA.href = "./comix/author_content.html?author="+authorList[i];
    tagA.innerText = authorList[i];
    //tagA.addEventListener('click', function() {
    //  // Your logic here
    //  localStorage.setItem("author",tagA.innerText);
    //});
    tagLi.appendChild(tagA);
    tagUl.appendChild(tagLi);
  }
}

if(localStorage.length !== 0)
{
  localStorage.clear();
}

(async () => {
  const fileContent = await getFileNameList("comix/content.txt");
  console.log(fileContent);
  const authors = await getAuthorsFromFileNameList(fileContent);
  console.log(authors);
  generateGoToAuthorButtons(authors);
  // Perform additional operations with the `authors` variable here
  // ...
})();
