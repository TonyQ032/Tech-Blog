// This section will make the "Create Post" form appear when the button is clicked
const createPostWrapper = document.getElementById("create-post-wrapper");
const revealPostFormBtn = document.getElementById("reveal-post-btn");

createPostWrapper.style.display = "none";

revealPostFormBtn.addEventListener("click", () => {
  console.log(createPostWrapper);
  createPostWrapper.style.display = "flex";
  revealPostFormBtn.style.display = "none";
})

// Function used to create posts
const createPost = async (postTitle, postContent, userId) => {
  await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: postTitle,
      description: postContent,
      user_id: userId
    })
  }).then(setTimeout(() => {
    location.href = "/dashboard"
  }, 300))
    .catch(err)
}

// Creates a new post when fields are filled and button is pressed
const createPostBtn = document.querySelector("#create-post-btn");

createPostBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#create-post-name").value;
  const postContent = document.querySelector("#create-post-content").value;

  //Retrieves logged in users ID
  const userId = document.querySelector(".dashboard-wrapper").getAttribute("data-value")

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
      createPost(postTitle, postContent, userId);
    }, 2700)
  }
})

// Function used to delete a post
const deletePost = async (postId) => {
  await fetch(`/api/posts/${postId}`, {
    method: "DELETE"
  }).then(setTimeout(() => {
    location.href = "/dashboard"
  }, 300))
    .catch(err)
}

// Grabs arrow of all delete buttons
const deleteBtn = document.getElementsByClassName("dashboard-delete-link");

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", () => {
    // Grabs corresponding post ID
    const postId = deleteBtn[i].getAttribute("post-id");

    // Alerts user with a warning, will only delete post if user confirms they want to
    swal(`WARNING:
  Are you sure you want to delete this event? This action can not be undone.`, {
      buttons: {
        cancel: "Cancel",
        delete: {
          text: "Delete",
          value: "delete"
        }
      },
    })
      .then((value) => {
        switch (value) {
          case "delete":
            swal("Post deleted!", "You have successfully deleted the post!", "success")

            setTimeout(() => {
              deletePost(postId)
            }, 2700)

              .catch(err => err ? console.log(err) : console.log("Success!"));
            break;
        }
      });
  })
}