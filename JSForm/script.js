
let data = [];
let editingId = null;

const form = document.getElementById("form");
const nameInput = document.getElementById("UserName");
const fatherNameInput = document.getElementById("FatherName");
const emailInput = document.getElementById("Email");
const dobInput = document.getElementById("DOB");
const mobileInput = document.getElementById("Mobile");
const address1Input = document.getElementById("Address1");
const address2Input = document.getElementById("Address2");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const pincodeInput = document.getElementById("code");
const permAddress1Input = document.getElementById("permanentAddress1");
const permAddress2Input = document.getElementById("permanentAddress2");
const cityInput1 = document.getElementById("city1");
const stateInput1 = document.getElementById("state1");
const pincodeInput1 = document.getElementById("code1");
const checkbox = document.getElementById("check");

const photoInput = document.getElementById("photo");
const tableData = document.getElementById("dataTable");

// Regex patterns
const regexName = /^[A-Za-z\s]+$/;
const regexEmail = /^[\w.-]+@[\w]+\.\w{2,}$/;
const regexPhone = /^[1-9]{1}[0-9]{9}$/;
const regexDOB = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
const regexCode = /^[0-9]{6}$/;
const regexCityState = /^[A-Za-z\s]+$/;
const regexAddress = /^[A-Za-z0-9\s,.-]+$/;

// Validation flags
let checkname = true, checkfathername = true, checkemail = true, checkdob = true,
    checkcode = true, checkcode1 = true, checkstate = true, checkstate1 = true,
    checkcity = true, checkcity1 = true, checkaddress1 = true, checkaddress2 = true,
    checkperaddress1 = true, checkperaddress2 = true;

// Reusable validation handler
function validateField(input, regex, errorId, flagName, errorMsg) {
    if (!regex.test(input.value.trim())) {
        document.getElementById(errorId).textContent = errorMsg;
        input.style.borderColor = "red";
        window[flagName] = false;
    } else {
        document.getElementById(errorId).textContent = "";
        input.style.borderColor = "gray";
        window[flagName] = true;
    }
}

// Attach event listeners
nameInput.addEventListener("focusout", () =>
    validateField(nameInput, regexName, "name-error", "checkname", "Please enter a valid name")
);

fatherNameInput.addEventListener("focusout", () =>
    validateField(fatherNameInput, regexName, "fathername-error", "checkfathername", "Please enter a valid name")
);

emailInput.addEventListener("focusout", () =>
    validateField(emailInput, regexEmail, "mail-error", "checkemail", "Please enter a valid email")
);

dobInput.addEventListener("focusout", () => {
    const inputDate = new Date(dobInput.value);
    const today = new Date();

    if (!dobInput.value || inputDate > today) {
        document.getElementById("dob-error").textContent = "Please enter a valid date of birth.";
        dobInput.style.borderColor = "red";
        checkdob = false;
    } else {
        document.getElementById("dob-error").textContent = "";
        dobInput.style.borderColor = "gray";
        checkdob = true;
    }
});

pincodeInput.addEventListener("focusout", () =>
    validateField(pincodeInput, regexCode, "code-error", "checkcode", "Please enter a valid code")
);

pincodeInput1.addEventListener("focusout", () =>
    validateField(pincodeInput1, regexCode, "code-error1", "checkcode1", "Please enter a valid code")
);

stateInput.addEventListener("focusout", () =>
    validateField(stateInput, regexCityState, "state-error", "checkstate", "Please enter a valid state")
);

stateInput1.addEventListener("focusout", () =>
    validateField(stateInput1, regexCityState, "state-error1", "checkstate1", "Please enter a valid state")
);

cityInput.addEventListener("focusout", () =>
    validateField(cityInput, regexCityState, "city-error", "checkcity", "Please enter a valid city")
);

cityInput1.addEventListener("focusout", () =>
    validateField(cityInput1, regexCityState, "city-error1", "checkcity1", "Please enter a valid city")
);

address1Input.addEventListener("focusout", () =>
    validateField(address1Input, regexAddress, "address-error", "checkaddress1", "Please enter a valid address")
);

address2Input.addEventListener("focusout", () =>
    validateField(address2Input, regexAddress, "address-error1", "checkaddress2", "Please enter a valid address")
);

permAddress1Input.addEventListener("focusout", () =>
    validateField(permAddress1Input, regexAddress, "peraddress-error1", "checkperaddress1", "Please enter a valid address")
);

permAddress2Input.addEventListener("focusout", () =>
    validateField(permAddress2Input, regexAddress, "peraddress-error2", "checkperaddress2", "Please enter a valid address")
);
let checkmobile = true;

mobileInput.addEventListener("focusout", function () {
    if (!regexPhone.test(mobileInput.value.trim())) {
        document.getElementById("mobile-error").textContent = "Please enter a valid 10-digit mobile number";
        mobileInput.style.borderColor = "red";
        checkmobile = false;
    } else {
        document.getElementById("mobile-error").textContent = "";
        mobileInput.style.borderColor = "gray";
        checkmobile = true;
    }
});

// Checkbox autofill for address
function transition() {
    if (checkbox.checked) {
        permAddress1Input.value = address1Input.value;
        permAddress2Input.value = address2Input.value;
        cityInput1.value = cityInput.value;
        stateInput1.value = stateInput.value;
        pincodeInput1.value = pincodeInput.value;

        permAddress1Input.readOnly = true;
        permAddress2Input.readOnly = true;
        cityInput1.readOnly = true;
        stateInput1.readOnly = true;
        pincodeInput1.readOnly = true;
    } else {
        permAddress1Input.readOnly = false;
        permAddress2Input.readOnly = false;
        cityInput1.readOnly = false;
        stateInput1.readOnly = false;
        pincodeInput1.readOnly = false;
    }
}
checkbox.addEventListener("change", transition);

// Form submission handler
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    // Trigger validations
    nameInput.dispatchEvent(new Event("focusout"));
    fatherNameInput.dispatchEvent(new Event("focusout"));
    emailInput.dispatchEvent(new Event("focusout"));
    dobInput.dispatchEvent(new Event("focusout"));
    pincodeInput.dispatchEvent(new Event("focusout"));
    pincodeInput1.dispatchEvent(new Event("focusout"));
    stateInput.dispatchEvent(new Event("focusout"));
    stateInput1.dispatchEvent(new Event("focusout"));
    cityInput.dispatchEvent(new Event("focusout"));
    cityInput1.dispatchEvent(new Event("focusout"));
    address1Input.dispatchEvent(new Event("focusout"));
    address2Input.dispatchEvent(new Event("focusout"));
    permAddress1Input.dispatchEvent(new Event("focusout"));
    permAddress2Input.dispatchEvent(new Event("focusout"));

    // Final validation check
    if (
        checkname && checkfathername && checkemail && checkdob &&
        checkcode && checkcode1 && checkstate && checkstate1 &&
        checkcity && checkcity1 && checkaddress1 && checkaddress2 &&
        checkperaddress1 && checkperaddress2
    ) {
        alert("Form submitted successfully!");
        // You can now store the data or clear the form
    } else {
        alert("Please fill in all required fields correctly.");
    }
});
