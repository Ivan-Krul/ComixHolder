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
async function getAuthorsFromFileNameList(fileContent = [""]) {
   authorList = [];
  let filename = "";

  for (let index = 0; index < fileContent.length - 1; index++) {
    filename = fileContent[index];
    let author = filename.split(" - ")[0];

    if (authorList.findIndex(x => x == author) === -1)
      authorList.push(author);
  }

  return authorList;
}

async function getAuthorsComixName(author = "", fileContent = [""]) {
  while(fileContent.findIndex(x => x === author) !== -1)
  {
    
  }

  return authorList;
}

function generateProfile(author = "") {
  let profile = document.getElementById("profile");
  let tagA = document.createElement("a");

  if (author.split(' ')[0].indexOf("u-") == 0 && author.split(' ')[0].indexOf("u-") != null) {
    let res = author.split(' ')[0].split('u-')[1];
    tagA.href = "https://reddit.com/user/" + res;
    tagA.innerText = "u/" + res;
  }
  else if (author[0] == '@') {
    tagA.href = "https://twitter.com/" + author.split(' ')[0].split("@")[1];
    tagA.innerText = author.split(' ')[0];
  }
  else if (author.split(' ')[0].indexOf("t-") == 0 && author.split(' ')[0].indexOf("t-") != null) {
    tagA.href = "https://tumblr.com/" + author.split(' ')[0].split("t-")[1];
    tagA.innerText = author.split(' ')[0];
  }
  else {
    tagA.innerText = author.split(' ')[0];
  }

  let tagH2 = document.createElement("h2");
  tagH2.appendChild(tagA);
  profile.appendChild(tagH2);

  let photo = document.createElement("img");
  photo.src = "./profile/" + author;
  photo.alt = "author photo";
  profile.appendChild(photo);

}

(async () => {
  //const fileContent = await getFileNameList("comix/content.txt");
  
  const urlParams = new URLSearchParams(window.location.search);
  const author = urlParams.get('author');
  //const  = localStorage.getItem("author");
  //const currentURL = window.location.pathname;
  //const fileName = currentURL.substring(currentURL.lastIndexOf('/') + 1);
  console.log(author);
  generateProfile(author);
  // Perform additional operations with the `authors` variable here
  // ...
})();