var curr_url = window.location.href.split("/");
curr_url = curr_url[curr_url.length - 1];
accessToken = sessionStorage.getItem("accessToken");
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
var user = JSON.parse(sessionStorage.getItem("user"));

if (window.location.href.indexOf("browse-job.html") >= 0) {
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:8002/" + curr_url,
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
        request.setRequestHeader("rec_id", cookieuserId);
      },
      success: async function (req, res, data) {
        var job_obj = await JSON.parse(data.responseText);
        console.log(job_obj);
        var user = JSON.parse(sessionStorage.getItem("user"));
        $("#profiless").html(user.name)
        var html_obj = $("#manual");
        let count = 0;
        var str_ = "";
        while (job_obj[count] != undefined) {
          str_ += `<li class="parts">
                <a>
                    <div class="d-flex m-b30">
                        <div class="job-post-company">
                            <span><img src="images/logo/icon1.png"/></span>
                        </div>
                        <div class="job-post-info">
                            <h4>${job_obj[count].name}</h4>
                            <ul>
                                <li><i class="fa fa-map-marker"></i>${job_obj[count].location}</li>
                                <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                                <li><i class="fa fa-clock-o"></i> ${job_obj[count].createdAt}/li>
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
                                `;
          str = "";
          job_obj[count].skills.forEach((ele) => {
            str += ` <li><i class=""> ${ele}</i></li>`;
          });
          str_ += str;
          str_ += `</ul>
                                </span>
                        </div>
                        <div class="salary-bx">
                            <span>$ ${job_obj[count].salary}</span>
                        </div>
                      <div class="clearfix m-b30" style="padding-right: 10px; margin-left:20px">
										<button class="btn btn-primary type="button" manclass" onclick="JobApply('${job_obj[count].createdAt}')">Apply</button>
									</div>
                    </div></a>
									
            </li>`;

          count++;
        }
        document.querySelector("#manual").innerHTML += str_;
      },
      error: function (error) {
        console.log(error);
        // window.location.href = "error-404.html";
      },
    });
  });
}

if (window.location.href.indexOf("empprofile.html") >= 0) {
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:8002/" + curr_url,
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
        request.setRequestHeader("rec_id", cookieuserId);
      },

      success: async function (req, res, data) {
        var job_obj = await JSON.parse(data.responseText);
        console.log(job_obj);
        var user = JSON.parse(sessionStorage.getItem("user"));
        var html_obj = $("#manual");
        console.log(html_obj);
        let count = 0;
        var str_ = "";
        while (job_obj[count] != undefined) {
          console.log(job_obj[count].name);
          str_ += `<li class="parts">
                <a>
                    <div class="d-flex m-b30">
                        <div class="job-post-company">
                            <span><img src="images/logo/icon1.png"/></span>
                        </div>
                        <div class="job-post-info">
                            <h4>${job_obj[count].name}</h4>
                            <ul>
                                <li><i class="fa fa-map-marker"></i>${job_obj[count].location}</li>
                                <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                                <li><i class="fa fa-clock-o"></i> ${job_obj[count].createdAt}/li>
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
                                `;
          str = "";
          job_obj[count].skills.forEach((ele) => {
            str += ` <li><i class=""> ${ele}</i></li>`;
          });
          str_ += str;
          str_ += `</ul>
                                </span>
                        </div>
                        <div class="salary-bx">
                            <span>$ ${job_obj[count].salary}</span>
                        </div>
                      <div class="clearfix m-b30" style="padding-right: 10px; margin-left:20px">
										<button class="btn btn-primary type="button" manclass" onclick="BrowseCandidate('${job_obj[count]._id}')">See Candidates</button>
                    
									</div>
                    </div>
                    <span class="post-like fa fa-heart-o"></span>
               
               
          </a>
									
            </li>`;

          count++;
        }
        document.querySelector("#manual").innerHTML += str_;
      },
      error: function (error) {
        console.log(error);
        // window.location.href = "error-404.html";
      },
    });
  });
}

