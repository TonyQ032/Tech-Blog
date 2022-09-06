// Fetch request for logging in
const logIn = async (userEmail, userPassword) => {
  await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword
    })
  })
}

// Fetch request for logging out
const logOut = async () => {
  fetch("/api/users/logout"), {
    method: "POST"
  }

  location.reload()
}

const signOutButton = document.querySelector("#sign-out");
const signInButton = document.querySelector("#login-btn");

signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  logIn(email, password);
})