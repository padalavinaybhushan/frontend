
function editbtnss(){
    console.log("hello")
    $.ajax({
        type:"POST",
        url:"https://jobportal-s38r.onrender.com/editblog",
        contentType:"application/json",
        data:JSON.stringify({
            title:$("#title").val(),
            imglink:$("#imglink").val(),
            blogdesc:$("#blogdesc").val(),
            blogid:sessionStorage.getItem("blogid")
           
        }),
        success:function(data){
            console.log(data);
            window.location.href="add-blog.html";
        }
    })
    
}


function editblog(event){
    sessionStorage.setItem("blogid",event)
   if(window.location.href.indexOf('add-blog')>=0){
    window.location.href="editblog.html"
   }
   
}

if((window.location.href).indexOf("editblog")>=0){
    $(document).ready(function(){
        document.querySelector('#bbb').value = sessionStorage.getItem('blogid')
        // $.ajax({
        //     type:"GET",
        //     url:"https://jobportal-s38r.onrender.com/editblog",
        //     headers:{
        //         "token":sessionStorage.getItem("accessToken"),
        //         // btnid:sessionStorage.getItem("editblog")
        //         blogid:sessionStorage.getItem("blogid")
                
        //     },
        //     error:function(err,data){
        //         if(err.status=="404")window.location.href="post-job.html"
        //         if(err.status=="401")window.location.href="browse-job.html"
        //         if(err.status=="405")window.location.href="mainhome.html"
        //     },
        //     success:function(data){
        //         $("#title").val(data.title) 
        //         $("#imglink").val(data.imglink)
        //         $("#blogdesc").val(data.blogdesc)
        //         console.log(data)
                


                
        //     }
        // })
    })
}




// function addblog(){
//     console.log("hi");
//     $.ajax({
//         type:"POST",
//         url:"https://jobportal-s38r.onrender.com/add-blog",
//         processData:false,
//         contentType:false,
//         enctype:"multipart/form-data",
//         data:JSON.stringify({
//             title:$("#title").val(),
//             image:$("#imglink").val(),
//             blogdesc:$("#blogdesc").val(),
           
//         }),
//         success:function(data){
//             console.log(data);
//             window.location.href="add-blog.html";
//         }
//     })
// }





if((window.location.href).indexOf("add-blog")>=0){
    $(document).ready(function(){
        document.querySelector('#useridblog').value = JSON.parse(sessionStorage.getItem('user'))._id
        $.ajax({
            type:"GET",
            url:"https://jobportal-s38r.onrender.com/add-blog",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="404")console.log("404")//window.location.href="mainhome.html"
                if(err.status=="401") console.log("401")//window.location.href="post-job.html"
            },
            success:function(data){
                console.log(data)
                n=0
                for (var datas of data){
                    n=n+1
                    document.getElementById("blogpage").innerHTML+=`<div class="container">
					<div class="card lg-3" style="max-width: 85%; ">
						<div class="row no-gutters">
						  <div class="col-sm dez-post-media dez-img-effect zoom-slow radius-sm" style="padding-left: 15px; padding-bottom:15px; padding-top:15px">
							<img id="imglink" style="padding-left: 10px; width:360px; height:360px" src="`+datas.imglink+`" class="card-img" alt="...">
						  </div>
						  <div class="col-md-8">
							<div class="card-body">
							  <h5 class="card-title" id="title">`+datas.title+`</h5>
							  <p class="card-text" id="blogdesc">`+datas.blogdesc+`</p>
							  
							</div>
                            
						  </div>
						</div>
                        </div>
                      </div>
                    `
                    console.log(datas.createdBy);
                    if(datas.createdBy == JSON.parse(sessionStorage.getItem('user'))._id){
                        console.log("kk");
                        document.getElementById("myblog").innerHTML+=`<div class="container">
					<div class="card lg-3" style="max-width: 85%; ">
						<div class="row no-gutters">
						  <div class="col-sm dez-post-media dez-img-effect zoom-slow radius-sm" style="padding-left: 15px; padding-bottom:15px; padding-top:15px">
							<img id="imglink" style="padding-left: 10px; width:360px; height:360px" src="`+datas.imglink+`" class="card-img" alt="...">
						  </div>
						  <div class="col-md-8">
							<div class="card-body">
							  <h5 class="card-title" id="title">`+datas.title+`</h5>
							  <p class="card-text" id="blogdesc">`+datas.blogdesc+`</p>
							  
							</div>
                            
						  </div>
                          <div style="padding-left:80%">
                          <button class="btn btn-primary btn-sm" type="button" id=`+datas._id+` onclick="editblog('${datas._id}')">Edit</button>
                          </div>
						</div>
                        </div>
                      </div>
                    `
                    }
                }
            }
        })
    })
}

/////////////////testimonial

if((window.location.href).indexOf("testimonials")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"https://jobportal-s38r.onrender.com/testimonials",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="404")console.log("404")//window.location.href="mainhome.html"
                if(err.status=="401") console.log("401")//window.location.href="post-job.html"
            },
            success:function(data){
                console.log(data)
                n=0
                for (var datas of data){
                    n=n+1
                    document.getElementById("testimonialpage").innerHTML+=` <div class="col-sm-4 mr-3 card">
                    <div class="candidates-are-sys m-b30">
                        <div class="candidates-bx">
                            <div class="testimonial-pic radius"><img src="`+datas.imglink+`" alt="" width="50" height="50"></div><br>
                            <div class="testimonial-text">
                                <p>`+datas.testimonial+`</p>
                            </div>
                            <div class="testimonial-detail"> <strong class="testimonial-name">`+datas.name+`</strong><span class="testimonial-position">`+datas.location+`</span>  </div>
                        </div>
                    </div>
        
                 </div>
                    `
                }
            }
        })
    })
}
