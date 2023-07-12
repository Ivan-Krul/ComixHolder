function getDividedString(str) {
  return str.split('\n');
}

function readFromFileURL(fileURL) {
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

async function getFileNameList(pathStartsFromIndex) {
  try {
    text = await readFromFileURL("https://ivan-krul.github.io/ComixHolder/"+ pathStartsFromIndex);
    return getDividedString(text);
  } catch (error) {
    console.error("Error:", error);
  }
}

function getAuthorsFromFileNameList(fileContent) {
  const filenames = fileContent.split('\n');
  const authorList = [];

  filenames.forEach((filename) => {
    const regex = /^\((.*?)\)\s*-\s*(.*?)\s*\(\d+\)\.(.*?)$/;
    const match = filename.match(regex);

    if (match && match.length === 4) {
      const author = match[1].trim();
      authorList.push(author);
    }
  });

  return authorList;
}

console.log(getAuthorsFromFileNameList(getFileNameList("comix/content.txt")));
