const form = document.querySelector("form");

form.addEventListener("submit", function(event){

    event.preventDefault(); // stops page refresh

    const email = document.querySelectorAll("input")[0].value;
    const password = document.querySelectorAll("input")[1].value;
    const confirmPassword = document.querySelectorAll("input")[2].value;

    if(email === "" || password === "" || confirmPassword === ""){

        alert("Please fill in all fields");

        return;
    }

    if(password !== confirmPassword){

        alert("Passwords do not match");
        return;
    }
    
    // success message
    alert("Account created (prototype)");

});