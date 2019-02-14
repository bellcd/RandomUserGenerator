// elements on the page where the users will go
const ul = document.getElementById("values-list");
const button = document.querySelector("#btn");
const container = document.querySelector(".container");

// url for the api request
const url = 'https://randomuser.me/api/?results=20';

// asks the randomuser API for users
async function getUsers() {
  let response, results, users;

    response = await fetch(url);
    results = await response.json();
    users = results.results;

    return users;
}

// renders users to the page
function addOnPage(users) {

  // deletes all the authorTiles and below everytime new data is pulled from API.
  // SUGGESTION there's definitely a more efficient way to do this!
  container.innerHTML = "";

  // creates authorTile div and interior contents for each user returned from the API call
  users.map(user => {
    let div = document.createElement('div'),
        ul = document.createElement('ul'),
        img = document.createElement('img'),

        // li's and p's for valuesList ul inside of each authorTile
        nameLi = document.createElement('li'),
        emailLi = document.createElement('li'),
        birthdayLi = document.createElement('li'),
        addressLi = document.createElement('li'),
        phoneLi = document.createElement('li'),
        usernameLi = document.createElement('li'),

        name = document.createElement('p'),
        email = document.createElement('p'),
        birthday = document.createElement('p'),
        address = document.createElement('p'),
        phone = document.createElement('p'),
        username = document.createElement('p');

      // adds classes to the authorTile div and valuesList ul
      div.classList.add("author-tile");
      ul.classList.add("values-list");

      // grabs image for the authorTile
      img.src = user.picture.large;

      // adds text inside the valuesList p
      name.innerHTML = `Name`;
      email.innerHTML = `Email`;
      birthday.innerHTML = `Birthday`;
      address.innerHTML = `Address`;
      phone.innerHTML = `Phone`;
      username.innerHTML = `Username`;

      // displays the authorTile & img
      container.appendChild(div);
      div.appendChild(img);

      // used so the appropriate data can go into the appropriate center section div, below
      const item = ["name", "email", "birthday", "address", "phone", "username"];

      // loop for creating highlight-box divs (cards) and their contents
      for (let i = 0; i < 7; i++) {
        let card, userTitle, userValue;

        // div for center section of the authorTile
        card = document.createElement('div');
        card.classList.add("highlight-box");
        card.classList.add(item[i]);

        // hides all of the cards by default
        card.classList.add("toggle-content");

        // Title p and Value p for center section of the card
        userTitle = document.createElement('p');
        userValue = document.createElement('p');

        // adds .user-title or .user-value class to each p in the center of the card.
        userTitle.classList.add("user-title");
        userValue.classList.add("user-value");

        // adds author data and class names to each respective card
        switch (item[i]) {
          case "name":
          userTitle.innerHTML = `Hi, my name is`;
          userValue.innerHTML = `${user.name.first} ${user.name.last}`;

          userTitle.classList.add("name");
          userValue.classList.add("name");
          break;

          case "email":
          userTitle.innerHTML = `My email is`;
          userValue.innerHTML = `${user.email}`;

          userTitle.classList.add("email");
          userValue.classList.add("email");
          break;

          case "birthday":
          userTitle.innerHTML = `My birthday is`;

          // SUGGESTION there's probably a better way to format the display of this date than using .slice() !!
          userValue.innerHTML = `${(user.dob.date).slice(0,10)}`;

          userTitle.classList.add("birthday");
          userValue.classList.add("birthday");
          break;

          case "address":
          userTitle.innerHTML = `My address is`;
          userValue.innerHTML = `${user.location.city}, ${user.location.state}`;

          userTitle.classList.add("address");
          userValue.classList.add("address");
          break;

          case "phone":
          userTitle.innerHTML = `My phone number is`;
          userValue.innerHTML = `${user.phone}`;

          userTitle.classList.add("phone");
          userValue.classList.add("phone");
          break;

          case "username":
          userTitle.innerHTML = `My username is`;
          userValue.innerHTML = `${user.login.username}`;

          card.classList.add('is-visible');

          userTitle.classList.add("username");
          userValue.classList.add("username");
          break;
        }

        // adds card div to the authorTile div
        div.appendChild(card);

        // adds userTitle p and userValue p to the end of card div
        card.appendChild(userTitle);
        card.appendChild(userValue);
      }

    // event handlers for changing the card div
    name.onmouseover = displayUserInfo;
    email.onmouseover = displayUserInfo;
    birthday.onmouseover = displayUserInfo;
    address.onmouseover = displayUserInfo;
    phone.onmouseover = displayUserInfo;
    username.onmouseover = displayUserInfo;

    // adds valuesList ul to authorTile div
    div.appendChild(ul);

    // adds li's and p's to valuesList ul
    ul.appendChild(nameLi);
    nameLi.appendChild(name);

    ul.appendChild(emailLi);
    emailLi.appendChild(email);

    ul.appendChild(birthdayLi);
    birthdayLi.appendChild(birthday);

    ul.appendChild(addressLi);
    addressLi.appendChild(address);

    ul.appendChild(phoneLi);
    phoneLi.appendChild(phone);

    ul.appendChild(usernameLi);
    usernameLi.appendChild(username);

  });
}

// changes what is shown on click
function displayUserInfo(event) {

  // grabs element that got clicked
  let target = event.currentTarget;

  // gets the verbage of the valuesList p that was hovered on, ie "name" "email" "birthday" etc...
  let targetName = event.currentTarget.innerHTML.toLowerCase();

  // gets the parent authorTile div for the user in question
  let divAuthorTile = target.closest('div');

  // grabs the appropriate highlightBox div (ie, that matches the verbage that is clicked on)
  let highlightBox = divAuthorTile.querySelector(`.${CSS.escape(targetName)}`);

  // adds or removes the .hide CSS class to the highlightBox div in question. highlightBox divs are hidden by default with the .toggle-content class!
  if (!highlightBox.classList.contains("is-visible")) {
    highlightBox.classList.toggle("is-visible");

    // makes and array of the other highlightBox divs in that authorTile
    let otherHighlightBoxes = divAuthorTile.querySelectorAll(".highlight-box");
    otherHighlightBoxes = Array.from(otherHighlightBoxes);

    // Checks if valuesList p that was hovered over is in the array we're going to hide in a moment. If so, removes it. ie, so at least 1 highlightBox is always visible.
    otherHighlightBoxes = otherHighlightBoxes.filter((element) => {
      return !(element.classList.contains(targetName));
    })

    // hides the otherHighlightBoxes
    otherHighlightBoxes.forEach((element) => {
      element.classList.remove("is-visible");
    })

  }
}

// populates page with users on page load
getUsers().then(function(usersArray) {
  addOnPage(usersArray);
});

// adds event listener to generate 20 new users on button press
button.addEventListener("click", () => {
  getUsers().then(function(usersArray) {
    addOnPage(usersArray);
  });
})
