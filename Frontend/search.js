images={
    amazon:"download/amazon.png",
    flipkart:"download/flipkart.png",
    adobe:"download/adobe.png",
    americanexpress:"download/american express.png",
    apple:"download/apple.png",
    att:"download/at&t.png",
    atlassian:"download/atlassian.png",
    campbell:"download/campbell.png",
    carmax:"download/carmax.png",
    chevron:"download/chevron.png",
    citi:"download/citi.png",
    cocacola:"download/cocacola.png",
    costco:"download/costco.png",
}
num={
    1:"One",
    2:"Two",
    3:"Three",
    4:"Four",
    5:"Five",
    6:"Six",
    7:"Seven",
    8:"Eight",
    9:"Nine",
    10:"Ten"
}
//test
function test(ev){
    console.log(event.target.innerHTML)
    sessionStorage.setItem("testname",event.target.innerHTML)
    window.location.href="test.html"
}
function submittest(){
    ans=[]
    for(var i=1;i<=10;i++){
        ans.push(document.querySelector(`${ch}box`).value)
    }
    console.log(ans)
    // $.ajax({
    //     type:"POST",
    //     url:"http://localhost:5000/skillupdate",
    //     contentType:"application/json",
    //     data:JSON.stringify({
    //         email:$("#email").val(),
    //         testname:sessionStorage.getItem("testname"),
    //         score:sessionStorage.getItem("score")
    //     }),
    //     success:function(data){
    //         console.log(data)
    //     }
    // })
}


if(window.location.href.indexOf("test.html")>=0){
    console.log("hii")
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/test/"+sessionStorage.getItem("testname"),
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:(err,data)=>{
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:(data)=>{
                console.log(data)
                $("#testname").html(sessionStorage.getItem("testname")+" Test")
                i=0
                for(question of data.qlist){
                    i+=1
                    ch=i.toString()
                    console.log(ch)
                    document.getElementById("questions").innerHTML+=`<div class="col-12">
                                                                        <p class="fw-bold">${ch}. Which of the following sentences is correct</p>
                                                                        <div> 
                                                                            <input type="radio" name="${ch}box" id="${ch}one"> 
                                                                            <input type="radio" name="${ch}box" id="${ch}two"> 
                                                                            <input type="radio" name="${ch}box" id="${ch}three">
                                                                            <input type="radio" name="${ch}box" id="${ch}four">
                                                                            <label for="${ch}one" class="box ${ch}first"> <div class="course"> <span class="circle"></span> <span class="subject"> When its raining ,people's umbrella are all you're going to see from above </span> </div> </label>
                                                                            <label for="${ch}two" class="box ${ch}second"> <div class="course"> <span class="circle"></span> <span class="subject"> When its raining,people's umbrella are all your going to see from above </span> </div> </label>
                                                                            <label for="${ch}three" class="box ${ch}third"> <div class="course"> <span class="circle"></span> <span class="subject"> When its raining,peoples umbrella's are all you're going to see from above </span> </div> </label>
                                                                            <label for="${ch}four" class="box ${ch}forth"> <div class="course"> <span class="circle"></span> <span class="subject"> None of the above </span> </div> </label>
                                                                        </div>
                                                                    </div>`
                }
            }
        })
    })
}