function BrowseCandidate(event) {
  console.log(event);
  $.ajax({
    url: "http://localhost:8002/" + "job-data-applied",
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
      request.setRequestHeader("_id", event);
    },

    success: function (req, res, data) {
      sessionStorage.setItem("currentJob", data.responseText);
      sessionStorage.setItem("currJobId", event);
      console.log(data.responseText);
      window.location.href = "browse-candidates.html";
    },
    error: function (error) {
      console.log(error);
      // window.location.href = "error-404.html";
    },
  });
}

if (window.location.href.indexOf("browse-candidates.html") >= 0) {
  $(document).ready(function () {
    //
    $.ajax({
      url: "http://localhost:8002/" + "job-dataId",
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
        request.setRequestHeader("_id", sessionStorage.getItem("currJobId"));
      },

      success: function (req, res, data) {
        var accept_arr = JSON.parse(data.responseText).accepted;
        var rejected_arr = JSON.parse(data.responseText).rejected;
        var can_obj = JSON.parse(sessionStorage.getItem("currentJob"), 900);
        var html_obj = $("#Candidates_job_id");
        let count = 0;
        var str = "";
        while (can_obj[count] != undefined) {
          str += ` <li class="liC">
          
									<a onclick="fun('${can_obj[count]._id}')">
										<div class="d-flex m-b30">
											<div class="job-post-company">
												<span><img src="images/testimonials/pic1.jpg"/></span>
											</div>
											<div class="job-post-info">
												<h4 >${can_obj[count].name}</h4>     
                        
												<ul>
													<li class="loc-feild"><i class="fa fa-map-marker"></i>delhi</li>
													<li><i class="fa fa-usd"></i> Full Time</li>
                          <li><i class="fa fa-usd"></i> ${can_obj[count].email}</li>
												</ul>
											</div>
										</div>
										<div class="d-flex">
											<div class="job-time mr-auto">
												<span>Javascript</span>
												<span>CSS</span>
												<span>HTML</span>
												<span>Bootstrap</span>
										</div>
                    `;

          if (
            !accept_arr.includes(can_obj[count]._id) &&
            !rejected_arr.includes(can_obj[count]._id)
          ) {
            console.log("56o");
            str += `<div class="salary-bx">
                      <button class="btn btn-danger" type="button"  onclick="CandidateReject('${
                        can_obj[count]._id
                      }','${sessionStorage.getItem(
              "currJobId"
            )}')">REJECT</button>
                      <button class="btn btn-success" type="button"  onclick="CandidateAccept('${
                        can_obj[count]._id
                      }','${sessionStorage.getItem(
              "currJobId"
            )}')">GIVE OFFER</button>
            `;
            str += `</div>
										</div>
                    <h6>status: </h6><span><button class="btn btn-warning" >PENDING</button></span>
									</a>
								</li>`;
          } else if (accept_arr.includes(can_obj[count]._id)) {
            console.log("56");
            str += `<div class="salary-bx">
                      <button class="btn btn-danger" type="button"  onclick="CandidateReject('${
                        can_obj[count]._id
                      }','${sessionStorage.getItem(
              "currJobId"
            )}')">REJECT</button>`;
            str += `</div>
            
										</div>
                    <p>STATUS</p>
                    <h6>status: </h6><span><button class="btn btn-success" >OFFERED</button></span>
                    
									</a>
                  
								</li>
               `;
          } else {
            console.log("popp");
            str += `<button class="btn btn-success" type="button"  onclick="CandidateAccept('${
              can_obj[count]._id
            }','${sessionStorage.getItem("currJobId")}')">GIVE OFFER</button>`;
            str += `</div>
										</div>
                    <h6>status: </h6><span><button class="btn btn-danger" >REJECTED</button></span>


									</a>
								</li>`;
          }

          count++;
        }
        document.querySelector("#Candidates_job_id").innerHTML += str;
      },
      error: function (error) {
        console.log(error);
        // window.location.href = "error-404.html";
      },
    });

    //
  });
}


