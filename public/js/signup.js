// Fetch request for sign up
const signup = async (userName, userEmail, userPassword) => {
  await fetch("/api/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: userName,
      email: userEmail,
      password: userPassword
    })
  }).then(setTimeout(() => {
    location.href="/login"
  }, 300))
  .catch(err)
}

const signupButton = document.querySelector("#signup-button");

signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  const username = document.querySelector("#signup-name").value;
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  const signupForm = document.querySelector("#signup-form");

  if (!username || !email || !password) {
    const errorMessage = document.createElement("h4");
    errorMessage.textContent = "Error: One of more fields have been left blank."

    signupForm.appendChild(errorMessage);
  } else {
    signup(username, email, password);
  }
})