//post ajax callls
var email=""
var username=""
function erigisterajax(){
    $.ajax({
        type:"POST",
        url:"http://localhost:5000/erigister",
        contentType:"application/json",
        data:JSON.stringify({
            username:$("#username").val(),
            password:$("#password").val(),
            email:$("#email").val(),
            company:$("#company").val()
        }),
        success:function(data){
            window.location.href="elogin.html"
        }
    })
}
function crigisterajax(){
    $.ajax({
        type:"POST",
        url:"http://localhost:5000/crigister",

        contentType:"application/json",
        data:JSON.stringify({
            username:$("#username").val(),
            password:$("#password").val(),
            email:$("#email").val()
        }),
        success:function(data){
            window.location.href="clogin.html"
        }
    })
}
function postjobajax(){
    $.ajax({
        type:"POST",
        url:"http://localhost:5000/post-job",

        contentType:"application/json",
        data:JSON.stringify({
            jobname:$("#jobname").val(),
            jobdescription:$("#jobdesc").val(),
            location:$("#location").val(),
            experience:$("#experience").val(),
            skills:$("#skills").val(),
            jobreq:$("#jobreq").val(),
            salary:$("#salary").val(),
            email:sessionStorage.getItem("email")
        }),
        success:function(data){
            window.location.href="post-job.html"
            console.log(data)
        }
    })
}
function eloginajax(){
    $.ajax({
        type:"POST",
        url:"http://localhost:5000/elogin",
        contentType:"application/json",
        data:JSON.stringify({
            email:$("#email").val(),
            password:$("#password").val(),
        }),
        error:function(err,data){
            console.log(err,data)
        },
        success:function(data){
            if(data==""){
                console.log($("#email").val())
                console.log("user not exist")
                window.location.href="elogin.html"
            }
            else if(data=="wrong password"){
                console.log("wrong password")
                window.location.href="elogin.html"
            }
            else{
                sessionStorage.setItem("accessToken",data[0]);
                sessionStorage.setItem("email",data[1])
                window.location.href="post-job.html"
            }
        }
    })
}
function cloginajax(){
    $.ajax({
        type:"POST",
        url:"http://localhost:5000/clogin",
        contentType:"application/json",
        data:JSON.stringify({
            email:$("#email").val(),
            password:$("#password").val(),
        }),
        success:function(data){
            console.log("hii")
            if(data==""){
                console.log("user not exist")
                window.location.href="clogin.html"
            }
            else if(data=="wrong password"){
                console.log("wrong password")
                window.location.href="clogin.html"
            }
            else{
                sessionStorage.setItem("email",data[1])
                sessionStorage.setItem("accessToken",data[0]);
                window.location.href="browse-job.html"
            }
        }
    })
}




//get ajax callls
if((window.location.href).indexOf("mainhome")>=0){
    
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/mainhome",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="401")window.location.href="browse-job.html"
                if(err.status=="404")window.location.href="post-job.html"
            },
            success:function(data){
                console.log(data)
            }
        })
    })
}


if((window.location.href).indexOf("post-job")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/post-job",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="post-job.html"
                if(err.status=="401")window.location.href="browse-job.html"
                if(err.status=="405")window.location.href="mainhome.html"
               // window.location.href="mainhome.html"
            },
            success:function(data){
                $("#profile").html(`<i class="fa fa-user"></i> `+data)
            }
        })
    })
}

