# LeotardCraft User Dashboard Draft
This is the project that provide design draft of LeotardCraft User Dashboard. The main goal of the project is to show the process of providing access to the user's personal dashboard in LeotardCraft application. User authentification is simulated with the different options that DOM and BOM provided.
# Project Description
This progect shows these opportunities of DOM and BOM manipulation:
- changing DOM element
- creating new DOM elements
- deleting and modifying DOM element's children
- changing attributes of DOM element
- event handling
- creating content with HTML Template usage
- interacting with user with alerts
- page reloagin as a reaction on user actions
- saving simple user data in LocalStorage

# User Manual
At the begining user should register or log in to the web application:

![First Step](/readme_img/1.png "Personal menu")

User should provide required information to register:
- user name - minimum 4 characters, only letters and numbers allowed
- first name - minimum 2 characters
- last name - minimum 2 characters
- email - should contain @email.com part
- password - minimum 6 characters, should contain lowercase and uppercase letters, numbers and special symbols. Should not contain word 'password'
- confirm password - should match password

![Registration Form](/readme_img/2.png "Registration Form")

If all required fields filled correctly user would see the confirmation allert.

![Confirmation](/readme_img/3.png "Confirmation Allert")

Otherwise user would see different warnings that explain what is needed to be changed.
Then system will show the dashboard.

![DashBord](/readme_img/4.png "Dashboard layout")

If user reload page it is possible for user to login.
Username and passwor previouly registred user shoul be entered in this step.

![Login](/readme_img/5.png "Login form")

There is dummy event handler for dashboard actions. If picture box, places for fabrics and rhinestones buttons are clicked - system show allert.

![Picture block is clicked](/readme_img/6.png)

![Fabric blocks are clicked](/readme_img/7.png)

![Add diferent kinds of rhinestones buttons are clicked](/readme_img/8.png)

User could simulate Log Out action by clicking on LogOut button

![LogOut](/readme_img/9.png "Authenticated user personal menu") 

# Author
Project prepared as a part of education in **Software Engineering Bootcamp** at *Per Scholas* by [Kseniia Irinarkhova](https://www.linkedin.com/in/kseniia-irinarkhova/).

# Additional Resources
- [Load HTML template with JavaScript](https://stackoverflow.com/questions/6451169/load-html-template-with-javascript)
- [How do I load the contents of a text file into a javascript variable?](https://stackoverflow.com/questions/196498/how-do-i-load-the-contents-of-a-text-file-into-a-javascript-variable)