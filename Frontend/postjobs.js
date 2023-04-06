var x = document.cookie 
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

function postJob(){
    accessToken = sessionStorage.getItem('accessToken')
    var x = document.cookie 
    accessToken = (x.split(";")[0]).split("=")[1]
    cookieuserId = (x.split(";")[1]).split("=")[1]
    console.log(accessToken);
    $.ajax({
        url:"http://localhost:8002/"+"postjob.html",
        type:'POST',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer "+accessToken);
          },
          contentType: "application/json",
          data : JSON.stringify({
            name:$('#name').val(),
            jodDescription:$('#jd').val(),
            location:$('#loc').val(),
            Experience:$('#exp').val(),
            skills:$('#skill').val(),
            salary:$('#salary').val(),
            createrId:JSON.parse(sessionStorage.getItem('user'))["_id"]
        }),
        success:function(req,res,data){
            if(!data){
                window.location.href="www.google.com"
            }
            else{
                alert('job added successful')
               // window.location.href = "postJob.html"
            }
            
        }
    })
}