//Crypto module provide set of functionality like Open SSL's hash ,HMAC,cipher,decipher,sign,verify
//HMAC-hash based message authentication code
//utf-8 is character encoding each char represented by one of 4 bytes
//hash is fixed length of bit text that is procedurally and deterministically generated from text
//it has properties like-fixed length,deterministic,collision resistant ,unidirectional
const crypto= require("crypto")
const fs=require("fs")
const stream=require("stream")
const buffer=require("buffer")
const secret="thisissecret"
const algorithm="aes-192-cbc"
const password="this is going to be encrypted"
//first gen key->gen iv->create cipher->encrypt text
crypto.scrypt(password,"salt",24,(err,key)=>{// gen key using salt
 if(err) throw err
 //now we create iv(initialization vector)
 crypto.randomFill(new Uint8Array(16),(err,iv)=>{
if (err) throw err
//create cypher with key and iv
const cipher=  crypto.createCipheriv(algorithm,key,iv)
let encrypted="";
cipher.setEncoding("hex");
cipher.on("data",(chunk)=>{encrypted+=chunk})
cipher.on("end",()=>{console.log(encrypted)})//encrypted with key
cipher.write("some clear data")
cipher.end()
 })
})

//using cipher and piped streams
//first we will generate the key the key length depends on algorithm(for aes 192 it is 24 bytes=192 bits)

crypto.scrypt(password,"salt",24,(err,key)=>{
 if(err) throw err
 //now we create iv(initialization vector)
crypto.randomFill(new Uint8Array(16),(err,iv)=>{
if (err) throw err
//create cypher with key and iv
const cipher=  crypto.createCipheriv(algorithm,key,iv)
const input=fs.createReadStream("index.js")
const output=fs.createWriteStream("test.enc")
stream.pipeline(input,cipher,output,(err)=>{
 if(err) throw err
})
})
})

//decipher-to decrypt encrypted text
const key=crypto.scryptSync(password,"salt",24)
//the iv is usually passed along cipher text
const iv=buffer.alloc(16,0)
//create decipher with key and iv
const decipher=crypto.createDecipheriv(algorithm,key,iv)
let decrypted=""
decipher.on("readable",()=>{
 while(null!==(chunk=decipher.read())){
  decrypted+=chunk.toString('utf8')
 }
})
decipher.on("end",()=>{
 console.log(decrypted)
})

const encrypted="9b94148ac60897d3d9799c833e2488bb"
decipher.write(encrypted,"hex")
decipher.end()
