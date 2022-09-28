const crypto= require("crypto")
const fs=require("fs")
const stream=require("stream")
const buffer=require("buffer")
const secret="thisissecret"
const algorithm="aes-192-cbc"
const password="this is going to be encrypted"
//HMAC-hash based message authentication code
const hmac=crypto.createHmac('sha256',"secret")
hmac.on("readable",()=>{
 const data=hmac.read()
 if(data){console.log(data.toString("hex"))}
})
hmac.write(password)
hmac.end()