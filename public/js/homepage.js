const postContainer = document.querySelector("#post-container");

const clickHandler = (event) => {
  console.log("test")
  console.log(event)
  
  if (event.target.getAttribute("post-comment-wrapper")) {
    console.log("success!")
  }
}

postContainer.addEventListener("click", clickHandler);