const fields = [
    { input: document.getElementById("fname"), error: document.getElementById("fname-error"), validator: /^[a-zA-Z0-9][a-zA-Z0-9_]{3,29}$/gm, errorMessage: "Invalid name format" },
    { input: document.getElementById("lname"), error: document.getElementById("lname-error"), validator: /^[a-zA-Z0-9][a-zA-Z0-9_]{3,29}$/gm, errorMessage: "Invalid last name format" },
    { input: document.getElementById("email"), error: document.getElementById("email-error"), validator: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: "Invalid email format" },
    { input: document.getElementById("mobile"), error: document.getElementById("mobile-error"), validator: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/gm, errorMessage: "Invalid phone format" },
    { input: document.getElementById("password"), error: document.getElementById("password-error"), validator: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9",;&|']).{8,15}$/, errorMessage: "Password must be 8-15 characters long, have at least one uppercase letter, one lowercase letter, one number, and one special character (excluding \", ;, &, |, ')." }
  ];
  
  function validateField(field) {
    const value = field.input.value;
    const isValid = field.validator.test(value);
    field.error.textContent = isValid ? "" : field.errorMessage;
    field.input.classList.toggle("error", !isValid);
    return isValid;
  }
  
  function validateForm() {
    const isValid = fields.every(validateField);
  
    if (isValid) {
      const formData = fields.reduce((data, field) => {
        data[field.input.id] = field.input.value;
        return data;
      }, {});
  
      const dateParts = formData.dob.split("-");
      formData.date_of_birth = {
        day: parseInt(dateParts[2]),
        month: parseInt(dateParts[1]),
        year: parseInt(dateParts[0])
      };
  
      const storedData = JSON.parse(localStorage.getItem("store")) || [];
      storedData.push(formData);
      localStorage.setItem("store", JSON.stringify(storedData));
  
      fields.forEach(field => field.input.value = "");
      viewData();
      filterData();
    }
  }
  
  function viewData() {
    const storedata = JSON.parse(localStorage.getItem("store"));
    const tbl = storedata.map(val => `
      <tr>
        <td>${val.fname} ${val.lname}</td>
        <td>${val.date_of_birth.day}-${val.date_of_birth.month}-${val.date_of_birth.year}</td>
        <td>${val.mobile}</td>
        <td>${val.email}</td>
        <td>${val.address}</td>
        <td>${val.gender}</td>
      </tr>
    `).join("");
  
    document.getElementById("record").innerHTML = tbl;
  }
  
  function filterData() {
    const storedata = JSON.parse(localStorage.getItem("store"));
  
    const filterOptions = [
      { key: "male", filterText: "Male", filterFn: val => val.gender === "male" },
      { key: "dob", filterText: "Date of Birth <= 2000", filterFn: val => val.date_of_birth.year <= 2000 }
    ];
  
    filterOptions.forEach(filter => {
      const filteredData = storedata.filter(filter.filterFn);
      const tbl = filteredData.map(val => `
        <tr>
          <td>${val.fname} ${val.lname}</td>
          <td>${val.date_of_birth.day}-${val.date_of_birth.month}-${val.date_of_birth.year}</td>
          <td>${val.mobile}</td>
          <td>${val.email}</td>
          <td>${val.address}</td>
          <td>${val.gender}</td>
        </tr>
      `).join("");
  
      const filterElementId = `${filter.key}filter`;
      const filterElement = document.getElementById(filterElementId);
      if (filterElement) {
        filterElement.innerHTML = tbl;
      } else {
        document.getElementById("tbl-filter").innerHTML += `
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
              ${tbl}
            </table>
          </div>
        `;
      }
    });
  }
  
  fields.forEach(field => {
    field.input.addEventListener("input", () => validateField(field));
  });
  
  document.getElementById("submit-btn").addEventListener("click", validateForm);  