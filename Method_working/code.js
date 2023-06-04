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

function validateField(value, regex) {
  return regex.test(value);
}

function validateFname(fname) {
  const nameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_]{3,29}$/gm;
  return validateField(fname, nameRegex);
}

function validateLname(lname) {
  const nameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_]{3,29}$/gm;
  return validateField(lname, nameRegex);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validateField(email, emailRegex);
}

function validateMobile(mobile) {
  const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/gm;
  return validateField(mobile, mobileRegex);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9",;&|']).{8,15}$/;
  return validateField(password, passwordRegex);
}

function setInputError(input, errorElement, errorMessage) {
  if (errorMessage) {
    input.classList.add("error");
    errorElement.textContent = errorMessage;
  } else {
    input.classList.remove("error");
    errorElement.textContent = "";
  }
}

function handleInputValidation(input, validator, errorElement, errorMessage) {
  input.addEventListener("input", function () {
    const value = input.value;
    const isValid = validator(value);
    setInputError(input, errorElement, isValid ? "" : errorMessage);
  });
}

handleInputValidation(fnameInput, validateFname, fnameError, "Invalid name format");
handleInputValidation(lnameInput, validateLname, lnameError, "Invalid last name format");
handleInputValidation(emailInput, validateEmail, emailError, "Invalid email format");
handleInputValidation(mobileInput, validateMobile, mobileError, "Invalid phone format");
handleInputValidation(passwordInput, validatePassword, passwordError, "Password must be 8-15 characters long, have at least one uppercase letter, one lowercase letter, one number, and one special character (excluding \", ;, &, |, ').");

function validation() {
  try {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;

    if (
      validateFname(fname) &&
      validateLname(lname) &&
      validateEmail(email) &&
      validateMobile(mobile) &&
      validatePassword(password)
    ) {
      const dateString = dob;
      const dateParts = dateString.split("-");
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const day = parseInt(dateParts[2]);

      const date = {
        day,
        month,
        year
      };

      const obj = {
        name: `${fname} ${lname}`,
        phone: mobile,
        email,
        address,
        date_of_birth: date,
        gender,
        password
      };

      const storedData = JSON.parse(localStorage.getItem("store")) || [];
      storedData.push(obj);
      localStorage.setItem("store", JSON.stringify(storedData));

      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("dob").value = "";
      document.querySelector('input[name="gender"]:checked').checked = false;
      document.getElementById("address").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("password").value = "";

      viewData();
      filterData();
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

function viewData() {
  let tbl = "";
  const storedata = JSON.parse(localStorage.getItem("store"));
  storedata.forEach((val) => {
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

function filterData() {
  const tbl = document.getElementById("tbl-filter");
  const filterOptions = [
    { key: "male", filterText: "Male" },
    { key: "dob", filterText: "Date of Birth <= 2000" }
  ];

  filterOptions.forEach((filter) => {
    let filteredData = JSON.parse(localStorage.getItem("store"));
    if (filter.key === "male") {
      filteredData = filteredData.filter((val) => val.gender === "male");
    } else if (filter.key === "dob") {
      filteredData = filteredData.filter((val) => val.date_of_birth.year <= 2000);
    }

    let tblContent = "";
    filteredData.forEach((val) => {
      tblContent += `
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

    const filterElementId = `${filter.key}filter`;
    const filterElement = document.getElementById(filterElementId);
    if (filterElement) {
      filterElement.innerHTML = tblContent;
    } else {
      tbl.innerHTML += `
        <div id="${filterElementId}">
          <h2>${filter.filterText}</h2>
          <table>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Gender</th>
            </tr>
            ${tblContent}
          </table>
        </div>
      `;
    }
  });
}
