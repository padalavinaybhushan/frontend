//for crigister
function cregister() {
  var curr_url = window.location.href.split("/");
  curr_url = curr_url[curr_url.length - 1];
  if (curr_url == "mainhome.html") curr_url = "";
  //accessToken = sessionStorage.getItem('accessToken')
  var x = document.cookie;
  var accessToken;
  var cookieuserId;
  if (x.split(";")[0].split("=")[0].indexOf("access") >= 0) {
    accessToken = x.split(";")[0].split("=")[1];
    cookieuserId = x.split(";")[1].split("=")[1];
  } else {
    accessToken = x.split(";")[1].split("=")[1];
    cookieuserId = x.split(";")[0].split("=")[1];
  }
  $.ajax({
    url: "http://localhost:8002/" + curr_url,
    type: "POST",
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", "Bearer " + accessToken);
    },
    contentType: "application/json",
    data: JSON.stringify({
      email: $("#email").val(),
      name: $("#username").val(),
      password: $("#password").val(),
    }),
    success: function (req, res, data) {
      if (!data) {
        window.location.href = "www.google.com";
      } else {
        window.location.href = "clogin.html";
      }
    },
  });
}

if (window.location.href.indexOf("crigister.html") > 0) {
  var candidateValiate = 1;
  //for cemail
  function cemailv(e) {
    flag = 0;
    var mailformat = /\S+@\S+\.\S+/;
    if (e.value.match(mailformat)) {
      flag = 1;
      return flag;
    } else {
      msg = "You have entered an invalid email address!";
      const y = document.getElementById("cemailerr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele1 = document.getElementById("regbutton");
  ele1.addEventListener("click", cemailfun);

  function cemailfun() {
    var email = document.getElementById("email");
    x = cemailv(email);
    console.log(x);
    candidateValiate *= x;
  }

  //for cname
  function cnamev(e2) {
    flag = 0;
    var nameformat = /^[a-zA-Z]+$/;
    if (e2.value.match(nameformat)) {
      flag = 1;
      return flag;
    } else {
      msg = "Your name can only contain alphabets!";
      const y = document.getElementById("cnameerr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele2 = document.getElementById("regbutton");
  ele2.addEventListener("click", cnamefun);

  function cnamefun() {
    var name = document.getElementById("username");
    x = cnamev(name);
    console.log(x);
    candidateValiate *= x;
  }
  //for cpass
  function cpassv(e3) {
    upw = e3;
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var flag = 0;
    msg = "";

    if (upw.value.length == 0) {
      msg += " Please fill in password";
      msg += `<br>`;
    }
    if (upw.value.length < 8) {
      msg += " Min of 8 characters required";
      msg += `<br>`;
    }
    if (!upw.value.match(numbers)) {
      msg += " Please add 1 number";
      msg += `<br>`;
    }
    if (!upw.value.match(upperCaseLetters)) {
      msg += " Please add 1 uppercase letter";
      msg += `<br>`;
    }
    if (!upw.value.match(lowerCaseLetters)) {
      msg += " Please add 1 lowercase letter";
      msg += `<br>`;
    }
    if (
      upw.value.length > 7 &&
      upw.value.match(numbers) &&
      upw.value.match(upperCaseLetters) &&
      upw.value.match(lowerCaseLetters)
    ) {
      flag = 1;
      return flag;
    }
    const y = document.getElementById("cpasserr");
    y.innerHTML = msg;
    y.style.display = "block";
    return flag;
  }

  const ele3 = document.getElementById("regbutton");
  ele3.addEventListener("click", cpassfun);

  function cpassfun() {
    var pass = document.getElementById("password");
    x = cpassv(pass);
    console.log(x);
    candidateValiate *= x;
  }

  //for cpass confirmation

  function cPassConv(e1, e2) {
    if (e1.value == e2.value) {
      flag = 1;
      return flag;
    } else {
      msg = "Your Passwords dont match!";
      const y = document.getElementById("cConPasserr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele4 = document.getElementById("regbutton");
  ele4.addEventListener("click", cPassConfun);

  function cPassConfun() {
    var cpass = document.getElementById("form3Example4cdg");
    var pass = document.getElementById("password");
    x = cPassConv(cpass, pass);
    console.log(x);
    candidateValiate *= x;
  }

  const ele5 = document.getElementById("regbutton");
ele5.addEventListener("click", candidateValiatefun);

function candidateValiatefun() {
  console.log("validate ");
  if (candidateValiate == 1) {
    cregister();
  } else {
  }
}
}



/////////////////////////////////////////////////////////////////////////////////////////

//for erigister

var recuiterValidate = 1 ;
if (window.location.href.indexOf("erigister.html") > 0) {
  console.log(window.location.href);
  //for eemail
  function eemailv(e) {
    flag = 0;
    var mailformat = /\S+@\S+\.\S+/;
    if (e.value.match(mailformat)) {
      flag = 1;
      return flag;
    } else {
      msg = "You have entered an invalid email address!";
      const y = document.getElementById("eemailerr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele1 = document.getElementById("regbut");
  ele1.addEventListener("click", eemailfun);

  function eemailfun() {
    var email = document.getElementById("email");
    x = eemailv(email);
    console.log(x);
    recuiterValidate *= x
  }

  //for cname
  function enamev(e2) {
    flag = 0;
    var nameformat = /^[a-zA-Z]+$/;
    console.log(e2.value);
    if (e2.value.match(nameformat)) {
      flag = 1;
      return flag;
    } else {
      msg = "Your name can only contain alphabets!";
      const y = document.getElementById("enameerr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele2 = document.getElementById("regbut");
  ele2.addEventListener("click", enamefun);

  function enamefun() {
    var name = document.getElementById("username");
    x = enamev(name);
    console.log(x);
    recuiterValidate *= x

  }
  //for cpass
  function epassv(e3) {
    upw = e3;
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var flag = 0;
    msg = "";

    if (upw.value.length == 0) {
      msg += " Please fill in password";
      msg += `<br>`;
    }
    if (upw.value.length < 8) {
      msg += " Min of 8 characters required";
      msg += `<br>`;
    }
    if (!upw.value.match(numbers)) {
      msg += " Please add 1 number";
      msg += `<br>`;
    }
    if (!upw.value.match(upperCaseLetters)) {
      msg += " Please add 1 uppercase letter";
      msg += `<br>`;
    }
    if (!upw.value.match(lowerCaseLetters)) {
      msg += " Please add 1 lowercase letter";
      msg += `<br>`;
    }
    if (
      upw.value.length > 7 &&
      upw.value.match(numbers) &&
      upw.value.match(upperCaseLetters) &&
      upw.value.match(lowerCaseLetters)
    ) {
      flag = 1;
      return flag;
    }
    const y = document.getElementById("epasserr");
    y.innerHTML = msg;
    y.style.display = "block";
    return flag;
  }

  const ele3 = document.getElementById("regbut");
  ele3.addEventListener("click", epassfun);

  function epassfun() {
    var pass = document.getElementById("password");
    x = epassv(pass);
    console.log(x);
    recuiterValidate *= x

  }

  //for cpass confirmation

  function ePassConv(e1, e2) {
    console.log(e1.value,e2.value);
    if (e1.value == e2.value) {
      flag = 1;
      return flag;
    } else {
      msg = "Your Passwords dont match!";
      const y = document.getElementById("eConPasserr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele4 = document.getElementById("regbut");
  ele4.addEventListener("click", ePassConfun);

  function ePassConfun() {
    var epass = document.getElementById("form3Example4cdg");
    var pass = document.getElementById("password");
    x = ePassConv(epass, pass);
    console.log(x);
    recuiterValidate *= x

  }

function recregister(){
    var curr_url = window.location.href.split("/");
    curr_url = curr_url[curr_url.length-1]
    if(curr_url == "mainhome.html")
        curr_url=""
    //accessToken = sessionStorage.getItem('accessToken')
    var x = document.cookie 
    var accessToken;
    var cookieuserId;
    if((x.split(";")[0]).split("=")[0].indexOf("access")>=0){
        accessToken = (x.split(";")[0]).split("=")[1]
        cookieuserId = (x.split(";")[1]).split("=")[1]
    }
    else{
        accessToken = (x.split(";")[1]).split("=")[1]
        cookieuserId = (x.split(";")[0]).split("=")[1]
    }
    $.ajax({
        url:"http://localhost:8002/"+curr_url,
        type:'POST',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+accessToken);
          },
          contentType: "application/json",
          data : JSON.stringify({
            email:$('#email').val(),
            name:$('#username').val(),
            password : $('#password').val(),
            company : $('#company').val()
        }),
        success:function(req,res,data){
            if(!data){
                window.location.href="www.google.com"
            }
            else{
                window.location.href = "elogin.html"
            }
            
        }
    })
}

const ele8 = document.getElementById("regbut");
ele8.addEventListener("click", recuiterValiatefun);

function recuiterValiatefun() {
  console.log("validate ");
  if (recuiterValidate == 1) {
    console.log("lpppp");
    recregister();
  } else {
  }
}
}

//////////////////////////////////////////////////////////////
if (window.location.href.indexOf("postjob.html") > 0) {
  // for jobname
  function jobnamev(e) {
    flag = 0;

    if (e.length > 0) {
      flag = 1;
      return flag;
    } else {
      msg = "please enter a name!";
      const y = document.getElementById("jobnameerr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele2 = document.getElementById("postjobbut");
  ele2.addEventListener("click", jobnamefun);

  function jobnamefun() {
    var name = document.getElementById("jobname").value;
    x = jobnamev(name);
    recuiterValidate *= x
    console.log(x);
  }

  //for jobdescripton
  function jobdesv(e) {
    flag = 0;

    if (e.length > 40) {
      flag = 1;
      return flag;
    } else {
      msg = "Enter atleast 40 letters!";
      const y = document.getElementById("jderr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele5 = document.getElementById("postjobbut");
  ele5.addEventListener("click", jobdfun);

  function jobdfun() {
    var jobdes = document.getElementById("jobdesc").value;
    x = jobdesv(jobdes);
    console.log(x);
    recuiterValidate *= x

  }

  //for jobexperience
  function jobexpv(e) {
    flag = 0;

    if (Number.isInteger(e)) {
      flag = 1;
      return flag;
    } else {
      msg = "Enter a number!";
      const y = document.getElementById("jexerr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele6 = document.getElementById("postjobbut");
  ele6.addEventListener("click", jobexfun);

  function jobexfun() {
    var jobexp = document.getElementById("experience").value;
    x = jobexpv(jobexp);
    console.log(x);
    recuiterValidate *= x

  }

  //for jobexperience
  function jobsalv(e) {
    flag = 0;

    if (Number.isInteger(e)) {
      flag = 1;
      return flag;
    } else {
      msg = "Enter a number!";
      const y = document.getElementById("jsalerr");

      y.innerHTML = msg;

      y.style.display = "block";
      return flag;
    }
  }

  const ele7 = document.getElementById("postjobbut");
  ele7.addEventListener("click", jobsalfun);

  function jobsalfun() {
    var jobsal = document.getElementById("salary").value;
    x = jobsalv(jobsal);
    console.log(x);
    recuiterValidate *= x

  }
}
