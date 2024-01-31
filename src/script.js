const userLogin = document.getElementById("user");
const mainContent = document.getElementById("main-content");
userLogin.onclick = function (event) {
    event.preventDefault()
    deleteChilds(mainContent);
    addLoginInfoToMain();
    
    
    // $('#main-content').load('login_reg_template.html', function () { // Things to do when the html is loaded 
    // confirm.log("Can't add templates!")
    // });
    //window.open("login_reg.html", "login_reg", "left=100,top=100,width=680 height=600");
}



/*************************************************************** */
function deleteChilds(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function addLoginInfoToMain() {
    const template = addTemplate('login_reg_template.html');
}

async function addTemplate(fileName) {
    let templateData = "";
    await fetch(fileName)
        .then(response => response.text())
        .then((data) => {
            //console.log(data)
            templateData = data;
            // console.log(templateData);
            // console.log("then data end")

        })
    document.head.append(
        new DOMParser().parseFromString(templateData, 'text/html')
            .querySelector('template')
    )
    insertTemplateData("reg-login", mainContent);
}

function insertTemplateData(templateId, parentElement) {
    console.log("insertTemplateData")
    const template = document.getElementById(templateId);
    console.log(template)
     const clone = template.content.cloneNode(true);
     parentElement.appendChild(clone);
}