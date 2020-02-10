const body = document.body;
const input = document.querySelector("input[type=text]");
const overlay = document.querySelector(".overlay");

function showFloater() {
  body.classList.add("show-floater");
}
function closeFloater() {
  if (body.classList.contains("show-floater")) {
    body.classList.remove("show-floater");
  }
}
input.addEventListener("focusin", showFloater);
//input.addEventListener("focusout", showFloater);
overlay.addEventListener("click", closeFloater);

const bookmarkList = document.querySelector(".bookmarks-list");
const bookmarkForm = document.querySelector(".bookmark-form");
const bookmarkInput = bookmarkForm.querySelector("input[type=text]");
const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
const apiUrl = "https://opengraph.io/api/1.0/site";
const appId = "58858c7bcf07b61e64257391";

const url = encodeURIComponent(bookmarkInput.value);

fillBooksList(bookmarks);

function createBookmark(e) {
  e.preventDefault();

  if (!bookmarkInput.value) {
    alert("please fill in the input text field");
    return;
  }
  //add a new bookmark to the bookmarks
  fetch(`${apiUrl}/${url}?app_id=${appId}`)
    .then(response => response.json())
    .then(data => {
      const bookmark = {
        title: data.hybridGraph.title,
        image: data.hybridGraph.image,
        link: data.hybridGraph.url
      };
      bookmarks.push(bookmark);
      fillBooksList(bookmarks);
      storeBookmarks(bookmarks);
      bookmarkForm.reset();
    })
    .catch(error => alert("There was a problem finding the page you requsted"));
  // const title = bookmarkInput.value;
  // const bookmark = document.createElement("a");
  // bookmark.className = "bookmark";
  // bookmark.innerText = title;
  // bookmark.href = "#";
  // bookmark.target = "_blank";
  // bookmarkList.appendChild(bookmark);
  // bookmarkForm.reset();
}
function fillBooksList(bookmarks = []) {
  const bookmarksHtml = bookmarks
    .map((bookmark, i) => {
      return `
    <a href="${bookmark.link}" class="bookmark" data-id="${i}">
    <div class="img" style="background-image:url('${bookmark.image}')"></div>
    <div class="title"> ${bookmark.title}</div>
    <span><i class="close far fa-times-circle"></i></span>
   
    </a>
   `;
      //join() method turns the array into string since map method
      //returns array
    })
    .join("");

  bookmarkList.innerHTML = bookmarksHtml;
  //}
  //storing the bookmarks into local storage
}

function removeBookmark(e) {
  if (!e.target.matches(".close")) return;
  //find the index
  const index = e.target.parentNode.dataset.id;
  //remove from bookmarks using splice
  bookmarks.splice(index, 1);
  fillBooksList(bookmarks);
  storeBookmarks(bookmarks);

  //fill the list
  //store back to local storage
}
function storeBookmarks(bookmarks = []) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
bookmarkForm.addEventListener("submit", createBookmark);
bookmarkList.addEventListener("click", removeBookmark);
