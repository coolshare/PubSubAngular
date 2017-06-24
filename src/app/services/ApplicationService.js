huawei.service.ApplicationService = function() {
	var self = this;
	
	huawei.Service.call(this, 'applicationService');
	self.dataService = huawei.serviceManager.get("dataService");
	var remoteService = huawei.serviceManager.get("remoteService");
	
	self.subscribe("/applicationService/loadApplications", function(options) {
		self.loadApplications(options);
	});
	self.subscribe("/applicationService/loadApplication", function(options) {
		self.loadApplication(options);
	});
	self.subscribe("/applicationService/snapshotApplication", function(options) {
		self.snapshotApplication(options);
	});
	self.subscribe("/applicationService/recoverApplication", function(options) {
		self.recoverApplication(options);
	});
	self.subscribe("/applicationService/save", function(options) {
		self.save(options);
	});
	self.subscribe("/applicationService/update", function(options) {
		self.update(options);
	});
	self.subscribe("/applicationService/remove", function(options) {
		self.remove(options);
	});

	if (huawei.testTrigger>0) {
		self.subscribe("/applicationService/removeTestApps", function(options) {
			self.removeTestApps(options);
		});
		self.subscribe("/applicationService/updateTestApps", function(options) {
			self.updateTestApps(options);
		});
		self.subscribe("/applicationService/publishTestApps", function(options) {
			self.publishTestApps(options);
		});
		self.subscribe("/applicationService/unpublishTestApps", function(options) {
			self.unpublishTestApps(options);
		});
		self.subscribe("/applicationService/updateSelected", function(options) {
			self.updateSelected(options);
		});
		self.subscribe("/applicationService/updateOriginal", function(options) {
			self.updateOriginal(options);
		});
	}

	var processData = function(data, options) {
		var applicationMap = {};
		var published = {};
		var draft = {};
		for ( var i = 0; i < data.length; i++) {
			var app = data[i];
			if (!app.visible) {
				continue;
			}
			applicationMap[app.id] = app;
			
			//huawei.constructAppInfo(app);
			// console.log(" app:"+app.name);
			if (app.status == "published") {
				published[app.id] = app;
			} else {
				draft[app.id] = app;
			}

		}
		self.dataService.set("applicationMap", applicationMap);
		self.dataService.set("applicationPublished", published);
		self.dataService.set("applicationDraft", draft);
		var topic = options.loadedTopic || "/applicationService/loadApplications/done";

		self.publish(topic);
	}
	
	var categorizeApps = function() {
		var applicationMap = self.dataService.get("applicationMap");
		var published = {};
		var draft = {};
		for ( var a in applicationMap) {
			var app = applicationMap[a];
			applicationMap[app.id] = app;
			if (app.status == "published") {
				published[app.id] = app;
			} else {
				draft[app.id] = app;
			}

		}

		self.dataService.set("applicationPublished", published);
		self.dataService.set("applicationDraft", draft);
	}

	function listCookies() {
		var theCookies = document.cookie.split(';');
		var aString = '';
		for ( var i = 1; i <= theCookies.length; i++) {
			aString += i + ' ' + theCookies[i - 1] + "\n";
		}
		return aString;
	}

	self.loadApplications = function(options) {
		
		listCookies()
		options = options || {};
		options.longProgress = true;
		if (huawei.isLocal) {
			var topic = options.loadedTopic || "/applicationService/loadApplications/done";

			self.publish(topic);
			return;
		}

		var searchCriteria = options.searchCriteria ? options.searchCriteria
				: "";
		if (searchCriteria != "") {
			self.filter(searchCriteria);
			return;
		}
		
		var para = "";
		if (self.dataService.get("isAdmin")) {
			para = "?admin=1";
			if (searchCriteria != "") {
				para = para + "&" + searchCriteria;
			}
		} else {
			if (searchCriteria == "") {
				para = "";
			} else {
				para = "?" + searchCriteria;
			}
		}

		// Construct request
		options.url = "appListUrl";
		options.method = "GET";
		options.para = para;
		options.defaultDoneTopic = "/"+self.name+"/loadApplications";
		options.successHandler = function(data) {

			processData(data, options)
		};
		var promise = remoteService.call(options);
	}

	self.loadApplication = function(options) {
		options = options || {};
		options.longProgress = true;
		if (huawei.isLocal) {
			var topic = options.loadedTopic || "/applicationService/loadApplications/done";

			self.publish(topic);
			return;
		}

		var id = options.id || self.dataService.get("selectedApplication").id;

		// Construct request
		options.url = "appListUrl";
		options.method = "GET";
		options.para = "/" + id;
		options.defaultDoneTopic = "/"+self.name+"/loadApplication";
		options.successHandler = function(data) {
			var app = data;
			var applicationMap = self.dataService.get("applicationMap");
			applicationMap[app.id] = app;
			self.dataService.set("selectedApplication", app);
		};
		var promise = remoteService.call(options);

	}
	
	self.snapshotApplication = function(options) {
		options = options || {};
		options.longProgress = true;
		if (huawei.isLocal) {
			var topic = options.loadedTopic || "/applicationService/snapshotApplication/done";
			var data = {"data":{"id":options.id}};
			
			self.publish(topic, data);
			if (options.callback) {
				options.callback(data);
			}
			return;
		}

		var id = options.id || self.dataService.get("selectedApplication").id;

		// Construct request
		options.url = "appListUrl";
		options.method = "PUT";
		options.para = "/" + id + "/snapshot";
		options.defaultDoneTopic = "/"+self.name+"/snapshotApplication";
		options.successHandler = function(data) {
			var app = data;

			var applicationMap = self.dataService.get("applicationMap");
			applicationMap[app.id] = app;
			self.dataService.set("selectedApplication", app);
			self.dataService.set("original_id", app.original_id);
			huawei.updateAppDirty(false);
		};
		var promise = remoteService.call(options);

	}
	
	self.recoverApplication = function(options) {
		options = options || {};
		options.longProgress = true;
		if (huawei.isLocal) {
			var topic = options.loadedTopic || "/applicationService/recoverApplication/done";

			self.publish(topic);
			return;
		}

		var id = options.id || self.dataService.get("selectedApplication").id;

		// Construct request
		options.url = "appListUrl";
		options.method = "PUT";
		options.para = "/" + id + "/recover";
		options.defaultDoneTopic = "/"+self.name+"/recoverApplication";
		options.successHandler = function(data) {
			var app = data;
			var applicationMap = self.dataService.get("applicationMap");
			applicationMap[app.id] = app;
			self.dataService.set("selectedApplication", app);
			self.loadApplications();
		};
		var promise = remoteService.call(options);

	}
	
	self.save = function(options) {
		options = options || {};
		options.longProgress = true;
		// Construct request
		options.url = "appListUrl";
		options.method = "POST";
		options.data = JSON.stringify(options.data);
		options.defaultDoneTopic = "/"+self.name+"/save";
		options.successHandler = function(data) {
			var app = data;
			self.loadApplications();
			self.dataService.set("listAppDirty", app);		
			self.dataService.set("selectedApplication", app);	
			self.dataService.get("applicationMap")[app.id] = app;
		};
		var promise = remoteService.call(options);

	}
	self.update = function(options) {
		options = options || {};
		options.longProgress = true;
		// Construct request
		options.url = "appListUrl";
		options.method = "PUT";
		options.para = "/" + options.id;
		if (!options.dataFormatted) {
			options.data = JSON.stringify(options.data);
			options.dataFormatted = true;
		}
		
		options.defaultDoneTopic = "/"+self.name+"/update";
		options.successHandler = function(data) {
			var app = data;

			self.dataService.get("applicationMap")[app.id] = app;
			self.dataService.set("selectedApplication", app);

			self.publish("Application/Loaded", {
				"application" : app
			});
			self.dataService.set("listAppDirty", true);	
			if (options.bufferedTestAppForUpdate) {
				self.updateBufferedTestApp(options);
				if (options.bufferedTestAppForUpdate.length==0) {
					self.loadApplications();
					if (huawei.testTopic && huawei.testTopic==options.bufferUpdateDoneTopic) {
						huawei.serviceManager.get("testService").runStep()
					}
				}


			} else {
				self.loadApplications();
			}
		};
		
		
		var promise = remoteService.call(options);
	}
	self.remove = function(options) {
		options = options || {};
		var $translate = huawei.serviceManager.accessExternalService("$translate");
		// Construct request
		options.url = "appListUrl";
		options.method = "DELETE";
		options.para = "/" + options.id;
		options.defaultDoneTopic = "/"+self.name+"/remove";
		options.errorCodeMap = {"403": $translate.instant("APP_NOT_DEL")};
		options.successHandler = function(data) {
			self.loadApplications();
			self.dataService.set("listAppDirty", true);			
		};
		
		if (options.noConfirm) {
			var promise = remoteService.call(options);
		} else {
			self.publish("/confirmBox/open", {"title":$translate.instant("CONFIRMATION"), "message":$translate.instant("CONFIRM_DELETE_APP"), "handleYes":function(){
				
				var promise = remoteService.call(options);
	    	}});
		}
		
		
		
	}
	if (huawei.testTrigger>0) {
		self.removeTestApps = function(options) {
			options = options || {};
			var appMap = self.dataService.get("applicationMap");
			options.removeList = [];
			var nameList = [];
			for (var a in appMap) {
				var app = appMap[a];
				if (app.name.indexOf("ApplicationID_")==0 && app.status != "published") {
					options.removeList.push(app);
					nameList.push(app.name)
				}
			}
			options.bufferUpdateDoneTopic = "/applicationService/removeTestApps/done";
			
			if (options.data.expect) {
				var t = huawei.testErrorLog[options.data.expect]
				if (t.property==undefined) {
					t.property = {}
				}
				t.property.subList = nameList;
			}
			self.doRemoveApps(options);
		}
		
		self.doRemoveApps = function(options) {
			if (options.removeList.length<1) {
				if (options.bufferUpdateDoneTopic) {
					if (huawei.testTopic && huawei.testTopic==options.bufferUpdateDoneTopic) {
						huawei.serviceManager.get("testService").runStep()
					}
				}
				return;
			}
			var app = options.removeList.shift();
			var opt = $.extend({}, options);
			opt.id = app.id;
			opt.noConfirm = true;
			opt.callback = function() {
				self.doRemoveApps(options);
			}
			opt.keepProgress = options.length>0;
			opt.failCallback = function() {
				self.doRemoveApps(options);
			}
			self.remove(opt)
		}
		
		self.updateTestApps = function(options) {
			options = options || {};
			var appMap = self.dataService.get("applicationMap");
			options.bufferedTestAppForUpdate = [];
			var nameList = [];
			for (var a in appMap) {
				var app = appMap[a];
				if (app.name.indexOf("ApplicationID_")==0 && app.status!=options.data.status) {
					options.id = app.id;
					options.bufferedTestAppForUpdate.push($.extend({}, options));
					nameList.push(app.name)
					//self.update(options)
				}
			}
			
			if (options.data.expect) {
				var t = huawei.testErrorLog[options.data.expect]
				if (t.property==undefined) {
					t.property = {}
				}
				t.property.subList = nameList;
			}
			
			if (options.bufferedTestAppForUpdate.length>0) {
				self.updateBufferedTestApp(options);
			} else {
				huawei.serviceManager.get("testService").runStep()
			}
			
		}
		
		self.updateBufferedTestApp = function(options) {
			if (options.bufferedTestAppForUpdate.length==0) {
				if (options.bufferUpdateDoneTopic) {
					self.publish(options.bufferUpdateDoneTopic)
				}
				return;
			}
			var app = options.bufferedTestAppForUpdate.shift();
			var opt = $.extend({}, options);
			opt.id = app.id;
			opt.keepProgress = options.bufferedTestAppForUpdate.length>0;
			self.update(opt)
		}
		
		self.updateSelected = function(options) {
			var selectedApp  = self.dataService.get("selectedApplication");
			if (selectedApp==undefined) {
				return;
			}
			options.id = selectedApp.id;
			self.update(options);
		}
		self.updateOriginal = function(options) {
			var selectedAppId  = self.dataService.get("original_id");
			if (selectedAppId==undefined) {
				return;
			}
			options.id = selectedAppId;
			options.bufferedTestAppForUpdate = [];
			options.bufferUpdateDoneTopic = "/applicationService/updateOriginal/done";
			self.update(options);
		}
		
		self.publishTestApps = function(options){
			options.data = options.data || {};
			options.data.status = "published";
			options.bufferUpdateDoneTopic = "/applicationService/publishTestApps/done";
			self.updateTestApps(options)
		}
		
		self.unpublishTestApps = function(options){
			options.data = options.data || {};
			options.data.status = "draft";
			options.bufferUpdateDoneTopic = "/applicationService/unpublishTestApps/done";
			self.updateTestApps(options)
		}
	}
	
	self.filter = function(s) {
		var appMap = self.dataService.get("applicationMap");
		var ss = s.split("=")
		var published = {};
		var draft = {};
		// console.log("================================>Applicatoins loaded:");
		for ( var a in appMap) {
			var app = appMap[a];
			if (app.name.indexOf(ss[1])<0) {
				continue;
			}
			//applicationMap[app.id] = app;
			//huawei.constructAppInfo(app);
			// console.log(" app:"+app.name);
			if (app.status == "published") {
				published[app.id] = app;
			} else {
				draft[app.id] = app;
			}

		}
		self.dataService.set("applicationPublished", published);
		self.dataService.set("applicationDraft", draft)
		
		self.publish("/applicationService/loadApplications/done");
	}
};
new huawei.service.ApplicationService();
