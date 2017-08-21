'use strict';

const Homey = require('homey');
const { HomeyAPI } = require('./lib/athom-api.js')

class MyApp extends Homey.App {

    // Get homey object
    getApi() {
      if (!this.api) {
        console.log('API not available, request new for current Homey');
        this.api = HomeyAPI.forCurrentHomey();
      }
      return this.api;
    }

    async getInsightLogs() {
      try {
        const api = await this.getApi();
        const insightLogs = await api.insights.getLogs();
        return insightLogs;
      } catch(error) {
        console.log(error)
      }
    }

    getInsightLogsNames(logs) {
      let names = [];
      for (var i = 0; i < logs.length; i++) {
        names.push(logs[i].name);
      }
      return names;
    }
	
	async onInit() {
		
		this.log('MyApp is running...');
		const insightLogs = await this.getInsightLogs();
		const language = Homey.ManagerI18n.getLanguage();
		this.log('Language', language);
	}
	
}

module.exports = MyApp;