exports.events = [];
exports.eventTitle = [];

exports.createConnection = function(port, ip){
    exports.state = "Connected to Ip:" +ip;
    return exports;
};

exports.on = function (type, event){
    exports.events.push(event);
    exports.eventTitle.push(type);
};

exports.getEvent = function(event){
    var index = exports.eventTitle.indexOf(event);
    return exports.events[index];
};