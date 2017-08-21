'use strict';

const Homey = require('homey');

class MySQLServerDevice extends Homey.Device {

    // this method is called when the Device is inited
    onInit() {
        this.log('device init');
        // Get settings
        let settings = this.getSettings();
        this.log('Settings', settings);
        this.registerFlows();
    }

    // this method is called when the Device is added
    onAdded() {
        this.log('device added');
    }

    // this method is called when the Device is deleted
    onDeleted() {
        this.log('device deleted');
    }

    registerFlows() {

      let start_export = new Homey.FlowCardAction('start_export');
      start_export
          .register()
          .on('run', (args, state, callback) => {
          })

    }
}

module.exports = MySQLServerDevice;