function savechangese(){
    $.ajax({
        type:"POST",
        url:"http://localhost:5000/eeprofile",
        headers:{
            "token":sessionStorage.getItem("accessToken"),
            email:sessionStorage.getItem("email")
        },
        contentType:"application/json",
        data:JSON.stringify({
            company:$("#company").val(),
            github:$("#github").val(),
            linkedin:$("#linkedin").val(),
            fullname:$("#fullname").val(),
            email:sessionStorage.getItem("email"),
            cemail:$("#email").val(),
            phone1:$("#phone1").val(),
            phone2:$("#phone2").val(),
            address:$("#address").val(),
            designation:$("#designation").val()
        }),
        error:function(err,data){
            if(err.status=="404")window.location.href="mainhome.html"
            if(err.status=="401")window.location.href="post-job.html"
        },
        success:function(data){
            console.log(data)
            window.location.href="empprofile.html"
        }
    })
}
if((window.location.href).indexOf("eeprofile")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/eeprofile",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="post-job.html"
                if(err.status=="401")window.location.href="browse-job.html"
                if(err.status=="405")window.location.href="mainhome.html"
            },
            success:function(data){
                $("#username").html(data.name)
                $("#username1").val(data.fullname)
                $("#email").val(data.email)
                $("#phone1").val(data.phone1)
                $("#phone2").val(data.phone2)
                $("#github").val(data.github)
                $("#linkedin").val(data.Linkedin)
                $("#company").val(data.company)                
                $("#designation").val(data.designation)
                $("#address").val(data.address)
                $("#address1").html(`<b>Address: </b>`+data.address)
                console.log(data)
            }
        })
    })
}
if((window.location.href).indexOf("applicantslist")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/applicantslist",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email"),
                jobid:sessionStorage.getItem("jobid")
            },
            error:function(err,data){
                if(err.status=="401")window.location.href="browse-job.html"
                if(err.status=="404")window.location.href="post-job.html"
                if(err.status=="405")window.location.href="mainhome.html"
            },
            success:function(users){
                sno=0
                for(user of users){
                    sno+=1
                    document.getElementById("applicants").innerHTML+=`<tr>
                                                        <td>`+sno+`</td>
                                                        <td><button class="btn btn-light" style="color:blue" type="button" id=`+user._id+` onclick="genprofile()">`+user.fullname+`</button></td>
                                                        <td>`+user.email+`</td>
                                                        <td>`+user.phone1+`<br>`+user.phone2+`</td>
                                                        <td style="width:25%"><button type="button" class="btn btn-primary mr-3 ml-3">shortlist</button><button type="button" class="btn btn-primary ml-3">Reject</button></td>
                                                    </tr>`
                }
            }
        })
    })
}
function genprofile(){
    console.log(event.target.id)
    sessionStorage.setItem("genprofile",event.target.id)
    window.location.href="genprofile.html"
}
if((window.location.href).indexOf("genprofile")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/genprofile",
            headers:{
                canid:sessionStorage.getItem("genprofile")
            },
            success:function(data){
                $("#username").html(data.name)
                $("#username1").html(data.fullname)
                $("#email").html(data.email)
                $("#phone1").html(data.phone1)
                $("#phone2").html(data.phone2)
                $("#github").html(data.github)
                $("#linkedin").html(data.Linkedin)
                $("#website").html(data.website)                
                $("#designation").html(`<b>Designation: </b>`+data.designation)
                $("#address").html(data.address)
                $("#address1").html(`<b>Address: </b>`+data.address)
            }
        })
    })
}
function applicants(ev){
    sessionStorage.setItem("jobid",event.target.id)
    window.location.href="applicantslist.html"

}
if((window.location.href).indexOf("empprofile")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/empprofile",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:function(err,data){
                if(err.status=="401")window.location.href="browse-job.html"
                if(err.status=="404")window.location.href="post-job.html"
                if(err.status=="405")window.location.href="mainhome.html"
            },
            success:function(data){
                datas=data[0]
                data=data[1]
                $("#username").html(data.name)
                $("#username1").html(data.fullname)
                $("#email").html(data.email)
                $("#company").html(data.company)
                $("#phone1").html(data.phone1)
                $("#phone2").html(data.phone2)
                $("#github").html(data.github)
                $("#linkedin").html(data.Linkedin)
                $("#website").html(data.website)                
                $("#designation").html(`<b>Designation: </b>`+data.designation)
                $("#address").html(data.address)
                $("#address1").html(`<b>Address: </b>`+data.address)
                for(var data of datas){
                    let skills=data.skillsrequired.split(",")
                    var skillsstr=""
                    for(var skill of skills){
                        skillsstr+=`<li><i class="">`+skill+`</i></li>`
                    }
                    document.getElementById("manual").innerHTML+=`<li class="parts" >
            <a>
                <div class="d-flex m-b30">
                    <div class="job-post-company">
                        <span><img src="images/logo/icon1.png"/></span>
                    </div>
                    <div class="job-post-info">
                        <h4>`+data["jobname"]+`</h4>
                        <ul>
                            <li><i class="fa fa-map-marker"></i>`+data["location"]+`</li>
                            <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                            <li><i class="fa fa-clock-o"></i> Published 11 months ago</li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="job-time mr-auto">
                        <span>
                            <b><i  class="d-flex" style="width: fit-content; color:blue">skills:</i></b>
                        </span>
                        <span>
                            <ul class="d-flex">
                                `+skillsstr+`
                            </ul>
                            </span>
                    </div>
                    
                    <div class="salary-bx">
                        <span>`+data["salary"]+`</span>
                        <br>
                        <button class="btn btn-primary float-right" id="`+data._id+`" onclick="applicants()">Applicants List</button>

                        <br>
                    </div>
                </div>
                <span class="post-like fa fa-heart-o"></span>
                            </a>
        </li>`
                    
                }
                sessionStorage.removeItem("jobid")
            }
        })
    })
}
if((window.location.href).indexOf("elogin")>=0){
    
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/elogin",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="401")window.location.href="browse-job.html"
                if(err.status=="404")window.location.href="post-job.html"
            },
            success:function(datas){
                console.log(datas,"asdf")
                
            }
            
        })
    })
}
if((window.location.href).indexOf("erigister")>=0){
    
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/erigister",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="401")window.location.href="browse-job.html"
                if(err.status=="404")window.location.href="post-job.html"
            },
            success:function(data){
                console.log("hiihii")
                console.log(data)
            }
        })
    })
}
if((window.location.href).indexOf("crigister")>=0){
    
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/crigister",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="browse-job.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(data){
                console.log("hiihii")
                console.log(data)
            }
        })
    })
}
if((window.location.href).indexOf("clogin")>=0){
    
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/clogin",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="browse-job.html"
                if(err.status=="401")window.location.href="post-job.html"
                console.log(err,data)
            },
            success:function(data){
                console.log(data,089897)
            }
        })
    })
}
function applyjob(){
    console.log($("#file").val())
    $.ajax({
        type:"GET",
        url:"http://localhost:5000/applyjob",
        headers:{
            "token":sessionStorage.getItem("accessToken"),
            email:sessionStorage.getItem("email"),
            jobid:sessionStorage.getItem("jobid")
        },
        error:function(err,data){
            if(err.status=="404")window.location.href="mainhome.html"
            if(err.status=="401")window.location.href="post-job.html"
        },
        success:function(datas){
            console.log(datas)
            window.location.href="jobsapplied.html"
        }
    })
}
if((window.location.href).indexOf("job-detail.html")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/job-detail",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email"),
                jobid:sessionStorage.getItem("jobid")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(datas){
                var username=datas[0]
                $("#profile").html(`<i class="fa fa-user"></i>`+username)
                data=datas[1]
                document.getElementById("jobdesc").innerHTML=`<div class="section-full content-inner-1">
				<div class="container">
					<div class="row">
						<div class="col-lg-4">
							<div class="sticky-top">
								<div class="row">
									<div class="col-lg-12 col-md-6">
										<div class="m-b30">
											<img src="images/blog/grid/pic1.jpg" alt="">
										</div>
									</div>
									<div class="col-lg-12 col-md-6">
										<div class="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
											<h4 class="text-black font-weight-700 p-t10 m-b15">Job Details</h4>
											<ul>
												<li><i class="ti-location-pin"></i><strong class="font-weight-700 text-black">Address</strong><span class="text-black-light">`+data.location+`</span></li>
												<li><i class="ti-money"></i><strong class="font-weight-700 text-black">Salary</strong>`+data.salary+`</li>
												<li><i class="ti-shield"></i><strong class="font-weight-700 text-black">Experience</strong>`+data.experience+`</li>
											</ul>
										</div>
									</div>
								</div>
                            </div>
						</div>
						<div class="col-lg-8">
							<div class="job-info-box">
								<h3 class="m-t0 m-b10 font-weight-700 title-head">
									<a href="#" class="text-secondry m-r30">`+data.jobname+`</a>
								</h3>
								<ul class="job-info">
									<li><strong>Education</strong> Web Designer</li>
									<li><strong>Deadline:</strong> 25th January 2018</li>
									<li><i class="ti-location-pin text-black m-r5"></i> NewYark </li>
								</ul>
								<h5 class="font-weight-600">Job Description</h5>
								<div class="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
								<p>`+data.jobdescription+`</p>
                                <h5 class="font-weight-600">Job Requirements</h5>
								<div class="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
								<p>`+data.jobreq+`</p>
								<form style="display: flex;">
									
									<span class="custom-file">
									  <input type="file" class="custom-file-input" id="file" >
									  <label class="custom-file-label" for="file" style="width:80%">Choose Resume</label>
									</span>
									<button class="btn btn-primary" type="button" onclick="applyjob()">apply this job</button>
								  </form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br>`
            }
        })
    })
}
function jobdetails(ev){
    var target=event.target;
    console.log(target.id)
    sessionStorage.setItem("jobid",target.id)
    window.location.href="job-detail.html"
    
    
}
if((window.location.href).indexOf("browse-job")>=0){
    
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/browse-job",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(data){
                var username=data[1]
                $("#profile").html(`<i class="fa fa-user"></i> `+username)
                datas=data[0]
                for(var data of datas){
                    let skills=data.skillsrequired.split(",")
                    var skillsstr=""
                    for(var skill of skills){
                        skillsstr+=`<li><i class="">`+skill+`</i></li>`
                    }
                    document.getElementById("manual").innerHTML+=`<li class="parts">
            <a >
                <div class="d-flex m-b30">
                    <div class="job-post-company">
                        <span><img src="images/logo/icon1.png"/></span>
                    </div>
                    <div class="job-post-info">
                        <h4>`+data["jobname"]+`</h4>
                        <ul>
                            <li><i class="fa fa-map-marker"></i>`+data["location"]+`</li>
                            <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                            <li><i class="fa fa-clock-o"></i> Published 11 months ago</li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="job-time mr-auto">
                        <span>
                            <b><i  class="d-flex" style="width: fit-content; color:blue">skills:</i></b>
                        </span>
                        <span>
                            <ul class="d-flex">
                                `+skillsstr+`
                            </ul>
                            </span>
                    </div>
                    <div class="salary-bx">
                        <span>`+data["salary"]+`</span>
                        <br>
                        <button class="btn btn-primary float-right" id="`+data._id+`" onclick="jobdetails()">Job Details</button>

                        <br>
                    </div>
                </div>
                <span class="post-like fa fa-heart-o"></span>
            </a>
        </li>`
                }
                
            }
        })
    })
}

