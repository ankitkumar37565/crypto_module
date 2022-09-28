const crypto= require("crypto")
const fs=require("fs")
const stream=require("stream")
const buffer=require("buffer")
const secret="thisissecret"
const algorithm="aes-192-cbc"
const password="this is going to be encrypted"
// // hash
// always return same length of string for any length of input
// always return same hash for same data
const hash=crypto.createHash("sha256")
hash.on("readable",()=>{
 const data=hash.read()
 if(data){
  console.log(data.toString("hex"))//6a098642f06d10c206179677f407704f4e13c26d932093ffc758709b0a21e012
 }
})
hash.write(password)
hash.end();

// certificate-made up of key pair
const spkac=getSpkacSomehow();
// const challenge=crypto.Certificate.exportChallenge(spkac)
console.log(crypto.Certificate.verifySpkac(buffer.from(spkac)))