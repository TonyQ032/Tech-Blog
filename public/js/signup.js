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

// Used to verify proper emails when signing up
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const verifyEmail = (email) => {
  if (validateEmail(email)) {
    return true;
  } else {
    swal({
      title: "Error!",
      text: "Looks like the email is missing or invalid!",
      icon: "error",
      button: "Try Again"
    });
    return false;
  }
};

// Error message alert
const errorMessage = () => {
  swal({
    title: "Error!",
    text: "Looks like an input field is missing!",
    icon: "error",
    button: "Try Again"
  });
}

const signupButton = document.querySelector("#signup-button");

// Signs up user with info from input fields
signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  const username = document.querySelector("#signup-name").value;
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  // Verifies if email is valid
   if (!verifyEmail(email)) {
    return;
   };

   if (password.length < 8) {
    swal({
      title: "Error!",
      text: "Password must be at least 8 characters long!",
      icon: "error",
      button: "Try Again"
    });
    return;
   }

  // Gives error if input fields are left blank
  if (!username || !email || !password) {
    errorMessage();
    // Otherwise runs signup function
  } else {
    swal("User created!", "You have successfully created a user!", "success", {
      buttons: false,
    });
    setTimeout(() => {
      signup(username, email, password);
    }, 2700)
  }
})