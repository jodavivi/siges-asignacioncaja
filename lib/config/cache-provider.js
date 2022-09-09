let nodeCache = require('node-cache');
let cache = null;
let isCacheActive = false;

exports.start = function (done) {
  if (cache) return done();
  this.isCacheActive = true;
  cache = new nodeCache();
}
exports.instance = function () {
  return cache
}

exports.isCache = function(){
    return this.isCacheActive;

}

exports.refreshCache = function(){
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