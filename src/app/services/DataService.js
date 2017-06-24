huawei.service.DataService = function() {
	var self = this;
	huawei.Service.call(this, 'dataService');
	
	huawei.subscribe("/dataService/set", function(options) {
		dataMap[options.key] = options.value;
	})
	
	huawei.subscribe("/dataService/get", function(options) {
		if (options.callback) {
			options.callback({"data":dataMap[options.key]});
		}
		
	})
	
	self.dataMap = {};
	self.get = function(key, value) {
		return self.dataMap[key];
	}
	self.set = function(key, value) {
		self.dataMap[key] = value;
	}
	self.remove = function(key) {
		self.dataMap[key] = undefined;
		delete self.dataMap[key];
	}
	
	self.buildFixture= function() {
		console.log("================ data in dataMap =================");
		console.log(JSON.stringify(self.dataMap));
		console.log("================ End of data in dataMap =================");
		
	}
	self.loadData= function(data) {
		self.dataMap = data;
	}
};
new huawei.service.DataService();
