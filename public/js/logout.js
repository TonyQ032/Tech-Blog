// Fetch request for logging out
const logOut = async () => {
  await fetch("/api/users/logout", {
    method: "POST",
  })

  .then(() => location.reload()
  ).catch(err)
}

const signOutButton = document.querySelector("#sign-out");

if (signOutButton) {
  signOutButton.addEventListener("click", logOut);
}