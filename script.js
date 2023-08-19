const ip = document.getElementById("ownIP");

$.get('https://ipinfo.io/json?token=dd07e6570548c8',function(response){
        console.log(response.ip);
        ip.innerHTML = `${response.ip}`;
        console.log(ip.textContent);
        // fetchAPIDetails(response.ip);
    },"json");

const button = document.getElementById("nextpage");
button.addEventListener("click",()=>{
        
    sessionStorage.setItem('ipAddress',ip.textContent);
    window.location.href="fullDetails.html";
})

