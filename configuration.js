var fs = require("fs");
var xml2js = require('xml2js');


exports.load = function(){var file = fs.readFile("settings.xml",function(err, data){
    var parser = xml2js.Parser();
    
    parser.parseString(data.toString(), function (err, result) {
        console.log(result['settings']['Player'][0].health[0])
    exports.PlayerHealth = result['settings']['Player'][0].health[0];
    
});
});
}

exports.IsLoaded = false;

exports.GetSetting = function(setting){
    if(!exports.IsLoaded)
        {
            console.log("loading");
            exports.load();
            exports.IsLoaded=true;
            console.log(exports.PlayerHealth);
        }
    switch(setting){
        case "PlayerHealth":
             
            return exports.PlayerHealth;
    }
}
