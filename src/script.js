const userLogin = document.getElementById("user");
const mainContent = document.getElementById("main-content");
//ad on-click event for user menu
userLogin.onclick = function (event) {
    //prevent anchor link referance
    event.preventDefault()
    //delete all child in main block
    deleteChilds(mainContent);
    //change main content to registration - login form
    addLoginInfoToMain('login_reg_template.html', "reg-login",mainContent);

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
    insertTemplateData(templateId, parentElement);
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
function insertTemplateData(templateId, parentElement) {
    //find template on DOM document
    const template = document.getElementById(templateId);
    //make deep copy of template elements
    const clone = template.content.cloneNode(true);
    //append elements from template to parent element
    parentElement.appendChild(clone);
    
}