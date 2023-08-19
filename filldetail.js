const lat =document.getElementById("lat");
const long =document.getElementById("long");
const city =document.getElementById("city");
const region =document.getElementById("region");
const org =document.getElementById("org");
const map = document.getElementsByClassName("map")[0];
const time = document.getElementById("time");
const datetime = document.getElementById("date-time");
const pincode = document.getElementById("pincode");

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
    const timevalue = getRealTime(result.timezone);
    datetime.innerHTML = `${timevalue[1]} ${timevalue[0]}`;
    pincode.innerHTML = `${result.postal}`;
    map.innerHTML=`<iframe
                        width="100%"
                        height="100%"
                        frameborder="0" style="border:0"
                        src="https://www.google.com/maps?q=${str[0]},${str[1]}&output=embed" allowfullscreen>
                    </iframe>`;
    // getOtherPostOffice(result.postal);
}

function getRealTime(targetTimezone){
// const targetTimezone = 'America/New_York';
const currentUtcTime = new Date();
const targetTime = new Date(currentUtcTime.toLocaleString('en-US', { timeZone: targetTimezone }));

const formattedTime = targetTime.toLocaleTimeString('en-US', { timeZone: targetTimezone, timeStyle: 'medium' });
const date = targetTime.toLocaleDateString();
console.log(`Current time in ${targetTimezone}: ${formattedTime} ${date}`);
return [formattedTime,date];
}


