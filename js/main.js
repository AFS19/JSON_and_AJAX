const btn = document.getElementById("btn");
const animalInfo = document.getElementById("animal-info");
let pageCounter = 1;
let request = new XMLHttpRequest();
btn.addEventListener("click", function () {
  try {
    request.open(
      "GET",
      `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`
    );
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        // console.log(data);
        renderHTML(data);
        pageCounter++;
        if (pageCounter > 3) {
          btn.setAttribute("disabled", "");
        }
      } else {
        throw new Error("Invalid Connected");
      }
    };

    request.send();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

function renderHTML(data) {
  let htmlString = "";
  for (let index = 0; index < data.length; index++) {
    htmlString += `
      <p>
        <span style="font-weight: bold">${data[index].name}</span>
        is a <span>${data[index].species}</span>
      
    `;
    for (let ii = 0; ii < data[index].foods.likes.length; ii++) {
      if (ii == 0) {
        htmlString += `it's likes <span style="color: #0f0">${data[index].foods.likes[ii]}</span>`;
      } else {
        htmlString += ` and <span style="color: #0f0">${data[index].foods.likes[ii]}</span> `;
      }
    }

    htmlString += ` and doesn't likes `;

    for (let ii = 0; ii < data[index].foods.dislikes.length; ii++) {
      if (ii == 0) {
        htmlString += `<span style="color: #f00">${data[index].foods.likes[ii]}</span>`;
      } else {
        htmlString += ` and <span style="color: #f00">${data[index].foods.likes[ii]}</span>`;
      }
    }
  }

  //map
  // let htmlString = data
  //   .map((animal) => {
  //     return `<p>
  //   <span style="font-weight: bold">${animal.name}</span>
  //     is a <span>${animal.species}</span>
  //     it's likes <span style="color: #0f0">${animal.foods.likes.join(
  //       " and "
  //     )}</span>
  //     and doesn't like <span style="color: #f00">${animal.foods.dislikes.join(
  //       " and "
  //     )}</span>
  //   </p>`;
  //   })
  //   .join("");

  animalInfo.insertAdjacentHTML("beforeend", htmlString);
}
