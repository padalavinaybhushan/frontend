

accessToken = sessionStorage.getItem('accessToken')
//accessToken=""
var x = document.cookie 
var accessToken;
var cookieuserId;
console.log(x);
if((x.split(";")[0]).split("=")[0].indexOf("access")>=0){
    accessToken = (x.split(";")[0]).split("=")[1]
    cookieuserId = (x.split(";")[1]).split("=")[1]
}
else{
    accessToken = (x.split(";")[1]).split("=")[1]
    cookieuserId = (x.split(";")[0]).split("=")[1]
}
console.log(accessToken,cookieuserId);
$('window').ready(async ()=>{
    var curr_url = window.location.href.split("/");
    curr_url = curr_url[curr_url.length-1]
    if(curr_url == "mainhome.html"){
        curr_url=""
        //accessToken = "";
        //sessionStorage.removeItem('accessToken')
    }
        console.log(accessToken);
    $.ajax({
        url:"http://localhost:8002/"+curr_url,
        type:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("authorization", "Bearer "+accessToken);
          },
       
        success:function(req,res,data){
            console.log(data.responseText,"elogin");

            if(data.responseText == "destroy"){
               sessionStorage.removeItem('accessToken')
               sessionStorage.removeItem('user')
                console.log(sessionStorage.getItem('accessToken'));
                window.location.href="mainhome.html"
            }
            if(data.responseText === "elogin"){
                console.log("inside");
                sessionStorage.removeItem('accessToken')
               sessionStorage.removeItem('user')
            }
            console.log("plop");
            console.log(data.responseText,1);
            console.log(sessionStorage.getItem('user'));
        },
        error: function (error) {
            console.log(error);
           window.location.href="error-404.html"
        }
    })
})



var curr_url = window.location.href.split("/");
curr_url = curr_url[curr_url.length-1]

if(curr_url == "empprofile.html"){

    var user = JSON.parse(sessionStorage.getItem('user'))
    $.ajax({
        url:"http://localhost:8002/"+"getEmp",
        type:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("authorization", "Bearer "+accessToken);
            request.setRequestHeader("_id",cookieuserId)
          },
       
        success:function(req,res,data){
            console.log(data.responseText);
            user = JSON.parse(data.responseText)
            document.querySelector('#profile').innerText = user.name 
            var profile_obj = document.querySelectorAll(".render");
            console.log(profile_obj);
            profile_obj[0].innerText = user.name;
            profile_obj[1].innerText = user.designation;
            profile_obj[2].innerText = user.address;
            profile_obj[3].innerText = user.campany_name;
            profile_obj[4].innerText = user.github;
            profile_obj[5].innerText = user.linkedin;
            profile_obj[6].innerText = user.name;
            profile_obj[7].innerText = user.email;
            profile_obj[8].innerText = user.phone1;
            profile_obj[9].innerText = user.phone2;
            profile_obj[10].innerText = user.address;
            document.querySelector('#profile-pic').src=user.profile
        },
        error: function (error) {
            console.log(error);
           window.location.href="error-404.html"
        }
    })

    
   
    
}

