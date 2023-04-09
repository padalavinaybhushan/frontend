function login(){
    var curr_url = window.location.href.split("/");
    curr_url = curr_url[curr_url.length-1]
    if(curr_url == "mainhome.html")
        curr_url=""
    console.log(curr_url);
    //accessToken = sessionStorage.getItem('accessToken')
    //document.cookie=`accesssToken=${accessToken}`
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
    
    //console.log(x);
    
    $.ajax({
        url:"http://localhost:8002/"+curr_url,
        type:'POST',
        contentType: "application/json",
        data : JSON.stringify({
            email:$('#email').val(),
            password : $('#password').val()
       }),
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", accessToken);
          },
        success:function(req,res,data){
            var received = JSON.parse(data.responseText)
            if(received["noUser"]){
                alert("no user found")
                //window.location.href="http://127.0.0.1:5501/Frontend/error-404.html"
            }
            else{
                //console.log(received);
                sessionStorage.setItem('accessToken',received["accessToken"]);
                console.log(received['user']);
                console.log(received['accessToken']);
                document.cookie="accessToken="+received["accessToken"]
                document.cookie="userId="+received["user"]._id 
                sessionStorage.setItem('user',JSON.stringify(received["user"]));
                console.log(sessionStorage.getItem('user'));
                console.log(document.cookie,11,accessToken);
                if(curr_url == "clogin.html")
                window.location.href = "browse-job.html"
                else 
                window.location.href = "postjob.html" 
            }
            $.ajax({
                type:"POST",
                url:"http://localhost:8002/sendemail",
                headers:{
                    "token":sessionStorage.getItem("accessToken"),
                },
                contentType:"application/json",
                data:JSON.stringify({
                    email:JSON.parse(sessionStorage.getItem("user")).email,
                 }),
              
                success:(data)=>{
                    window.location.href="browse-job.html"
                }
            })
            
        }
        
    })
}

