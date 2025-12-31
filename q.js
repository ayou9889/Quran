document.querySelector("*").style=`
    box-sizing:border-box;
    margin:0;
    padding:0;
`;
const style=document.createElement("style");
style.innerHTML=`
    .d{ 
        box-sizing: border-box;
        padding:5px;
        background-color:#171717;
        color:white;
        width:120px;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        gap:5px;
        border-radius:5px;
        text-decoration: none;
    }
    .d p{
        margin:0;
    }
    @media (max-width:768px) {
        .d{
            width:calc(100% / 2 - 5px);
        }
    }
    @media (max-width:480px) {
        .d{
            width:100%;
        }
    }
`;
document.querySelector("head").appendChild(style);
document.querySelector("html").style.height="100%";
document.body.style=`
    background-color:#2f3957;
    margin:0;
    height:100%;
    display:flex;
    justify-content:center;
    font-family: Arial, Helvetica, sans-serif;
`;
const logoimg=document.createElement("img");
const logo=document.createElement("a");
logoimg.setAttribute("src","Images/logo.png");
logoimg.style.width="50px";
logo.setAttribute("href","https://oufaddoul.com/");
logo.setAttribute("title","Ayoub Oufaddoul");
logo.appendChild(logoimg);
let s=[];
fetch("https://oufaddoul.com/Quran/get/q.json").then((d)=>d.json()).then((data)=>{
    s=data;
});
let w=Math.floor((window.innerWidth*0.90));
if(window.innerHeight < window.innerWidth){
    w=640;
}
const container=document.createElement("div");
container.style=`
    width:${w}px;
    box-sizing: border-box;
    height:fit-content;
    display:flex;
    gap:5px;
    flex-wrap: wrap;
    align-content: start;
    padding:10px;
    padding-bottom:97px;
`;

const searchC=document.createElement("div");
searchC.style=`
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:80px;
    background-color:#1a1d2f;
    display:flex;
    justify-content:center;
`;

const searchd=document.createElement("div");
searchd.style=`
    width:${w}px;
    height:80px;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
`;

const search=document.createElement("div");
search.setAttribute("contenteditable","");
search.style=`
    width:80%;
    height:50px;
    background-color:white;
    border-radius:20px;
    font-size:2em;
    line-height:50px;
    padding:0 15px;
    box-sizing:border-box;
`;
search.addEventListener("focus",(e)=>{
    e.target.style.outline="3px solid #303a58";
});

search.addEventListener("blur",(e)=>{
    e.target.style.outline="none";
});

search.addEventListener("input",(ev)=>{
    container.innerHTML="";
    if(/[a-z]+/i.test(ev.target.textContent))
        ev.target.style.direction="ltr";
    else 
        ev.target.style.direction="rtl";
    if(/^makia$|^makki$|^مكية$/i.test(ev.target.textContent)){
        for(let v of s){
            // console.log(v.p);
            if((new RegExp(`مكية`)).test(v.p)){
                container.innerHTML+=`
                    <a href="/surat/" class="d" onclick="localStorage.setItem('S','${v.t}');">
                        <p>${v.arn}</p>
                        <p>${v.enn}</p>
                        <p>${v.an} عدد الآيات</p>
                        <p>${v.p}</p>
                    </a>
                `;
            }
        }
    }
    else  if(/^madani$|^madania$|^مدنية$/i.test(ev.target.textContent)){
        for(let v of s){
            if((new RegExp(`مدنية`)).test(v.p)){
                container.innerHTML+=`
                    <a href="/surat/" class="d" onclick="localStorage.setItem('S','${v.t}');">
                        <p>${v.arn}</p>
                        <p>${v.enn}</p>
                        <p>${v.an} عدد الآيات</p>
                        <p>${v.p}</p>
                    </a>
                `;
            }
        }
    }
    else if(/^\d{1,3}$/i.test(ev.target.textContent)){
        for(let v of s){
            if((ev.target.textContent) === (v.an)){
                container.innerHTML+=`
                    <a href="/surat/" class="d" onclick="localStorage.setItem('S','${v.t}');">
                        <p>${v.arn}</p>
                        <p>${v.enn}</p>
                        <p>${v.an} عدد الآيات</p>
                        <p>${v.p}</p>
                    </a>
                `;
            }
        }
    }
    for(let v of s){
        // console.log(v[0],v[1]);
        if(ev.target.textContent != "" && (new RegExp(`${(ev.target.textContent)}`)).test(v.arn)){
            // console.log(v.arn);
            container.innerHTML+=`
                <a href="/surat/" class="d" onclick="localStorage.setItem('S','${v.t}');">
                    <p>${v.arn}</p>
                    <p>${v.enn}</p>
                    <p>${v.an} عدد الآيات</p>
                    <p>${v.p}</p>
                </a>
            `;
        }
    }
});

searchd.appendChild(search);
searchd.appendChild(logo);
searchC.appendChild(searchd);
document.body.appendChild(container);

document.body.appendChild(searchC);
