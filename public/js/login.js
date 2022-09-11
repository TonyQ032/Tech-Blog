// Fetch request for logging in
const logIn = async (userEmail, userPassword) => {
  await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword
    })
  }).then(data => {
    // If user successfully logs in, they are redirected to homepage
    if (data.status === 200) {
      swal("Login successful!", "You have successfully logged in!", "success", {
        buttons: false,
      });
      setTimeout(() => {
        location.href = "/"
      }, 3000)
    } else {
      swal({
        title: "Error!",
        text: "Incorrect email or password.",
        icon: "error",
        button: "Try Again"
      });
    }
  })
  .catch(err)
}

const signInButton = document.querySelector("#login-btn");

signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  logIn(email, password);
})