function fun(obj){
  $.ajax({
    url: "http://localhost:8002/" + "candDetail",
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
      request.setRequestHeader("id", obj);
    },
    success: function (req, res, data) {
      sessionStorage.setItem('currApplicant',JSON.stringify(data.responseJSON))
      window.location.href="applicant.html"
    },
    error: function (error) {
      console.log(error);
      // window.location.href = "error-404.html";
    },
  });
}

if(window.location.href.indexOf('applicant')>=0){
  var user = JSON.parse(sessionStorage.getItem('currApplicant'))
  var job_id = sessionStorage.getItem('currJobId')
  console.log(job_id);
  console.log(user);
    //document.querySelector('#profile').innerText = user.name 
    $(document).ready(function () {
    $.ajax({
      url: "http://localhost:8002/" + "resumeDB",
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("canid", user._id);
        request.setRequestHeader("jobid", job_id);
      },
      success: function (req, res, data) {
        var data = JSON.parse(data.responseText)
        console.log(data);
        if(data){
          document.querySelector('#resumed').href=data[0]
        }
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
        for(let i in user.skillset){
          console.log(user.skillset[i])
          document.querySelector('#skillbar').innerHTML+=`<small>${i}</small>
          <div class="progress mb-3" style="height: 5px">
            <div class="progress-bar bg-primary" role="progressbar" style="width: ${user.skillset[i]}0%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div>`
        }
        console.log(user.status[job_id]);
        if(data[1][job_id] == 0){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
        else if(data[1][job_id] == 1)
        {
          document.querySelector('.shortlist').style.display="block"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
        else if(data[1][job_id] == 2){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="block"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
        else if(data[1][job_id] == 3){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="block"
          document.querySelector('.offer').style.display="none"
        }
        else if(data[1][job_id] == 4){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="block"
        }
        else{
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
      },
      error: function (error) {
        console.log(error);
        // window.location.href = "error-404.html";
        
      },
    });
  })
   
}

function updateJobStatus(event){
  var user = JSON.parse(sessionStorage.getItem('currApplicant'))
  var job_id = sessionStorage.getItem('currJobId')
  $.ajax({
    url: "http://localhost:8002/" + "updateJobStatus",
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
      request.setRequestHeader("canId", user._id);
      request.setRequestHeader("jobId", job_id);
      request.setRequestHeader("status", event);
    },
    success: function (req, res, data) {
      //sessionStorage.setItem('currApplicant',JSON.stringify(data.responseJSON))
      window.location.href="applicant.html"
    },
    error: function (error) {
      console.log(error);
      // window.location.href = "error-404.html";
    },
  });
}
function CandidateAccept(cand_obj, job_id) {
  $.ajax({
    url: "http://localhost:8002/" + "jobOffered",
    type: "POST",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
    },
    contentType: "application/json",
    data: JSON.stringify({
      cand_id: cand_obj,
      job_id: job_id,
    }),
    success: function (req, res, data) {
      console.log(data.responseText);
      window.location.href="browse-candidates.html"
    },
    error: function (error) {
      console.log(error);
      // window.location.href = "error-404.html";
    },
  });
}

function CandidateReject(cand_obj, job_id) {
  console.log("hi");
  $.ajax({
    url: "http://localhost:8002/" + "jobRejected",
    type: "POST",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
    },
    contentType: "application/json",
    data: JSON.stringify({
      cand_id: cand_obj,
      job_id: job_id,
    }),
    success: function (req, res, data) {
      console.log(data.responseText);
      window.location.href="browse-candidates.html"
    },
    error: function (error) {
      console.log(error);
      // window.location.href = "error-404.html";
    },
  });
}
function JobApply(event) {
  console.log(event);
  $.ajax({
    url: "http://localhost:8002/" + "job-data",
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
      request.setRequestHeader("time", event);
    },

    success: function (req, res, data) {
      sessionStorage.setItem("currentJob", data.responseText);
      
      // console.log(JSON.parse(data.responseText));
      window.location.href = "job-detail.html";
    },
    error: function (error) {
      console.log(error);
      // window.location.href = "error-404.html";
    },
  });
}

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
if(window.location.href.indexOf("companies.html")>=0){
  if (curr_url.indexOf("companies.html")>=0) {
    console.log("helloworld")
    $.ajax({
      url: "http://localhost:8002/companies",
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
        request.setRequestHeader("canid",JSON.parse(sessionStorage.getItem('user'))._id)
      },
      success:function(req,res,data){
        data=JSON.parse(data.responseText)
        copy=data
        console.log(data)
        
        jobs=data[1]
        data=data[0]
        $("#count").html(Object.keys(data).length+`+ Companies  waiting for you`)
        for(i in data){
          document.getElementById("companiess").innerHTML+=`<a href="companydes.html">
                                                              <div class="col-lg-3 col-md-6 col-sm-6">
                                                                <div class="icon-bx-wraper">
                                                                  <div class="icon-content">
                                                                    <div class="icon-md text-primary m-b20"><img src="`+images[i]+`" alt="asdgh"></div>
                                                                    
                                                                    <a  class="dez-tilte" href="#section2"><button class="btn btn-primary" id=`+i+` onclick='companydetails(`+JSON.stringify(copy)+`)'>`+i+`</button></a>
                                                                    <p class="m-a0">`+data[i]+` Jobs available</p>
                                                                  </div>
                                                                </div>				
                                                              </div>
                                                            </a>`
        }        
      }
    })
  }
}

