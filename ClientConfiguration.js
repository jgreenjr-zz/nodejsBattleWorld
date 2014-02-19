
exports.CalculateIP = function(inputedIp){
    if(inputedIp === ""){
        return "0.0.0.0";
    }
    return inputedIp;
}

exports.createConnection = function(ip, net, options){
    var returnValue =null;

    returnValue = net.createConnection(20509, ip)
    returnValue.on("data", options.connection_data);
    returnValue.on("end", options.connection_end);

    return returnValue;
}