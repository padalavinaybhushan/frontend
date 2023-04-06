
function cregister(){
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
            password : $('#password').val()
        }),
        success:function(req,res,data){
            if(!data){
                window.location.href="www.google.com"
            }
            else{
                window.location.href = "clogin.html"
            }
            
        }
    })
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
            name:$('#name').val(),
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

if(window.location.href.indexOf("cedit")>=0 || window.location.href.indexOf("recedit")){
    $("window").ready(async () => {
    $('#email').html(JSON.parse(sessionStorage.getItem('user')).email)
   // console.log(document.getElementById('kko'));
    document.querySelector('#profile-email').value = JSON.parse(sessionStorage.getItem('user')).email
    })
}


function cupdate(event){

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
    console.log(JSON.parse(sessionStorage.getItem('user')));
    $.ajax({
        url:"http://localhost:8002/"+event,
        type:'POST',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+accessToken);
            //request.setRequestHeader("Content-Type", "multipart/form-data");
          },
          contentType:"application/json",
          //contentType:"multipart/form-data",

        // processData: false,
        // contentType: false,
          data : JSON.stringify({
            email:JSON.parse(sessionStorage.getItem('user')).email,
            name :$('#fullname').val(),
            //email : $('#email').val(),
            phone1 : $('#phone1').val(),
            phone2 : $('#phone2').val(),
            address: $('#address').val(),
            designation : $('#designation').val(),
            company:$('#company').val(),
            github : $('#github').val(),
            linkedin : $('#linkedin').val(),
            //profile : $('profile').val()
        }),
        success:function(req,res,data){
                //window.location.href = "canprofile.html"
                console.log(data.responseText);
                sessionStorage.setItem('user',data.responseText)
                console.log(JSON.parse(data.responseText));
                if(event == "cUpdate")
                window.location.href="canprofile.html"
                else window.location.href="empprofile.html"
        }
    })   
}