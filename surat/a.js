let s=[],cmp=localStorage.getItem("S"),o={};
const style=document.createElement("style");
style.innerHTML=`
    div.d,div.d+div{
        width:100%;
        display:flex;
        justify-content:flex-end;
        flex-wrap:wrap;
        background-color:rgb(24, 30, 47);
        border-radius:15px;
        box-sizing:border-box;
        padding:15px;
        color:white;
    }
    div.d+div{
        direction:rtl;
        justify-content:flex-start;
        gap:10px;
        font-size:1.2em;
    }
    div.d+div strong{
        background-color:#404c71;
        border-radius:50%;
        width:40px;
        height:40px;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    div.d+div span{
        cursor: pointer;
        font-size:1.5em;
    }
    div.d p{
        width:50%;
        display:flex;
        justify-content:flex-end;
        font-size:1.2em;
    }
    div.d p:last-child{
        width:100%;
    }
    footer{
        color:white;
        width:100%;
        display:flex;
        justify-content:center;
        padding: 15px;
        box-sizing: border-box;
    }
    footer a{
        color:white;
        font-weight:600;
        text-decoration:none;
    }
`;
document.querySelector("head").appendChild(style);
document.querySelector("html").style.height="100%";
document.body.style=`
    background-color:#2f3957;
    margin:0;
    height:100%;
    display:flex;
    align-items:center;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
`;
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
    flex-direction: column;
`;
const h1=document.createElement("h1");
h1.style.color="white";
document.body.appendChild(h1);
const c2=document.createElement("div");
c2.style=`
    width:100%;
    display:flex;
    flex-direction: column;
    gap:15px;
`;
const ct=document.createElement("div");
ct.style=`
    box-sizing: border-box;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:none;
    justify-content:center;
    align-items:center;
    background-color:#000000eb;
    color:white;
    font-size:1.5em;
    padding: 10px;
`;
ct.addEventListener("click",(e)=>{e.target.style.display="none";document.body.style.overflow='auto';});
function l(ind){
    ct.textContent=s2[ind].t;
}
let s2=[];
fetch("/get/q.json").then((d)=>d.json()).then((data)=>{
    s=data;
    s.forEach(e => {
        if(e.t === cmp){
            document.querySelector("title").textContent=`سورة ${e.arn}`;
            o.arn=e.arn;
            o.t=e.t;
            o.an=e.an;
            o.p=e.p;
            o.wn=e.wn;
            o.enn=e.enn;
            o.ln=e.ln;
            o.qp=e.qp;
            console.log(o.arn);
            h1.textContent=`سورة ${o.arn} | ${o.enn}`;
            c2.innerHTML=`
            <div class="d">
                <p>${o.an} : عدد الآيات</p>
                <p>سورة ${o.p}</p>
                <p>عدد الكلمات : ${o.wn}</p>
                <p>عدد الحروف : ${o.ln}</p>
                <p>موضعها في القرآن الكريم : من ${o.qp}</p>
            </div>
            `;
            fetch(`/get/quran/${((Number(o.t) > 100)?"c":(Number(o.t)>50)?"b":"a")}/65${o.t}89.json`).then((d2)=>d2.json()).then((data2)=>{
                s2=data2;
                let str="";
                s2.forEach((e2,i)=>{
                    str+=`<span onclick='l(${i});ct.style.display="flex";document.body.style.overflow="hidden";'>${e2.a}</span><strong>${e2.an}</strong>`;
                });
                console.log(str);
                c2.innerHTML+=`<div>${str}</div>`;
            }).then(()=>{
                container.insertAdjacentHTML("afterend",`
                    <footer>This website made with &#x1f499; by&nbsp;<a href="https://oufaddoul.com">Ayoub Oufaddoul</a></footer>
                `);
            });
            return;
        }
    });
    
});
container.appendChild(c2);
container.appendChild(ct);
document.body.appendChild(container);
