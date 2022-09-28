const crypto= require("crypto")
const fs=require("fs")
const stream=require("stream")
const buffer=require("buffer")
const secret="thisissecret"
const algorithm="aes-192-cbc"
const password="this is going to be encrypted"
//ecdh-elliptic curve diffie hellman
//used for shared public private key pair with elliptic curve
//create alice keys
const alice=crypto.createECDH("secp521r1")
const aliceKey=alice.generateKeys()
//create bob keys
const bob=crypto.createECDH("secp521r1")
const bobKey=bob.generateKeys()
//exchange and generate secret keys
const aliceSecret=alice.computeSecret(bobKey)
const bobSecret=bob.computeSecret(aliceKey)
console.log(aliceSecret.toString("hex"))
console.log(bobSecret.toString("hex"))
console.log(aliceSecret.toString("hex")===bobSecret.toString("hex"))