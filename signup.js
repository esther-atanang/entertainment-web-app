const signUpForm = document.forms["signup-form"]
const signUpEmail = signUpForm["email"]
const signUpPassword = signUpForm["password"]
const confirmPassword = signUpForm["confirm-password"]
const signUpBtn = document.querySelector(".signup-btn")
const errorMessage = document.querySelector(".error-message")
let users = [];
//Sign up Form
function checkdata(arr,formEmail)
{
   let valid = true
   arr.forEach((value)=>{
     if(value.email == formEmail){
        valid = false
     }
   })
   return valid;
}
signUpBtn.addEventListener("click", ()=>{
   
   if(signUpEmail.value)
   {
     if(signUpEmail.parentElement.classList.contains("error")){
        signUpEmail.parentElement.classList.remove("error")
     }
       if(checkdata(users,signUpEmail.value)){
                 if(signUpEmail.parentElement.classList.contains("error")){
                    signUpEmail.parentElement.classList.remove("error")
                 }
            if(signUpPassword.value)
            {
                     if(signUpPassword.parentElement.classList.contains("error")){
                        signUpPassword.parentElement.classList.classList.remove("error")
                         }
                if(confirmPassword.value){
                    if(confirmPassword.parentElement.classList.contains("error")){
                        confirmPassword.parentElement.classList.classList.remove("error")
                         }
                    if(signUpPassword.value === confirmPassword.value)
                        {
                            let user = {
                            email: signUpEmail.value,
                            password: signUpPassword.value
                        }
                        users.push(user);
                        console.log(users)
                        localStorage.setItem("users", JSON.stringify(users));
                        }else if(signUpPassword.value != confirmPassword.value){
                            confirmPassword.parentElement.children[1].textContent = "Passwords don't match!"
                            signUpPassword.parentElement.children[1].textContent = "Passwords don't match!"
                            signUpPassword.parentElement.classList.add("error")
                            confirmPassword.parentElement.classList.add("error")
                        }
                }else{
                   confirmPassword.parentElement.children[1].textContent = "Can't be empty"
                   confirmPassword.parentElement.classList.add("error")
                }
            }else{
               signUpPassword.parentElement.children[1].textContent = "Can't be empty"
               signUpPassword.parentElement.classList.add("error")
            }
        }
        else
        {
         errorMessage.textContent = "User already exists"
         signUpEmail.parentElement.classList.add("error")
       }
   }else{
     errorMessage.textContent = "Can't be empty"
     signUpEmail.parentElement.classList.add("error")
   }
})

