const lat =document.getElementById("lat");
const long =document.getElementById("long");
const city =document.getElementById("city");
const region =document.getElementById("region");
const org =document.getElementById("org");
const map = document.getElementsByClassName("map")[0];
const time = document.getElementById("time");
const datetime = document.getElementById("date-time");
const pincode = document.getElementById("pincode");
const msg = document.getElementById("msg");
const postoffices = document.getElementsByClassName("post-offices")[0];
const postname = document.getElementById("post-name");




const ip = document.getElementById("ownIP");

const IPAddress = sessionStorage.getItem('ipAddress');
ip.innerHTML=`${IPAddress}`;
fetchAPIDetails(IPAddress);

async function fetchAPIDetails(IPAddress){
    const token = `dd07e6570548c8`;
    const url= `https://ipinfo.io/${IPAddress}/geo`;
    const headers = { Authorization:`Bearer ${token}`}
    const response = await fetch(url,{headers:headers});
    const result = await response.json();
    console.log(result);
    const arr = result.loc;
    let str = arr.split(',');
    console.log(str[0],str[1]);
    lat.innerHTML=`${str[0]}`;
    long.innerHTML=`${str[1]}`;
    city.innerHTML=`${result.city}`
    region.innerHTML=`${result.region}`
    org.innerHTML=`${result.org}`
    time.innerHTML = `${result.timezone}`;
    const date = new Date();
    // const timevalue = getRealTime(result.timezone);
    datetime.innerHTML = `${date.toLocaleDateString()} , ${date.toLocaleTimeString()}`;
    pincode.innerHTML = `${result.postal}`;
    map.innerHTML=`<iframe
                        width="100%"
                        height="100%"
                        frameborder="0" style="border:0"
                        src="https://www.google.com/maps?q=${str[0]},${str[1]}&output=embed" allowfullscreen>
                    </iframe>`;
    getOtherPostOffice(result.postal);
}

async function getOtherPostOffice(pincode){
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    msg.innerHTML = `${result[0].Message}`
    const posts = result[0].PostOffice;
    posts.forEach((value)=>{
        const post1 = document.createElement('div');
        post1.innerHTML = `<p>Name : <span>${value.Name}</span></p>
                            <p>Branch Type : <span>${value.BranchType}</span></p>
                            <p>Delivery Status : <span>${value.DeliveryStatus}</span></p>
                            <p>District : <span>${value.District}</span></p>
                            <p>Division : <span>${value.Division}</span></p>`;
        post1.className="post1";
        postoffices.appendChild(post1);
    })
}
async function getSearchResult(pincode){
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    return result[0].PostOffice;
}

postname.addEventListener("keyup",()=>{
    console.log(postname.value);
    const res= postname.value;
    const pro = getSearchResult(pincode.innerHTML);
    pro.then(data=>{
        // console.log(data);
        postoffices.innerHTML="";
        data.forEach(value=>{
            const name = value.Name;
            // console.log(value.Name);
            // console.log(name.toLowerCase().includes(res.toLowerCase()));
            if(name.toLowerCase().includes(res.toLowerCase())){
                const post1 = document.createElement('div');
                post1.innerHTML = `<p>Name : <span>${value.Name}</span></p>
                                    <p>Branch Type : <span>${value.BranchType}</span></p>
                                    <p>Delivery Status : <span>${value.DeliveryStatus}</span></p>
                                    <p>District : <span>${value.District}</span></p>
                                    <p>Division : <span>${value.Division}</span></p>`;
                post1.className="post1";
                postoffices.appendChild(post1);
            }
        })
    })

})





















function getRealTime(targetTimezone){
// const targetTimezone = 'America/New_York';
const currentUtcTime = new Date();
const targetTime = new Date(currentUtcTime.toLocaleString('en-US', { timeZone: targetTimezone }));

const formattedTime = targetTime.toLocaleTimeString('en-US', { timeZone: targetTimezone, timeStyle: 'medium' });
const date = targetTime.toLocaleDateString();
console.log(`Current time in ${targetTimezone}: ${formattedTime} ${date}`);
return [formattedTime,date];
}