function companydetails(data){
  company=event.target.id
  copy=data[2]
  noofrec=0
  counts=data[0]
  data=data[1]
  document.getElementById("afterclick").innerHTML=`<div class="container">
                                                      <div class="row">
                                                        <div class="col-lg-4">
                                                          <div class="sticky-top">
                                                            <div class="row">
                                                              <div class="col-lg-12 col-md-6">
                                                                <div class="m-b30">
                                                                  <img src="`+images[event.target.id]+`" alt="" id="jobdetaillogo">
                                                                </div>
                                                              </div>
                                                              <div class="col-lg-12 col-md-6">
                                                                <div class="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                                                                  <h4 class="text-black font-weight-700 p-t10 m-b15 render">Company Details</h4>
                                                                  <ul>
                                                                    <li><i class="ti-wallet"></i><strong class="font-weight-700 text-black">Jobs
                                                                        posted</strong> <span class="render"></span> `+counts[event.target.id]+`</li>
                                                                    <li><i class="ti-shield"></i><strong
                                                                        class="font-weight-700 text-black">Experience</strong> <span
                                                                        class="render"></span>10 Years of Experience</li>
                                                                    <li><strong class="font-weight-700 text-black">Category:</strong> Software
                                                                    </li>
                                                                    <li><strong class="font-weight-700 text-black">No of Recruiters</strong>`+copy[event.target.id]+`
                                                                    </li>
                                                                  </ul>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div id="section2" class="col-lg-8">
                                                          <div class="job-info-box">
                                                            <h3 class="m-t0 m-b10 font-weight-700 title-head">
                                                              <a  href="#" class="text-secondry m-r30"><span class="render"></span></a>
                                                            </h3>
                                                            <p class="p-t20"></p>
                                                            <h5 class="font-weight-600">Jobs posted</h5>
                                                            <div class="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                                                            <p class="render"></p>
                                                            <!-- <h5 class="font-weight-600">Job Requirements</h5>
                                                          <div class="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                                                          <p class="render"></p> -->
                                                            <div class="container">
                                                              <ul class="post-job-bx" id="manual">
                                                              </ul>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>`
  let count = 0;
  var str_ = "";
  company=event.target.id
  {
    jobslist=data[company]
    for(job_obj of jobslist[0]){
      str_ += `<li class="parts">
            <a>
                <div class="d-flex m-b30">
                    <div class="job-post-company">
                        <span><img src="images/logo/icon1.png"/></span>
                    </div>
                    <div class="job-post-info">
                        <h4>${job_obj.name}</h4>
                        <ul>
                            <li><i class="fa fa-map-marker"></i>${job_obj.location}</li>
                            <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                            <li><i class="fa fa-clock-o"></i> ${job_obj.createdAt}/li>
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
                            `;
      str = "";
      job_obj.skills.forEach((ele) => {
        str += ` <li><i class=""> ${ele}</i></li>`;
      });
      str_ += str;
      str_ += `</ul>
                            </span>
                    </div>
                    <div class="salary-bx">
                        <span>$ ${job_obj.salary}</span>
                    </div>
                  <div class="clearfix m-b30" style="padding-right: 10px; margin-left:20px">
                <button class="btn btn-primary type="button" manclass" onclick="JobApply('${job_obj.createdAt}')">Apply</button>
              </div>
                </div></a>
              
        </li>`;

      count++;      
    }
    
  }
  document.querySelector("#manual").innerHTML = str_;

}





