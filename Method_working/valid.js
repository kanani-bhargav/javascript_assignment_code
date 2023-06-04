var userlog = [];

// field validation
const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const fnameError = document.getElementById("fname-error");
const lnameError = document.getElementById("lname-error");
const emailError = document.getElementById("email-error");
const mobileError = document.getElementById("mobile-error");
const passwordError = document.getElementById("password-error");

function validateFname(fname) {
  const nameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_]{3,29}$/gm;
  return nameRegex.test(fname);
}

function validateLname(lname) {
  const nameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_]{3,29}$/gm;
  return nameRegex.test(lname);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateMobile(mobile) {
  const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/gm;
  return mobileRegex.test(mobile);
}

function validatePassword(password) {
  // Password pattern to match at least 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number, and one special character (excluding ", ;, &, |, ')
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9",;&|']).{8,15}$/;
  return passwordRegex.test(password);
}

fnameInput.addEventListener("input", function () {
  const fname = fnameInput.value;
  if (validateFname(fname)) {
    fnameError.textContent = ""; // Clear error message if valid
  } else {
    fnameError.textContent = "Invalid name format";
  }
});

lnameInput.addEventListener("input", function () {
  const lname = lnameInput.value;
  if (validateLname(lname)) {
    lnameError.textContent = ""; // Clear error message if valid
  } else {
    lnameError.textContent = "Invalid last name format";
  }
});

emailInput.addEventListener("input", function () {
  const email = emailInput.value;
  if (validateEmail(email)) {
    emailError.textContent = ""; // Clear error message if valid
  } else {
    emailError.textContent = "Invalid email format";
  }
});

mobileInput.addEventListener("input", function () {
  const mobile = mobileInput.value;
  if (validateMobile(mobile)) {
    mobileError.textContent = ""; // Clear error message if valid
  } else {
    mobileError.textContent = "Invalid phone format";
  }
});

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;
  if (validatePassword(password)) {
    passwordError.textContent = ""; // Clear error message if valid
  } else {
    passwordError.textContent =
      "Password must be 8-15 characters long, have at least one uppercase letter, one lowercase letter, one number, and one special character (excluding \", ;, &, |, ').";
  }
});

function validation() {
  try {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let dob = document.getElementById("dob").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("password").value;

    if (
      validateFname(fname) &&
      validateLname(lname) &&
      validateEmail(email) &&
      validateMobile(mobile) &&
      validatePassword(password)
    ) {
      let dateString = dob;
      let dateParts = dateString.split("-");
      let year = parseInt(dateParts[0]);
      let month = parseInt(dateParts[1]); 
      let day = parseInt(dateParts[2]); 

      let date = new Object();
      date.day = day;
      date.month = month;
      date.year = year;

      let obj = new Object();
      obj.name = fname.concat(" ", lname);
      obj.phone = mobile;
      obj.email = email;
      obj.address = address;
      obj.date_of_birth = date;
      obj.gender = gender;
      obj.password = password;

      if (
        localStorage.getItem("store") === null ||
        localStorage.getItem("store") === undefined
      ) {
        userlog.push(obj);
        localStorage.setItem("store", JSON.stringify(userlog));
      } else {
        let di = JSON.parse(localStorage.getItem("store"));
        di.push(obj);
        localStorage.setItem("store", JSON.stringify(di));
      }
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("dob").value = "";
      document.querySelector('input[name="gender"]:checked'); //= "false"; error
      document.getElementById("address").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("password").value = "";

      viewData();
      maleFilterData();
      dobFilterData();
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }

  function viewData() {
    let tbl = "";
    let storedata = JSON.parse(localStorage.getItem("store"));
    storedata.map((val) => {
      tbl += `
  <tr>
        <td>${val.name}</td>
        <td>${val.date_of_birth.day}-${val.date_of_birth.month}-${val.date_of_birth.year}</td>
        <td>${val.phone}</td>
        <td>${val.email}</td>
        <td>${val.address}</td>
        <td>${val.gender}</td>
      </tr>
  `;
    });
    document.getElementById("record").innerHTML = tbl;
  }
  function maleFilterData() {
    let tbl = "";
    let storedata = JSON.parse(localStorage.getItem("store"));
    let maledata = storedata.filter((val, index) => {
      return val.gender == "male";
    });
    maledata.map((val) => {
      tbl += `
  <tr>
        <td>${val.name}</td>
        <td>${val.date_of_birth.day}-${val.date_of_birth.month}-${val.date_of_birth.year}</td>
        <td>${val.phone}</td>
        <td>${val.email}</td>
        <td>${val.address}</td>
        <td>${val.gender}</td>
      </tr>
  `;
    });
    document.getElementById("malefilter").innerHTML = tbl;
  }
  function dobFilterData() {
    let tbl = "";
    let storedata = JSON.parse(localStorage.getItem("store"));
    let dobdata = storedata.filter((val, index) => {
      return val.date_of_birth.year <= 2000;
    });
    dobdata.map((val) => {
      tbl += `
  <tr>
        <td>${val.name}</td>
        <td>${val.date_of_birth.day}-${val.date_of_birth.month}-${val.date_of_birth.year}</td>
        <td>${val.phone}</td>
        <td>${val.email}</td>
        <td>${val.address}</td>
        <td>${val.gender}</td>
      </tr>
  `;
    });
    document.getElementById("dobfilter").innerHTML = tbl;
  }
}