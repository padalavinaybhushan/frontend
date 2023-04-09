function delprofile(ev){
  console.log(event.target.id)
  userid=event.target.id.split(":")[0]
  type=event.target.id.split(":")[1]
  $.ajax({
    url:"https://jobportal-s38r.onrender.com/delprofile",
    type:"POST",
    contentType:"application/json",
    data:JSON.stringify({
      id:userid,
      type:type,
      disable:event.target.checked
    }),
    success:(data)=>{
      console.log(data)
    }
  })
  
}

$(document).ready(function(){
    $.ajax({
        url: "https://jobportal-s38r.onrender.com/" + "admin",
        type: "GET",
        success: function (req, res, data) {
            data = JSON.parse(data.responseText)
            i=0
            j=0
            console.log(data,7657865786)
            for(user of data["employee"]){
              if(user.disable){
                i+=1
                document.getElementById("candidate").innerHTML+=`<tr>
                <th scope="row">`+i+`</th>
                <td>`+user.name+`</td>
                <td>10</td>
                <td>7</td>
                <td>`+user.email+`</td>
                <td >
                  <button type="button" id="`+user._id+`" class="btn btn-primary btn-sm" onclick="genprofile()">Details</button>
                </td>
                <td class="pl-4">
                  <label class="switch">
                    <input id="`+user._id+`:`+user.type+`" type="checkbox" onclick="delprofile()" checked>
                        <span class="slider round"></span>
                </label>
                </td>
              </tr>`
            }
            else if(!user.disable){
                i+=1
                document.getElementById("candidate").innerHTML+=`<tr>
                <th scope="row">`+i+`</th>
                <td>`+user.name+`</td>
                <td>10</td>
                <td>7</td>
                <td>`+user.email+`</td>
                <td >
                  <button type="button" id="`+user._id+`" class="btn btn-primary btn-sm" onclick="genprofile()">Details</button>
                </td>
                <td class="pl-4">
                  <label class="switch">
                    <input id="`+user._id+`:`+user.type+`" type="checkbox" onclick="delprofile()">
                        <span class="slider round"></span>
                </label>
                </td>
              </tr>`
            }
                }
            for(user of data["recuiter"]){
              if(user.disable){
                j+=1
                document.getElementById("employer").innerHTML+=`<tr>
                <th scope="row">`+j+`</th>
                <td>`+user.name+`</td>
                <td>10</td>
                <td>7</td>
                <td>`+user.email+`</td>
                <td >
                <button type="button" id="`+user._id+`" class="btn btn-primary btn-sm" onclick="genprofile()">Details</button>
              </td>
              <td class="pl-5">
                <label class="switch">
                    <input id="`+user._id+`:`+user.type+`" onclick="delprofile()" checked>
                    <span class="slider round"></span>
                </label>
              </td>
              </tr>`
            }
            else if(!user.disable){
                j+=1
                document.getElementById("employer").innerHTML+=`<tr>
                <th scope="row">`+j+`</th>
                <td>`+user.name+`</td>
                <td>10</td>
                <td>7</td>
                <td>`+user.email+`</td>
                <td >
                <button type="button" id="`+user._id+`" class="btn btn-primary btn-sm" onclick="genprofile()">Details</button>
              </td>
              <td class="pl-5">
                <label class="switch">
                    <input id="`+user._id+`:`+user.type+`" onclick="delprofile()">
                    <span class="slider round"></span>
                </label>
              </td>
              </tr>`
            } 
          }
            $("#noe").html(j)
            $("#noc").html(i)
        },
        error: function (error) {
          console.log(error);
          // window.location.href = "error-404.html";
        },
      });
})



function genprofile(event,type){
    sessionStorage.setItem('currUser',event)
    if(type == "can")
    window.location.href = "adminprofilec.html"
    else
    window.location.href = "adminprofile.html"
}

if(window.location.href.indexOf('adminprofile')>=0){
    console.log(sessionStorage.getItem('currUser'));
    $(document).ready(function(){
        $.ajax({
            url:"https://jobportal-s38r.onrender.com/"+"AdmingetEmp",
            type:'GET',
            beforeSend: function(request) {
                request.setRequestHeader("_id",sessionStorage.getItem('currUser'))
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
                document.querySelector('#profile-pic').src='https://jobportal-s38r.onrender.com/'+user.profile
            },
            error: function (error) {
                console.log(error);
               window.location.href="error-404.html"
            }
        })        
    })
}