function JobWithDraw(event) {
  //job-del
  $.ajax({
    url: "http://localhost:8002/" + "job-del",
    type: "POST",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
    },
    contentType: "application/json",
    data: JSON.stringify({
      cand_id: user._id,
      job_id: event,
    }),
    success: function (req, res, data) {
      console.log("done");
      window.location.href = "jobsapplied.html";
    },
    error: function (error) {
      console.log(error);
      console.log(90);
      //window.location.href = "error-404.html";
    },
  });
}

if (window.location.href.indexOf("job-detail") >= 0) {
  var job = JSON.parse(sessionStorage.getItem("currentJob"));
  $(document).ready(function(){
    var user = JSON.parse(sessionStorage.getItem('user'))
    var job_id = sessionStorage.getItem('currJobId')
    document.querySelector('#jobId').value = job._id
    document.querySelector('#canId').value = user._id 
    console.log(user,user._id,"pop");
  })
  console.log(job);
  var render_obj = $(".render");
  render_obj[0].innerHTML = job.name;
  render_obj[1].innerHTML = job.location;
  render_obj[2].innerHTML = job.salary;
  render_obj[3].innerHTML = job.Experience;
  render_obj[4].innerHTML = job.name;
  render_obj[5].innerHTML = job.location;
  render_obj[6].innerHTML = job.jobDescription;
  render_obj[7].innerHTML = "";
  job.skills.forEach((ele) => {
    render_obj[7].innerHTML += ele + " ";
  });
  // $(document).ready(function(){
  //   var user = JSON.parse(sessionStorage.getItem('user'))
  //       document.querySelector('#canId').value=user._id,
  //   document.querySelector('#jobId').value = job._id
  // }
  // )
  function applyJob() {
    $.ajax({
      url: "http://localhost:8002/" + "job-detail.html",
      type: "POST",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + accessToken);
      },
      contentType: "application/json",
      data: JSON.stringify({
        course_id: job._id,
        cand_id: user._id,
      }),
      success: function (req, res, data) {
        if (!data) {
          window.location.href = "www.google.com";
        } else {
          alert("job added successful");
          // window.location.href = "http://127.0.0.1:5501/Frontend/postJob.html"
        }
      },
    });
  }
}

// $(document).ready(function(){
//   $("#formdata").submit(function(){
//       var data = new FormData($('#formdata')[0]);
//       $.ajax({
//           url:'http://localhost:8002/resumeDB',
//           type: 'POST',
//           contentType: false,
//           processData: false,
//           enctype:"multipart/form-data",
//           cache: false,
//           data: data,
//           error: function(){
//               alert('Error: In sending the request!');
//           },
//           success:(data)=>{
//             console.log(data)
//           }
//       })
//   })
// })
function detailJob(event){
  sessionStorage.setItem('detailjob',event)
  window.location.href="detailjob.html"
}


