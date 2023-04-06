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
      url: "https://jobportalweb.onrender.com/" + curr_url,
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
      url: "https://jobportalweb.onrender.com/" + curr_url,
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
    url: "https://jobportalweb.onrender.com/" + "job-data-applied",
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
      url: "https://jobportalweb.onrender.com/" + "job-dataId",
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
    url: "https://jobportalweb.onrender.com/" + "candDetail",
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
      url: "https://jobportalweb.onrender.com/" + "resumeDB",
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
    url: "https://jobportalweb.onrender.com/" + "updateJobStatus",
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
    url: "https://jobportalweb.onrender.com/" + "jobOffered",
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
    url: "https://jobportalweb.onrender.com/" + "jobRejected",
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
    url: "https://jobportalweb.onrender.com/" + "job-data",
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

function JobWithDraw(event) {
  //job-del
  console.log(event);
  $.ajax({
    url: "https://jobportalweb.onrender.com/" + "job-del",
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
  $(document).ready(function(){
    var user = JSON.parse(sessionStorage.getItem('user'))
        document.querySelector('#canId').value=user._id,
    document.querySelector('#jobId').value = job._id
  }
  )
  function applyJob() {
    $.ajax({
      url: "https://jobportalweb.onrender.com/" + "job-detail.html",
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

function detailJob(event){
  sessionStorage.setItem('detailjob',event)
  window.location.href="detailjob.html"
}


if(window.location.href.indexOf("detailjob.html")>=0){
  //console.log("fun");
  console.log(JSON.parse(sessionStorage.getItem('user'))._id);
  $(document).ready(function () {
    $.ajax({
      url: "https://jobportalweb.onrender.com/" + "job-detail.html",
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
      url: "https://jobportalweb.onrender.com/" + curr_url,
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
