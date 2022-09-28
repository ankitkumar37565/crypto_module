const crypto= require("crypto")
const fs=require("fs")
const stream=require("stream")
const buffer=require("buffer")
const secret="thisissecret"
const algorithm="aes-192-cbc"
const password="this is going to be encrypted"
//sign -for generating signature when a receiver gets a cryptograph he can verify whether it is genuine by verifying signature on it

const {privateKey,publicKey}=crypto.generateKeyPairSync("ec",{namedCurve:"sect239k1"})
const sign=crypto.createSign('sha256')
sign.write(password)
sign.end()
const signature=sign.sign(privateKey,"hex")

// // //verify signed token
const verify=crypto.createVerify('sha256')
verify.write(password)
verify.end()
console.log(verify.verify(publicKey,signature,"hex"))