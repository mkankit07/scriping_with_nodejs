const request=require("request")
const fs =require("fs")
const cheerio=require("cheerio")
const li=[]
const { val } = require("cheerio/lib/api/attributes")
const url="https://www.flipkart.com/search?q=iphone&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
request(url,(req,res,body)=>{
    if(req){
        console.log(req);
    }else{
        const tt=cheerio.load(body)
        const c=tt('div[class="col col-7-12"]').each((index,value)=>{
                let cc={}
                let a=(tt(value).text()).split("(")
                cc["name"]=a[0]
                cd=a[1].split(")")[0]
                if(cd ==""){
                    ccc=a[2].split(")")[1]
                    cc["colors"]=ccc.split(",")[0]
                    cc["ROM"]=ccc.split(",")[1]
                    cc["rating"]=(a[3].split(")")[1]).slice(1,3)
                }else{
                    ccc=a[1].split(")")[0]
                    cc["colors"]=ccc.split(",")[0]
                    cc["ROM"]=ccc.split(",")[1]
                    cc["rating"]=(a[1].split(")")[1]).slice(0,3)
                }
                // console.log((cc));
                li.push(cc)
                

     }) }
fs.writeFileSync("data.json",JSON.stringify(li,null,4))
})


