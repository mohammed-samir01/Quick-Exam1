userName       = document.getElementById('userName');
userPassword   = document.getElementById('userPassword');
UserNameCookie = document.cookie.split(" ")[0].split("=")[1];
UserPassCookie = document.cookie.split(" ")[1].split("=")[1];
submit         = document.getElementById('submit');
cancel         = document.getElementById('cancel');



userName.addEventListener('input', function (){

    if(userName.value != UserNameCookie){
        unSpan.style.display = "block";

    }else {
        unSpan.style.display = "none";
    }
})

userPassword.addEventListener('input', function (){

    if(userPassword.value != UserPassCookie){
        upSpan.style.display = "block";

    }else {
        upSpan.style.display = "none";
    }
})

submit.addEventListener('click',function (data){
    if (userName.value != UserNameCookie ){

        data.preventDefault();
    }
})

cancel.addEventListener('click',function (data){

    if(!(confirm("Are You Sure To Clear Data ?"))){

        data.preventDefault();

    }else{

        unSpan.style.display = "none";
        upSpan.style.display = "none";

    }

})

