const userLogin = document.getElementById("user");
const mainContent = document.getElementById("main-content");
//ad on-click event for user menu
// userLogin.onclick = function (event) {
// //prevent anchor link referance
// event.preventDefault()
// //delete all child in main block
// deleteChilds(mainContent);
// //change main content to registration - login form
// addLoginInfoToMain('login_reg_template.html', "reg-login", mainContent);

// //change style of main block
// let myStyle = `
// display: flex;
// justify-content: center;
// align-content: center;`;

// mainContent.style.cssText = myStyle;


// }
userLogin.addEventListener("click", authentifyUser)

function authentifyUser(event) {
    //prevent anchor link referance
    event.preventDefault()
    //delete all child in main block
    deleteChilds(mainContent);
    //change main content to registration - login form
    addLoginInfoToMain('login_reg_template.html', "reg-login", mainContent);

    //change style of main block
    let myStyle = `
    display: flex;
    justify-content: center;
    align-content: center;`;

    mainContent.style.cssText = myStyle;
}




/*************************************************************** */
/*******Supporting functions************************************ */

/**
 * Delete all child elements from the element
 * @param {DOM element} element 
 */
function deleteChilds(element) {
    //loop through all child elements
    while (element.firstChild) {
        //delete them one by one
        element.removeChild(element.firstChild);
    }
}

/**
 * asynchronous function for adding information from templates
 */
async function addLoginInfoToMain(templateName, templateId, parentElement) {
    //wait while templarte is added
    await addTemplate(templateName);
    //insert DOM objects from template on page
    await insertTemplateData(templateId, parentElement);

    //to be sure that elements exist in DOM add event listeners here
    if (templateId === "reg-login") {
        addFormsEvents();
    }
    deleteTemplate(templateId);

}

/**
 * asynchronous function for adding template to HTML page
 * @param {string} fileName 
 */
async function addTemplate(fileName) {
    //string with file content
    let templateData = "";
    //wait while read all data from file and save to templateData
    await fetch(fileName)
        .then(response => response.text())
        .then((data) => {
            templateData = data;
        })
    //add template to head DOM element
    document.head.append(
        //use DOMParser to convert templateData to DOM elements
        new DOMParser().parseFromString(templateData, 'text/html')
            .querySelector('template')
    )
}

/**
 * function that insert data from template to page
 * @param {string} templateId 
 * @param {DOM element} parentElement 
 */
async function insertTemplateData(templateId, parentElement) {
    //find template on DOM document
    const template = document.getElementById(templateId);
    //make deep copy of template elements
    const clone = template.content.cloneNode(true);
    //append elements from template to parent element
    parentElement.appendChild(clone);

}

/************************************* */
/**events for registration form */
function addFormsEvents() {
    const regForm = document.getElementById("registration");
    const password = regForm.elements["password"];
    const passwordCnfrm = regForm.elements["passwordCnfrm"];

    //registration form submit event
    regForm.addEventListener("submit", (event) => {
        event.preventDefault();
        //all error messages
        let errors = "";
        let inputField = null;

        console.log("reg form submit")
        //check password
        let pwdErrors = validatePassword(password.value);
        if (pwdErrors) {
            errors += pwdErrors;
            if (inputField === null) inputField = password;
        }
        //check password match
        if (password.value !== passwordCnfrm.value) {
            errors += "\n Passwords do not match!"
            //add focus only for the 1st field
            if (inputField === null) inputField = passwordCnfrm;
        }
        //if we got any error messages - validation failed
        if (errors.length > 0) {
            showError(errors, inputField);
            return false;
        }

        //form is valid
        let user = saveUser(regForm);
        if (user !== null) {
            //clearForm(regForm);
            alert(`Congrads, ${user.username}! You are registred!`)
            changePageforAuthorized(user.username);
        }
        return true;
    });


    //on change event
    password.addEventListener("change", (e) => {
        e.preventDefault();
        let message = validatePassword(e.target.value)
        if (message.length > 0) {
            showError(message, password);
        }
    });


    /*********************************** */
    /**events for login form */

    const loginForm = document.getElementById("login");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        //check username
        let username = loginForm.elements["username"];
        if (!userExist(username.value)) {
            showError("Username does not exist!", username);
            return false;
        }
        //check if password is correct for this user
        let password = loginForm.elements["password"];
        if (!userDataCheck(username.value, password.value)) {
            showError("Password is incorrect");
            return false;
        }

        //username and password are valid. greet user        
        changePageforAuthorized(username.value);
    });
}

function validatePassword(password) {
    //collect all errors in password
    let errorMessages = "";
    // Passwords must have at least one uppercase and one lowercase letter.
    let regex = new RegExp("[a-z]+");
    if (!regex.test(password)) errorMessages += "\n Password must have at least one lowercase letter."
    // Passwords must have at least one uppercase and one lowercase letter.
    regex = new RegExp("[A-Z]+");
    if (!regex.test(password)) errorMessages += "\n Password must have at least one uppercase letter."
    // Passwords must contain at least one number.
    regex = new RegExp("[0-9]+")
    if (!regex.test(password)) errorMessages += "\n Password must contain at least one number."
    // Passwords must contain at least one special character.
    regex = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/);
    if (!regex.test(password)) errorMessages += "\n Password must contain at least one special character."
    // Passwords cannot contain the word "password"(uppercase, lowercase, or mixed).
    regex = new RegExp("password");
    if (regex.test(password.toLowerCase())) errorMessages += "\n Password cannot contain the word 'password'."
    return errorMessages;
}


