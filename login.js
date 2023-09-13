const loginForm = document.forms["login-form"]
const userEmail = loginForm["user-email"]
const userPassword = loginForm["user-password"]
const loginBtn = document.querySelector(".login-btn")
const errorMessage = document.querySelector(".error-message")
const users =  JSON.parse(localStorage.getItem("users"));
//Login form

function checkUser(arr,formEmail, formPassword)
{
   let valid = false
   arr.forEach((value)=>{
     if(value.email == formEmail){
          if(value.password == formPassword)
          {
            valid = true
          }
     }
   })
   return valid;
}

loginBtn.addEventListener("click", ()=>{
 if(userEmail.value)
 {
   if(userPassword){
      const isUser = checkUser(users,userEmail.value, userPassword.value);
      if(isUser){
         location.assign("./index.html")
      }else{
        userEmail.parentElement.children[1].textContent = "User does not exist"
        userEmail.parentElement.classList.add("error") 
      }
   }else{
      userPassword.parentElement.children[1].textContent = "Can't be empty"
      userPassword.parentElement.classList.add("error") 
   }
}else{
  userEmail.parentElement.children[1].textContent = "Can't be empty"
  userEmail.parentElement.classList.add("error") 
}
})