//accessToken = sessionStorage.getItem("accessToken");
//accessToken=""
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
console.log(accessToken,cookieuserId);
$("window").ready(async () => {
  var curr_url = window.location.href.split("/");
  curr_url = curr_url[curr_url.length - 1];
  if (curr_url == "mainhome.html") {
    curr_url = "";
    //accessToken = "";
    //sessionStorage.removeItem('accessToken')
  }
console.log(accessToken);
  $.ajax({
    url: "https://jobportalweb.onrender.com/" + curr_url,
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
    },

    success: function (req, res, data) {
      console.log(data);
      if (data.responseText == "destroy") {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        console.log(sessionStorage.getItem("accessToken"));
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 ; path='/Frontend'; domain=127.0.0.1";
        console.log(document.cookie);
        window.location.href = "mainhome.html";
      } else if (data.responseText == "clogin") {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Frontend;";
      }
    },
    error: function (error) {
      console.log(error);
     window.location.href = "error-404.html";
    },
  });
});

var curr_url = window.location.href.split("/");
curr_url = curr_url[curr_url.length - 1];

if (curr_url == "canprofile.html") {
  console.log(JSON.parse(sessionStorage.getItem('user')));
  $.ajax({
    url: "https://jobportalweb.onrender.com/" + curr_url,
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
      request.setRequestHeader("canid",JSON.parse(sessionStorage.getItem('user'))._id)
    },
    success:function(req,res,data){
      user = JSON.parse(data.responseText);
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
    // var user = JSON.parse(sessionStorage.getItem("user"));
    for(let i in user.skillset){
      console.log(user.skillset[i])
      document.querySelector('#skillbar').innerHTML+=`<small>${i}</small>
      <div class="progress mb-3" style="height: 5px">
        <div class="progress-bar bg-primary" role="progressbar" style="width: ${user.skillset[i]}0%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`
    }
    }
  })
  
}

function test_name(event){
  sessionStorage.setItem('currTest',event);
  window.location.href="test.html"
}
var score ={}
function submittest(){
  console.log(score);
  $.ajax({
    url: "https://jobportalweb.onrender.com/" + "scoreUpdate",
    type: "POST",
    beforeSend: function (request) {
      request.setRequestHeader("authorization", "Bearer " + accessToken);
    },
    contentType: "application/json",
    data: JSON.stringify({
      cand_id:JSON.parse(sessionStorage.getItem('user'))._id ,
      test_name : sessionStorage.getItem('currTest'),
      ans : score 
    }),
    success: function (req, res, data) {
      window.location.href="canprofile.html"
    },
    error: function (error) {
    },
  });
}

function scoreup(val,id){
  score[id]=val;
}

if(window.location.href.indexOf("test.html")>=0){
  console.log(sessionStorage.getItem('currTest'))
  $(document).ready(function(){
      $.ajax({
          type:"GET",
          url:"https://jobportalweb.onrender.com/"+"test",
          beforeSend: function (request) {
            request.setRequestHeader("authorization", "Bearer " + accessToken);
            request.setRequestHeader("name",sessionStorage.getItem('currTest'));
          },
          error:(err,data)=>{
              // if(err.status=="404")window.location.href="mainhome.html"
              // if(err.status=="401")window.location.href="post-job.html"
          },
          success:(data)=>{
              console.log(data)
             // data = JSON.parse(data)
              console.log("ppl");
              $("#testname").html("Python"+" Test")
              i=0
              for(question of data){
                  i+=1
                  ch=i.toString()
                  console.log(ch)
                  document.getElementById("questions").innerHTML+=`<div class="card" >
                  <div class="card-header">
                      <p><b>Question ${i}:</b>${question.que_str}</p>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item"><input type="radio" class="mr-3" name="q1${i}" value="op1" onclick="scoreup(this.value,'${question._id}')" id="q1${i}a">
                          <label for="q1${i}a"> ${question.options[0]}</label><br>
                      </li>
                      <li class="list-group-item"><input type="radio" class="mr-3" name="q1${i}" value="op2" onclick="scoreup(this.value,'${question._id}')" id="q1${i}b">
                          <label for="q1${i}b"> ${question.options[1]}</label><br>
                      </li>
                      <li class="list-group-item"><input type="radio" class="mr-3" name="q1${i}" value="op3" onclick="scoreup(this.value,'${question._id}')" id="q1${i}c">
                          <label for="q1${i}c"> ${question.options[2]}</label><br>
                      </li>
                      <li class="list-group-item"><input type="radio" class="mr-3" name="q1${i}" value="op4" onclick="scoreup(this.value,'${question._id}')" id="q1${i}d">
                          <label for="q1${i}d"> ${question.options[3]}</label><br>
                      </li>
                  </ul>
              
  
              </div>`
              }
          }
      })
  })
}


if(window.location.href.indexOf('testpage.html')>=0){
  $("window").ready(async () => {
    $.ajax({
      url: "https://jobportalweb.onrender.com/" + "testpagerender",
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
      },
      success: function (req, res, data) {
        console.log(data);
        for(let i=0;i<data.responseJSON.length;i++){
          console.log(1);
          document.querySelector('#render_test').innerHTML+=`<div class="features-wrap">
          <div class="feature is-revealing" data-sr-id="8" style="visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 1s cubic-bezier(0.5, -0.01, 0, 1.005) 0s, transform 1s cubic-bezier(0.5, -0.01, 0, 1.005) 0s;">
             <a onclick="test_name('${data.responseJSON[i]}')"> <div class="feature-inner">
                  <div class="feature-icon">
                      <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                              <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="feature-1-a">
                                  <stop stop-color="#007CFE" stop-opacity="0" offset="0%"/>
                                  <stop stop-color="#007DFF" offset="100%"/>
                              </linearGradient>
                              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="feature-1-b">
                                  <stop stop-color="#FF4F7A" stop-opacity="0" offset="0%"/>
                                  <stop stop-color="#FF4F7A" offset="100%"/>
                              </linearGradient>
                          </defs>
                          <g fill="none" fill-rule="evenodd">
                              <path d="M8 0h24v24a8 8 0 0 1-8 8H0V8a8 8 0 0 1 8-8z" fill="url(#feature-1-a)"/>
                              <path d="M48 16v24a8 8 0 0 1-8 8H16c0-17.673 14.327-32 32-32z" fill="url(#feature-1-b)"/>
                          </g>
                      </svg>
                  </div>
                  <h4 class="feature-title h3-mobile">${data.responseJSON[i]}</h4>
                  <p class="text-sm">A pseudo-Latin text used in web design, layout, and printing in place of English to emphasise design elements.</p>
              </div></a>
          </div>
      </div>`
      console.log(document.querySelector('#render_test')  );
        }
        
      },
      error: function (error) {
      },
    });
  })
}


