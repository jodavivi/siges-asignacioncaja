let nodeCache = require('node-cache');
let cache = null;
let isCacheActive = false;

exports.start = function (done) {
  if (cache) return done();
  isCacheActive = true;
  cache = new nodeCache();
}
exports.instance = function () {
  return cache
}

exports.isCache = function(){
    return isCacheActive;

}

exports.refreshCache = function(){
    this.isCacheActive = false;

}

exports.activarCache = function(){
    this.isCacheActive = true;

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