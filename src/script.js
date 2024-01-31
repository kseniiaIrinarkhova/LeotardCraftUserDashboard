const userLogin = document.getElementById("user");
userLogin.onclick = function(event){
    event.preventDefault()
    window.open("login_reg.html", "login_reg", "left=100,top=100,width=600 height=600");
}
