//landmark

$(document).ready(function () {

    
})
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
function filter(){
  var location = document.querySelector('#landmark').value;
  var skill = document.querySelector('#searching').value;
  $.ajax({
      url: "http://localhost:8002/browse-job-filter",
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + accessToken);
        request.setRequestHeader("rec_id", cookieuserId);
        request.setRequestHeader("location", location);
        request.setRequestHeader("keyword", location);
        request.setRequestHeader("skill",skill)
        request.setRequestHeader("url",window.location.href)

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
        document.querySelector("#manual").innerHTML = str_;
      },
      error: function (error) {
        console.log(error);
      },
    });
}
