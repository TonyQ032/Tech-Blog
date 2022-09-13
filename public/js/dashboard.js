// This section will make the "Create Post" form appear when the button is clicked
const createPostWrapper = document.getElementById("create-post-wrapper");
const revealPostFormBtn = document.getElementById("reveal-post-btn");

createPostWrapper.style.display = "none";

revealPostFormBtn.addEventListener("click", () => {
  console.log(createPostWrapper);
  createPostWrapper.style.display = "flex";
  revealPostFormBtn.style.display = "none";
})

const createPost = async (postTitle, text, userId) => {
  await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: postTitle,
      description: text,
      user_id: userId
    })
  }).then(setTimeout(() => {
    location.href="/"
  }, 300))
  .catch(err)
}

// Creates a new post when fields are filled and button is pressed
const createPostBtn = document.querySelector("#create-post-btn");

createPostBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#create-post-name").value;
  const postContent = document.querySelector("#create-post-content").value;

  console.log(postTitle, postContent)

  // Checks if fields are empty or not
  if (!postTitle || !postContent) {
    swal({
      title: "Error!",
      text: "Looks like an input field is missing!",
      icon: "error",
      button: "Try Again"
    });
    return;
  } else {
    swal("Post created!", "You have successfully created a post!", "success", {
      buttons: false,
    });
    setTimeout(() => {
      createPost(postTitle, postContent, 1);
    }, 2700)
  }
})