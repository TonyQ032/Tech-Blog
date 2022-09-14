// Function that creates comments
const comment = async (description, userId, postId) => {
  await fetch("/api/comments/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: description,
      user_id: userId,
      post_id: postId
    })
  }).then(setTimeout(() => {
    location.reload();
  }, 100))
    .catch(err)
}

//
const textArea = document.querySelector("textarea");
const submitButton = document.querySelector("#create-comment-btn");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Retrieves all necessary info for POST request
  const description = textArea.value;
  const userId = document.querySelector(".post-comment-wrapper").getAttribute("user_id");
  const postId = document.querySelector(".post-title").getAttribute("value");

  console.log(description, userId, postId);

  // Verifies that user has not left the textarea blank
  if (!description) {
    // Throws error to user
    swal({
      title: "Error!",
      text: "Comment cannot be left blank!",
      icon: "error",
      button: "Try Again"
    });
  } else {
    // Creates comment
    comment(description, userId, postId)
  }

})