if((window.location.href).indexOf("companies")>=0){
    
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/companies",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(data){
                var company={}
                for(job of data){
                    if(!(job.company in company)){
                        company[job.company]=[job]
                    }
                    else{
                        company[job.company].push(job)
                    }
                }
                var j=0
                $.each(company,(key,value)=>{
                    
                        document.getElementById("accordion").innerHTML+=`<div class="card">
                    <div  class="card-header" id="heading`+num[j]+`">
                    <h5 class="mb-0">
                        <button  class="btn btn-link" data-toggle="collapse" data-target="#collapse`+num[j]+`" aria-expanded="true" aria-controls="collapse`+num[j]+`">
                        <img src=`+images[key]+` width="60" />

                        </button>
                    </h5>
                    </div>
                    <div id="collapse`+num[j]+`" class="collapse" aria-labelledby="heading`+num[j]+`" data-parent="#accordion">
                    <div style="text-align: left;" class="card-body">
                        <ul class="post-job-bx" id="`+key+`">`
                        for(job of value){
                            let skillstr=``
                            j+=1
                            for(skill of job.skillsrequired.split(',')){
                                skillstr+=`<li><i class="">`+skill+`</i></li>`
                            }        
                            document.getElementById(key).innerHTML+=`<li class="parts" id="parts" style:"width:80%">
                                <a>
                                    <div class="d-flex m-b30">
                                        <div class="job-post-company">
                                            <span><img src="images/logo/icon1.png"/></span>
                                        </div>
                                        <div class="job-post-info">
                                            <h4>`+job.jobname+`</h4>
                                            <ul>
                                                <li><i class="fa fa-map-marker"></i> `+job.location+`</li>
                                                <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                                                <li><i class="fa fa-clock-o"></i> Published 11 months ago</li>
                                            </ul>
                                            
                                    </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="job-time mr-auto">
                                            <span>
                                                <b><i  class="d-flex" style="width: fit-content; color:blue">skills:</i></b>
                                            </span>
                                            <span>
                                                <ul class="d-flex">
                                                `+skillstr+`
                                                </ul>
                                                </span>
                                        </div>
                                        <div class="salary-bx">
                                            <span>`+job.salary+`</span>
                                            <br>
                        <button class="btn btn-primary float-right" id="`+job._id+`" onclick="jobdetails()">Job Details</button>

                        <br>
                                        </div>
                                    </div>
                                    <span class="post-like fa fa-heart-o"></span>
                                </a>
                            </li>`}										
                        document.getElementById("accordion").innerHTML+=`</ul>
                    </div>
                    </div>
                </div>`
                    
                })
                j+=1
            }
        })
    })
}
function withdraw(ev){
    sessionStorage.setItem("jobid",event.target.id)
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/withdraw",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email"),
                jobid:sessionStorage.getItem("jobid")
                
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(jobs){
                sessionStorage.removeItem("jobid")
                window.location.reload();
                console.log(jobs)
            }
        })
    })
}
if((window.location.href).indexOf("jobsapplied")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/jobsapplied",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email"),
                jobid:sessionStorage.getItem("jobid")
                
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(jobs){
                for(var data of jobs){
                    let skills=data.skillsrequired.split(",")
                    var skillsstr=""
                    for(var skill of skills){
                        skillsstr+=`<li><i class="">`+skill+`</i></li>`
                    }
                    document.getElementById("manual").innerHTML+=`<li class="parts" >
            <a>
                <div class="d-flex m-b30">
                    <div class="job-post-company">
                        <span><img src="images/logo/icon1.png"/></span>
                    </div>
                    <div class="job-post-info">
                        <h4>`+data["jobname"]+`</h4>
                        <ul>
                            <li><i class="fa fa-map-marker"></i>`+data["location"]+`</li>
                            <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                            <li><i class="fa fa-clock-o"></i> Published 11 months ago</li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="job-time mr-auto">
                        <span>
                            <b><i  class="d-flex" style="width: fit-content; color:blue">skills:</i></b>
                        </span>
                        <span>
                            <ul class="d-flex">
                                `+skillsstr+`
                            </ul>
                            </span>
                    </div>
                    
                    <div class="salary-bx">
                        <span>`+data["salary"]+`</span>
                        <br>
                        <button class="btn btn-primary float-right" id="`+data._id+`" onclick="withdraw()">Withdraw application</button>

                        <br>
                    </div>
                </div>
                <span class="post-like fa fa-heart-o"></span>
                            </a>
        </li>`
                    
                }
                sessionStorage.removeItem("jobid")
            }
        })
    })
}
if((window.location.href).indexOf("submit-resume")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/submit-resume",
            headers:{
                "token":sessionStorage.getItem("accessToken")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(data){
                console.log("hii");
                console.log(data)
            }
        })
    })
}
function savechanges(){
    $.ajax({
        type:"POST",
        url:"http://localhost:5000/caneprofile",
        headers:{
            "token":sessionStorage.getItem("accessToken"),
            email:sessionStorage.getItem("email")
        },
        contentType:"application/json",
        data:JSON.stringify({
            website:$("#website").val(),
            github:$("#github").val(),
            linkedin:$("#Linkedin").val(),
            fullname:$("#username1").val(),
            email:sessionStorage.getItem("email"),
            cemail:$("#email").val(),
            phone1:$("#phone1").val(),
            phone2:$("#phone2").val(),
            address:$("#address").val(),
            designation:$("#designation").val()
        }),
        error:function(err,data){
            if(err.status=="404")window.location.href="mainhome.html"
            if(err.status=="401")window.location.href="post-job.html"
        },
        success:function(data){
            console.log(data)
            window.location.href="canprofile.html"
        }
    })
}
if((window.location.href).indexOf("canprofile")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/canprofile",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(data){
                $("#username").html(data.name)
                $("#username1").html(data.fullname)
                $("#email").html(data.email)
                $("#phone1").html(data.phone1)
                $("#phone2").html(data.phone2)
                $("#github").html(data.github)
                $("#linkedin").html(data.Linkedin)
                $("#website").html(data.website)                
                $("#designation").html(`<b>Designation: </b>`+data.designation)
                $("#address").html(data.address)
                $("#address1").html(`<b>Address: </b>`+data.address)
                console.log(data)
                for(skill of skillset){
                    document.getElementById("skillset").innerHTML+=`<small>`+skill.skill+`</small>
                                                                <div class="progress mb-3" style="height: 5px">
                                                                <div class="progress-bar bg-primary" role="progressbar" style="width: `+skill.score+`%" aria-valuenow="`+skill.score+`"
                                                                    aria-valuemin="0" aria-valuemax="`+skillset.length+`"></div>
                                                                </div>`
                }
            }
        })
    })
}
if((window.location.href).indexOf("caneprofile")>=0){
    $(document).ready(function(){
        $.ajax({
            type:"GET",
            url:"http://localhost:5000/caneprofile",
            headers:{
                "token":sessionStorage.getItem("accessToken"),
                email:sessionStorage.getItem("email")
            },
            error:function(err,data){
                if(err.status=="404")window.location.href="mainhome.html"
                if(err.status=="401")window.location.href="post-job.html"
            },
            success:function(data){
                $("#username").html(data.name)
                $("#username1").val(data.fullname)
                $("#email").val(data.email)
                $("#phone1").val(data.phone1)
                $("#phone2").val(data.phone2)
                $("#github").val(data.github)
                $("#Linkedin").val(data.Linkedin)
                $("#website").val(data.website)                
                $("#designation").val(data.designation)
                $("#address").val(data.address)
                $("#address1").html(`<b>Address: </b>`+data.address)
                console.log(data)
            }
        })
    })
}
function logout(){
    sessionStorage.removeItem("accessToken")
    window.location.href="mainhome.html"
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("jobid")
}
