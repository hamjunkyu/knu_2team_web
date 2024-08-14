const signinEmail = document.getElementById("signin_email");
const signinPassword = document.getElementById("signin_password");
const signinButton = document.getElementById("signin_button");

signinButton.addEventListener("click", async () => {
    try{
        const email = signinEmail.value;
        const password = signinPassword.value;
        const signinResult = await fetch("/api/user/signin",{
        method: "post", 
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (signinResult.ok) {
        const result = await signinResult.json()
        console.log(result);
    }
    else{
    alert("(!)로그인 오류");
}
    }
    catch(err){
        console.log(err);
        alert("(!) 로그인 오류")
}
});


