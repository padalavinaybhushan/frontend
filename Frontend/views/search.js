async function login(event){
    event.preventDefault();
    email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    console.log(email,password);
   // localStorage.setItem("email",email);
 //   window.location.href="http://127.0.0.1:8000/browse-job.html";
    var tem = await fetch("http://127.0.0.1:8000",
           { method:'POST',
            headers:{ "Content-type":'application/json'},
        body:JSON.stringify({email:password})})
 }

// var profile=document.getElementById("profiless").innerHTML=`<i class="fa fa-user"></i>  `+localStorage.getItem("email");
// console.log(profile,document);