if(window.location.href.indexOf("detailjob.html")>=0){
  //console.log("fun");
  console.log(JSON.parse(sessionStorage.getItem('user'))._id);
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:8002/" + "job-detail.html",
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
        request.setRequestHeader("jobid", sessionStorage.getItem('detailjob'));
        request.setRequestHeader("canid", JSON.parse(sessionStorage.getItem('user'))._id);
      },
      success: function(req,res,data){

        var job = JSON.parse(data.responseText)[0]
        console.log(job);
        var render_obj = $(".render");
        render_obj[0].innerHTML = job.name;
        render_obj[1].innerHTML = job.location;
        render_obj[2].innerHTML = job.salary;
        render_obj[3].innerHTML = job.Experience;
        render_obj[4].innerHTML = job.name;
        render_obj[5].innerHTML = job.location;
        render_obj[6].innerHTML = job.jobDescription;
        render_obj[7].innerHTML = "";
        job.skills.forEach((ele) => {
          render_obj[7].innerHTML += ele + " ";
        });
        var user = JSON.parse(sessionStorage.getItem('user'))
        var status = JSON.parse(data.responseText)[1]
        console.log(status[job._id]);
        if(status[job._id] == 0){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
        else if(status[job._id] == 1)
        {
          document.querySelector('.shortlist').style.display="block"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
        else if(status[job._id] == 2){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="block"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
        else if(status[job._id] == 3){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="block"
          document.querySelector('.offer').style.display="none"
        }
        else if(status[job._id] == 4){
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="block"
        }
        else{
          document.querySelector('.shortlist').style.display="none"
          document.querySelector('.exam').style.display="none"
          document.querySelector('.interview').style.display="none"
          document.querySelector('.offer').style.display="none"
        }
      }
    })
    })


}


if (window.location.href.indexOf("jobsapplied.html") >= 0) {
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:8002/" + curr_url,
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
        request.setRequestHeader("rec_id", user._id);
      },

      success: async function (req, res, data) {
        var job_obj = await JSON.parse(data.responseText);
        console.log(job_obj);
        var user = JSON.parse(sessionStorage.getItem("user"));
        var html_obj = $("#manual");
        console.log(html_obj);
        let count = 0;
        var str_ = "";
        while (job_obj[count] != undefined) {
          console.log(job_obj[count].name);
          str_ += `<a ><li class="parts">
                  
                      <div class="d-flex m-b30">
                          <div class="job-post-company">
                              <span><img src="images/logo/icon1.png"/></span>
                          </div>
                          <div class="job-post-info">
                              <h4 onclick="detailJob('${job_obj[count]._id}')">${job_obj[count].name}</h4>
                              <ul>
                                  <li><i class="fa fa-map-marker"></i>${job_obj[count].location}</li>
                                  <li><i class="fa fa-bookmark-o"></i> Full Time</li>
                                  <li><i class="fa fa-clock-o"></i> ${job_obj[count].createdAt}/li>
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
                                  `;
          str = "";
          job_obj[count].skills.forEach((ele) => {
            str += ` <li><i class=""> ${ele}</i></li>`;
          });
          str_ += str;
          str_ += `</ul>
                                  </span>
                          </div>
                          <div class="salary-bx">
                              <span>$ ${job_obj[count].salary}</span>
                          </div>
                        <div class="clearfix m-b30" style="padding-right: 10px; margin-left:20px">
                        
                      <button class="btn btn-primary type="button" manclass" onclick="JobWithDraw('${job_obj[count]._id}')">With Draw</button>
                    </div>
                      </div>`
                      if(job_obj["accepted"].includes(job_obj[count]._id)){
                        str_+= `<h6>status: </h6><span><button class="btn btn-success" >OFFERED</button></span>`
                        }
                        else if(job_obj["rejected"].includes(job_obj[count]._id)){
                        str_+= `<h6>status: </h6><span><button class="btn btn-danger" >REJECTED</button></span>`
                        }
                        else{
                        str_+= `<h6>status: </h6><span><button class="btn btn-warning" >PENDING</button></span>`
                        
                        }
                        
                 
                 
                      
                    
             str_+= `</li></a>`;

          count++;
        }
        document.querySelector("#manual").innerHTML += str_;
      },
      error: function (error) {
        console.log(error);
        // window.location.href = "error-404.html";
      },
    });
  });
}
