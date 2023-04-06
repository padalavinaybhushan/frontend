$(document).ready(function () {
    const tem1 = document.querySelector(".filter-loc");
    const tem2 = document.querySelector(".filter-key");
  var filterfun = () => {
    const job_listt = document.querySelectorAll(".liC");
   
    console.log("pllll");
    for (let i = 0; i < job_listt.length; i++) {
      job_listt[i].style.display = "block";
    }
    let search_val1 = document.querySelector(".filter-key").value.toLowerCase();
    if (search_val1.length > 0) {
      for (let i = 0; i < job_listt.length; i++) {
        let bh = job_listt[i]
          .querySelector(".job-time")
          .querySelectorAll("span");
        let tar = "";
        bh.forEach((ele) => {
          tar += ele.innerText;
        });
        const src = tar.toLowerCase();
        if (src.indexOf(search_val1) < 0) {
          job_listt[i].style.display = "none";
        }
      }
    }
    let search_val2 = document.querySelector(".filter-loc").value.toLowerCase();
    if (search_val2.length > 0) {
      for (let i = 0; i < job_listt.length; i++) {
        const src = job_listt[i]
          .querySelector("a")
          .querySelector(".loc-feild")
          .textContent.toLowerCase();
        if (src.indexOf(search_val2) < 0) {
          job_listt[i].style.display = "none";
        }
      }
    }
  };
  tem1.addEventListener("keyup", filterfun);
  tem2.addEventListener("keyup", filterfun);
});