/***************************************************************** */
/**
 * Utility function for error box display
 * @param {string} message 
 * @param {DOM object} object  - optional
 */
function showError(message, object) {
    const errorDisplay = document.getElementById("errors");
    deleteChilds(errorDisplay);
    //create new element in errorBox
    let err = errorDisplay.appendChild(document.createElement("pre"));
    //If we have invalid object - focus on it
    if (object) object.focus();
    //add error text in new DOM element
    err.textContent = message;
    //show error box on page
    errorDisplay.style.display = "block";

    setTimeout(() => {
        errorDisplay.removeChild(err);
        errorDisplay.style.display = "none";
    }, 5000);
}

/**
 * Save user after form validation
 * @returns user object
 */
function saveUser(userInfoElement) {
    let newUser = {};
    newUser["username"] = userInfoElement.elements["userName"].value.toLowerCase();
    newUser["email"] = userInfoElement.elements["email"].value.toLowerCase();
    newUser["password"] = userInfoElement.elements["password"].value;
    localStorage.setItem(newUser.username, JSON.stringify(newUser));
    return newUser;
}


/**
 * check if we have such user in localStorage
 * @param {string} username 
 * @returns true if user exists, otherwise - false
 */
function userExist(username) {
    return localStorage.getItem(username.toLowerCase()) !== null;
}

/**
 * check username-password pair
 * @param {string} username 
 * @param {string} password 
 * @returns true if password correct for username, otherwise - false
 */
function userDataCheck(username, password) {
    //as we checked firstly username, user should exist in this check
    let userData = JSON.parse(localStorage.getItem(username.toLowerCase()));
    return userData.password === password;
}

/**
 * Function that provides UI for dashboard
 * @param {string} username 
 */
function changePageforAuthorized(username) {
    deleteChilds(mainContent);
    let dashboardDiv = document.createElement("div");
    mainContent.appendChild(dashboardDiv)
    dashboardDiv.classList.add("dashboard");
    dashboardDiv.appendChild(document.createElement("h1")).textContent = `Hello ${username}! Let's create!`
    addDashBoard("dashboard_templates.html", "main-info", dashboardDiv);
    changePersonalMenu();
}

/**
 * Helper function that delete used template from DOM 
 * @param {string} templateId 
 */
function deleteTemplate(templateId) {
    const template = document.getElementById(templateId);
    template.remove();
}

/**
 * asynchronous function for adding information from templates
 */
async function addDashBoard(templateName, templateId, parentElement) {
    //wait while templarte is added
    await addTemplate(templateName);
    //insert DOM objects from template on page
    await insertTemplateData(templateId, parentElement);

    addButtonsEvents(parentElement);
}

/**
 * function that add dummy events for dashboard elements
 * @param {object} parentElement 
 */
function addButtonsEvents(parentElement) {
    //choose all interactive events from form
    const picture = parentElement.getElementsByClassName("picture")[0];
    const fabric = parentElement.getElementsByClassName("fabric-block")[0];
    const rhinestonesBtns = parentElement.getElementsByClassName("rhinestone-btn");
    //set dummy event
    picture.addEventListener("click", showLaterFeatureAlert);
    fabric.addEventListener("click", showLaterFeatureAlert);
    Array.prototype.forEach.call(rhinestonesBtns, (element) => {
        console.log(element)
        element.addEventListener("click", showLaterFeatureAlert)
});
    
}

/**
 * Event handler for clicking on objects in dashboard
 * @param {object} e 
 */
function showLaterFeatureAlert(e) {
    e.preventDefault();
    alert(`Feature for uploading information to ${e.target.classList} would be added later.`);
}

/**
 * Function for changing personal menu after user authentification
 */
function changePersonalMenu() {
    //remove authentification event from personal link
    userLogin.removeEventListener("click", authentifyUser)
    //get all links in personal menu and save 1st child
    let link = document.getElementsByClassName("personal-menu")[0].firstElementChild;
    //change all elements
    while (link) {
        //currently we have new behaviour on LogIn/Logout link
        switch (link.getAttribute("id")) {

            case "user":
                //delete current childs
                deleteChilds(link);
                //create new img element
                const img = document.createElement("img");
                //set image attributes
                img.setAttribute("src", "./src/img/user-loggedin.png");
                img.setAttribute("alt", "LogOut");
                //append image, line break and text
                link.appendChild(img);
                link.appendChild(document.createElement("br"))
                link.append('Log Out');
                //add new event listener
                userLogin.addEventListener("click", logOut);
                break;

            default:
                link.firstElementChild.setAttribute("src", "./src/img/favorite-full.png")
                break;
        }

        link = link.nextElementSibling;
    }

}

/**
 * Event simulating LogOut
 * @param {object} event 
 */
function logOut(event) {
    event.preventDefault();
    //reload page
    location.reload();
}