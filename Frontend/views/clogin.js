

$("#submit_btn").on("click",()=>{
    console.log("q");
    var email_val = $("#email").val();
    var pass_val =$('#password').val();
    $.ajax({
        url: "http://localhost:8001/clogin.html",
        type: "POST",
        headers: {
            e:"1"    
        },
        success: function(req,res,responseData) {
            responseData =  JSON.parse(JSON.stringify(responseData));
            accessToken =  JSON.parse(responseData.responseText).accessToken; 
            console.log(accessToken,typeof(accessToken));
            // if(responseData){
            //     $.ajax({
            //         url:"http://localhost:8001/browse-job.html",
            //         type:"GET",

            //         beforeSend: function (xhr) {
            //             xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            //         },
            //         success :  function(html){
            //             ///I want this html comes after ejs compilation process
                        
            //      }
            //     })
            //     //window.location.href = "http://localhost:8001/browse-job.html"
            // }
            
        }
    });
})