

$(document).ready(function () {

const tem = document.querySelector(".filter-role");
console.log(tem);
tem.addEventListener("keyup",()=>{
    const job_list = document.querySelectorAll(".liC ");
    for(let i=0;i<job_list.length;i++){
            job_list[i].style.display = "block";
          
    } 
    //console.log("ppp");
    let search_val = document.querySelector(".filter-role").value.toLowerCase();
    console.log(search_val);
    console.log(job_list);
    for(let i=0;i<job_list.length;i++){
        console.log(1);
        const src = job_list[i].querySelector("a").querySelector(".d-flex .job-post-info h4").textContent.toLowerCase();
        if((src).indexOf(search_val)<0 ){
            job_list[i].style.display = "none";
        }
    } 
})
})