if(window.location.href.indexOf('adminprofile')>=0){
    console.log(sessionStorage.getItem('currUser'));
    $(document).ready(function(){
        $.ajax({
            url:"https://jobportal-s38r.onrender.com/"+"AdmingetCan",
            type:'GET',
            beforeSend: function(request) {
                request.setRequestHeader("_id",sessionStorage.getItem('currUser'))
              },
           
            success:function(req,res,data){
                console.log(data.responseText);
                user = JSON.parse(data.responseText)
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
  document.querySelector('#profile-pic').src='https://jobportal-s38r.onrender.com/'+user.profile
 // var user = JSON.parse(sessionStorage.getItem("user"));
 for(let i in user.skillset){
  console.log(user.skillset[i])
  document.querySelector('#skillbar').innerHTML+=`<small>${i}</small>
  <div class="progress mb-3" style="height: 5px">
    <div class="progress-bar bg-primary" role="progressbar" style="width: ${user.skillset[i]}0%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
  </div>`}
            },
            error: function (error) {
                console.log(error);
               window.location.href="error-404.html"
            }
        })        
    })
}

function edittests(event){
  console.log("lp");
  sessionStorage.setItem("testname",event)
  window.location.href="edittestpage.html"
}
if((window.location.href).indexOf("edittest.html")>=0){
  $(document).ready(function(){
      $.ajax({
          type:"GET",
          url:"https://jobportal-s38r.onrender.com/edittest",
          success:function(data){
              console.log(data)
              for(test of data){
                  console.log(test)
                  document.getElementById("render_test").innerHTML+=`
                  <div class="features-wrap">
                  <div class="feature is-revealing"  style="visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 1s cubic-bezier(0.5, -0.01, 0, 1.005) 0s, transform 1s cubic-bezier(0.5, -0.01, 0, 1.005) 0s;">
                      <div class="feature-inner">
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
                          <h4 class="feature-title h3-mobile"><button class="btn btn-light"  id="`+test+`" onclick="edittests('${test}')">`+test+`</button></h4>
                          <p class="text-sm">Edit `+test+` test here!</p>
                      </div>
                  </div>
              </div>
                  `
              }
          }
      })
  })
}

if((window.location.href).indexOf("edittestpage.html")>=0){
  $(document).ready(function(){
      $.ajax({
          type:"GET",
          url:"https://jobportal-s38r.onrender.com/edittestpage",
          headers:{
              testname:sessionStorage.getItem("testname")
          },
          error:function(err,data){
              // if(err.status=="404")window.location.href="mainhome.html"
              // if(err.status=="401")window.location.href="post-job.html"
          },
          success:function(req,res,data){
            console.log("pllp");
              data= data.responseJSON
              $("#testnames").html(sessionStorage.getItem("testname")+" test")
              sno=0
              for(question of data){
                  sno+=1
                  document.getElementById("questions").innerHTML+=`<div class="card">
                                                                      <br>
                                                                      <div class="row" > 
                                                                          <div class=" col-10 ml-1">
                                                                                  <strong >Question `+sno+`:</strong>`+question.que_str+`
                                                                          </div>
                                                                          <div class="col-1 ml-5" ><button type="button" class="btn btn-danger" id="`+sno+`" onclick="delquestion('${question._id}')">delete</button></div>
                                                                      </div>
                                                                      <br>
                                                                      <ul class="list-group list-group-flush">
                                                                          <li class="list-group-item">
                                                                              <label >A: `+question.options[0]+`</label><br>
                                                                          </li>
                                                                          <li class="list-group-item">
                                                                              <label >B: `+question.options[1]+`</label><br>
                                                                          </li>
                                                                          <li class="list-group-item">
                                                                              <label >C: `+question.options[2]+`</label><br>
                                                                          </li>
                                                                          <li class="list-group-item">
                                                                              <label >D: `+question.options[3]+`</label><br>
                                                                          </li>
                                                                      </ul>
                                                                  </div>
                                                                  <br>`
              }
          }
      })
  })
}

function delquestion(event){
  $.ajax({
    type: "POST",

    url: "https://jobportal-s38r.onrender.com/delquestion",

    contentType: "application/json",

    data: JSON.stringify({
      id:event
    }),
    success: function (data) {
        console.log(data)
    }
})
}

function addquestion() {
  console.log("hi");

  $.ajax({
    type: "POST",

    url: "https://jobportal-s38r.onrender.com/test/" + sessionStorage.getItem("testname"),

    contentType: "application/json",

    data: JSON.stringify({
      question: $("#question").val(),

      options: [$("#a").val(), $("#b").val(), $("#c").val(), $("#d").val()],

      ans: $("#ans").val(),
    }),

    success: function (data) {
      console.log(data);

      window.location.href = "addtest.html";
    },
  });
}

function addtest() {
  console.log("hi jkl");

  $.ajax({
    type: "POST",

    url: "http://localhost:8002/testname" ,

    contentType: "application/json",

    data: JSON.stringify({
      question: $("#question").val(),
      name:$("#testname").val(),
      options: [$("#a").val(), $("#b").val(), $("#c").val(), $("#d").val()],

      ans: $("#ans").val(),
    }),

    success: function (data) {
      console.log(data);

      //window.location.href = "addtest.html";
    },
  });
}
