//cjs emd umd and esm are methods to import export
//cjs commonjs -synchronously
const Crypto=require("Crypto")
module.exports=function f1(){
 console.log("function 1")
}
//amd asynchronous module definition
define([dep1,dep2],function(dep1,dep2){
 return function(){}
})
//ESM es module
import fs from "fs"
import {user,project,task} from "./db/models"