

if(window.location.href.indexOf("submit-resume.html")>=0 ){
    $("window").ready(async () => {
    document.querySelector('#profile-email').value = JSON.parse(sessionStorage.getItem('user')).email
    })
}

function generateResume() {
    // Retrieve user input values from the form
    accessToken = sessionStorage.getItem('accessToken')
    var x = document.cookie 
  accessToken = x.split('=')[1]
    $.ajax({
        url:"https://jobportalweb.onrender.com/"+"resumeurl",
        type:'POST',
        contentType: "application/json",
        data : JSON.stringify({
            email:JSON.parse(sessionStorage.getItem('user')).email
       }),
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", accessToken);
          },
       
        success:function(req,res,data){
          console.log(data);

       




    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const address = document.getElementById("address").value;
    const profession = document.getElementById("profession").value;
    const currentLocation = document.getElementById("current-location").value;
    const picture = data.responseText;

    const experience1 = document.getElementById("experience1").value;
    const experience2 = document.getElementById("experience2").value;
    const experience3 = document.getElementById("experience3").value;


    const des1 = document.getElementById("des1").value;
    const des2 = document.getElementById("des2").value;
    const des3 = document.getElementById("des3").value;
    const des4 = document.getElementById("des4").value;
    const des5 = document.getElementById("des5").value;

    const graduation = document.getElementById("graduation").value;
    const school = document.getElementById("school").value;
    
    const minrate = document.getElementById("minrate").value;
    const category = document.getElementById("category").value;

    const resumecontent = document.getElementById("resumecontent").value;
    const skill1 = document.getElementById("skill1").value;
    const skill2 = document.getElementById("skill2").value;
    const skill3 = document.getElementById("skill3").value;
    const skill4 = document.getElementById("skill4").value;
    const skill5 = document.getElementById("skill5").value;
    const linkedin = document.getElementById("linkedin").value;
    const github = document.getElementById("github").value;
    const twitter = document.getElementById("twitter").value;
    const ho1 = document.getElementById("ho1").value;
    const ho2 = document.getElementById("ho2").value;
    const ho3 = document.getElementById("ho3").value;
    const ho4 = document.getElementById("ho4").value;
    const ho5 = document.getElementById("ho5").value;
  
    // Generate resume HTML document
    const resume = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    <style>

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap");

* {
margin: 0;
padding: 0;
box-sizing: border-box;
list-style: none;
font-family: "Montserrat", sans-serif;
}

body {
background: #585c68;
font-size: 14px;
line-height: 22px;
color: #555555;
}

.bold {
font-weight: 700;
font-size: 20px;
text-transform: uppercase;
}

.semi-bold {
font-weight: 500;
font-size: 16px;
}

.resume {
width: 800px;
height: auto;
display: flex;
margin: 50px auto;
}

.resume .resume_left {
width: 280px;
background: #7389c5;
}

.resume .resume_left .resume_profile {
width: 100%;
height: 280px;
}

.resume .resume_left .resume_profile img {
width: 100%;
height: 100%;
}

.resume .resume_left .resume_content {
padding: 0 25px;
}

.resume .title {
margin-bottom: 20px;
}

.resume .resume_left .bold {
color: #fff;
}

.resume .resume_left .regular {
color: #b1eaff;
}

.resume .resume_item {
padding: 25px 0;
border-bottom: 2px solid white;
}

.resume .resume_left .resume_item:last-child,
.resume .resume_right .resume_item:last-child {
border-bottom: 0px;
}

.resume .resume_left ul li {
display: flex;
margin-bottom: 10px;
align-items: center;
}

.resume .resume_left ul li:last-child {
margin-bottom: 0;
}

.resume .resume_left ul li .icon {
width: 35px;
height: 35px;
background: #fff;
color: #7389c5;
border-radius: 50%;
margin-right: 15px;
font-size: 16px;
position: relative;
}

.resume .icon i,
.resume .resume_right .resume_hobby ul li i {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

.resume .resume_left ul li .data {
color: white;
}

.resume .resume_left .resume_skills ul li {
display: flex;
margin-bottom: 10px;
color: white;
justify-content: space-between;
align-items: center;
}

.resume .resume_left .resume_skills ul li .skill_name {
width: 25%;
}

.resume .resume_left .resume_skills ul li .skill_progress {
width: 60%;
margin: 0 5px;
height: 5px;
background: #7389c5;
position: relative;
}

.resume .resume_left .resume_skills ul li .skill_per {
width: 15%;
}

.resume .resume_left .resume_skills ul li .skill_progress span {
position: absolute;
top: 0;
left: 0;
height: 100%;
background: #7389c5;
}

.resume .resume_left .resume_social .semi-bold {
color: #fff;
margin-bottom: 3px;
}

.resume .resume_right {
width: 520px;
background: #fff;
padding: 25px;
}

.resume .resume_right .bold {
color: #7389c5;
}

.resume .resume_right .resume_work ul,
.resume .resume_right .resume_education ul {
padding-left: 40px;
overflow: hidden;
}

.resume .resume_right ul li {
position: relative;
}

.resume .resume_right ul li .date {
font-size: 16px;
font-weight: 500;
margin-bottom: 15px;
}

.resume .resume_right ul li .info {
margin-bottom: 20px;
}

.resume .resume_right ul li:last-child .info {
margin-bottom: 0;
}

.resume .resume_right .resume_work ul li:before,
.resume .resume_right .resume_education ul li:before {
content: "";
position: absolute;
top: 5px;
left: -25px;
width: 6px;
height: 6px;
border-radius: 50%;
border: 2px solid #7389c5;
}

.resume .resume_right .resume_work ul li:after,
.resume .resume_right .resume_education ul li:after {
content: "";
position: absolute;
top: 14px;
left: -21px;
width: 2px;
height: 115px;
background: #7389c5;
}

    </style>
  
    </head>
    <body>
        <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
    
    <div class="resume">
       <div class="resume_left">
         <div class="resume_profile">
           <img src="`+picture+`" alt="profile_pic">
         </div>
         <div class="resume_content">
           <div class="resume_item resume_info">
             <div class="title">
               <p class="bold">`+name+`</p>
               <p class="regular">`+profession+`</p>
             </div>
             <ul>
               <li>
                 <div class="icon">
                   <i class="fas fa-map-signs"></i>
                 </div>
                 <div class="data">
                   `+address+` <br /> `+country+`
                 </div>
               </li>
               <li>
                 <div class="icon">
                   <i class="fas fa-mobile-alt"></i>
                 </div>
                 <div class="data">
                   `+phone+`
                 </div>
               </li>
               <li>
                 <div class="icon">
                   <i class="fas fa-envelope"></i>
                 </div>
                 <div class="data">
                   `+email+`
                 </div>
               </li>
             
             </ul>
           </div>
           <div class="resume_item resume_skills">
             <div class="title">
               <p class="bold">Skills</p>
             </div>
             <ul>
               <li>
                 <div class="skill_name">
                   `+skill1+`
                 </div>
                 
               </li>
               <li>
                 <div class="skill_name">
                 `+skill2+`
                 </div>
                
               </li>
               <li>
                 <div class="skill_name">
                 `+skill3+`
                 </div>
                 
               </li>
               <li>
                 <div class="skill_name">
                 `+skill4+`
                 </div>
               
               </li>
               <li>
                 <div class="skill_name">
                 `+skill5+`
                 </div>
               
               </li>
             </ul>
           </div>
           <div class="resume_item resume_social">
             <div class="title">
               <p class="bold">Social</p>
             </div>
             <ul>
               
               
               <li>
                 <div class="icon">
                   <i class="fab fa-twitter-square"></i>
                 </div>
                 <div class="data">
                   <p class="semi-bold">Twitter</p>
                   <p>`+twitter+`</p>
                 </div>
               </li>
               
               <li>
                 <div class="icon">
                   <i class="fab fa-linkedin"></i>
                 </div>
                 <div class="data">
                   <p class="semi-bold">Linkedin</p>
                   <p>`+linkedin+`</p>
                 </div>
               </li>
             </ul>
           </div>
         </div>
      </div>
      <div class="resume_right">
        <div class="resume_item resume_about">
            <div class="title">
               <p class="bold">About me</p>
             </div>
            <p>`+resumecontent+`</p>
             </div>
        <div class="resume_item resume_work">
            <div class="title">
               <p class="bold">Work Experience</p>
             </div>
            <ul>
                <li>
                    <div class="title">`+experience1+`</div> 
                    <div class="info">
                         <p class="semi-bold">`+des1+`</p> 
                    </div>
                </li>
                
                <li>
                    <div class="title">`+experience2+`</div> 
                    <div class="info">
                         <p class="semi-bold">`+des2+`</p> 
                    </div>
                </li>

                <li>
                    <div class="title">`+experience3+`</div> 
                    <div class="info">
                         <p class="semi-bold">`+des3+`</p> 
                    </div>
                </li>
               
            </ul>
        </div>
        <div class="resume_item resume_education">
          <div class="title">
               <p class="bold">Education</p>
             </div>
            <ul>

            <li>
                <div class="title">`+graduation+`</div> 
                <div class="info">
                    <p class="semi-bold">`+des4+`</p> 
                </div>
            </li>

            <li>
                <div class="title">`+school+`</div> 
                <div class="info">
                    <p class="semi-bold">`+des5+`</p> 
                </div>
            </li>
          
               
            </ul>
        </div>
        <div class="resume_item resume_hobby">
          <div class="title">
               <p class="bold">Hobbies</p>
             </div>
           <ul>
             <li>`+ho1+`</li>
             <li>`+ho2+`</li>
             <li>`+ho3+`</li>
             <li>`+ho4+`</li>
             <li>`+ho5+`</li>
          </ul>
        </div>
      </div>
    </div>

    <script>
    
    </script>
    </body>
    </html>
    `;
  
    // Create a Blob object to store the resume document
    const blob = new Blob([resume], { type: "text/html" });
  
    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}-Resume.html`;
    link.click();

}
})
  }
  