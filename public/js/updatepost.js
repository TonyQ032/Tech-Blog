// Function used to update posts
const updatePost = async (postId, title, description) => {
  await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      description: description
    })
  }).then(setTimeout(() => {
    location.href="/dashboard"
  }, 300))
  .catch(err)
}

// Update post button
const updateBtn = document.querySelector("#update-post-btn");

// When clicked, executes updatePost function with necesarry info
updateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  // Grabs required info from page
  const postId = document.querySelector("#update-post-wrapper").getAttribute("post-id");
  const title = document.querySelector("#update-post-name").value;
  const description = document.querySelector("#update-post-content").value;

  // Checks if the fields have been left blank
  if (title && description) {
    console.log(postId, title, description);

    swal("Post updated!", "You have successfully updated your post!", "success", {
      buttons: false,
    });
    setTimeout(() => {
      updatePost(postId, title, description)
    }, 2700)
  } else {
    swal({
      title: "Error!",
      text: "Looks like an input field is missing!",
      icon: "error",
      button: "Try Again"
    });
  }
})