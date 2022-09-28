const crypto= require("crypto")
const fs=require("fs")
const stream=require("stream")
const buffer=require("buffer")
const secret="thisissecret"
const algorithm="aes-192-cbc"
const password="this is going to be encrypted"
//diffiehellman-for securely key exchange
//generate alice key
const alice=crypto.createDiffieHellman(2048)
const aliceKey=alice.generateKeys()
//generate bob key
const bob=crypto.createDiffieHellman(alice.getPrime(),alice.getGenerator())
const bobKey=bob.generateKeys()
//exchange and generate secret key
const aliceSecret=alice.computeSecret(bobKey)
const bobSecret=bob.computeSecret(aliceKey)
// console.log(aliceSecret.toString("hex"))
console.log(bobSecret.toString("hex")===aliceSecret.toString("hex"))