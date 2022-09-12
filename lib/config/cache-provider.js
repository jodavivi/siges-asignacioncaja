let nodeCache = require('node-cache');
let cache = null;
var isCacheActive = false;

exports.start = function (done) {
  if (this.cache) return done();
  this.isCacheActive = true;
  this.cache = new nodeCache();
}
exports.instance = function () {
  return this.cache
}

exports.isCache = function(){ 
    return this.isCacheActive;

}

exports.refreshCache = function(){
    this.cache.flushAll();
    this.isCacheActive = false;  
    return;
}

exports.activarCache = function(){
    this.isCacheActive = true; 
    return;
}

exports.generarKey = function(codigo,oParam){
  var sKey = "";
        for (let name in oParam) { 
            if(oParam[name]){
                if(oParam[name] instanceof Object){  
                }else{
                    sKey = sKey + name+oParam[name];
                } 
            } 
        } 
        return codigo + sKey;
}