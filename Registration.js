
userName      = document.getElementById('userName');
userPassword  = document.getElementById('userPassword');
userPasswordC = document.getElementById('userPasswordC');
userEmail     = document.getElementById('userEmail');
gender_male   = document.getElementById('gender_male');
gender_female = document.getElementById('gender_female')
unSpan        = document.getElementById('unSpan');
upSpan        = document.getElementById('upSpan');
upcSpan       = document.getElementById('upcSpan');
ueSpan        = document.getElementById('ueSpan');
submit        = document.getElementById('submit');
cancel        = document.getElementById('cancel');
gender        = document.getElementsByClassName('gender');


// // Event In Input => UserName

    userName.addEventListener('input',function (){

        if(!isUserNameValid(userName.value)){
            unSpan.style.display = "block";

        }else {
            unSpan.style.display = "none";
        }

    })

    function isUserNameValid(UserNameValue){

        let UserNamePattern = /^[a-z0-9_-]{3,16}$/;

        return UserNameValue.match(UserNamePattern);
    }


// Event In Input => UserPassword

    userPassword.addEventListener('input',function (){

        if(!isUserPassValid(userPassword.value)){
            upSpan.style.display = "block";
        }else{
            upSpan.style.display = "none";

        }

    })

    function isUserPassValid(UserPassValue){

        let UserPassPattern = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

        return UserPassValue.match(UserPassPattern);
    }

// Event In Input => UserEmail

    userEmail.addEventListener('input',function (){

        if(!isUserEmailValid(userEmail.value)){
            ueSpan.style.display = "block";
        }else{
            ueSpan.style.display = "none";

        }

    })

    function isUserEmailValid(UserEmailValue){

        let UserEmailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

        return UserEmailValue.match(UserEmailPattern);
    }

// Event In Input => UserPassConformation


userPasswordC.addEventListener('input',function (){

        if(userPassword.value != userPasswordC.value){
            upcSpan.style.display = "block";

        }else {
            upcSpan.style.display = "none";
        }

    })

    document.forms[0].addEventListener('submit',function (data){

        if(!(isUserNameValid(userName.value) && isUserPassValid(userPassword.value) && isUserEmailValid(userEmail.value))){

            data.preventDefault();
        }else{

            let userNameCookie =  userName.value;
            let userPassCookie =  userPassword.value;
            let date           = new Date(2030,5,13);

            document.cookie = "userName =" + userNameCookie +" "+ "userPass="+ userPassCookie +" "+ "expires = " + date + ";path=/";

        }
    })
    document.forms[0].addEventListener('reset',function (data){

        if(!(confirm("Are You Sure To Clear Form ?"))){

            data.preventDefault();

        }else{

            upcSpan.style.display = "none";
            ueSpan.style.display = "none";
            upSpan.style.display = "none";
            unSpan.style.display = "none";

        }
    })

// Access UserName = document.cookie.split(" ")[0].split("=")[1]
// Access  UserPass =document.cookie.split(" ")[1].split("=")[1]
