exports.CreateSocket = function(){
	return new socket();
}

function socket (){
	this.events = [];
	this.eventTitle = [];
	
	this.on = function (type, event){
    this.events.push(event);
    this.eventTitle.push(type);
	};

	this.getEvent = function(event){
    var index = this.eventTitle.indexOf(event);
    return this.events[index];
	};
}