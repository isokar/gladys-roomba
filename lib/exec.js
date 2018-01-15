var util = require('util');
var mqtt = require('mqtt');

// MQTT protocol (%prefix%/%topic%/%command%)
var powerMqttCmd = 'roomba/cmd';

module.exports = function exec(params) {

	var topic = params.deviceType.deviceTypeIdentifier;

	return sendMqttMsg(topic, params.state.value);
};

function sendMqttMsg(topic, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {
            var client = mqtt.connect(url, {
                username: username,
                password: password
            });

			client.on('connect', function () {
				console.log(`Roomba - Successfully connected to MQTT : ${url}`);

				var req = powerMqttCmd;
				if(topic == 'onoff'){
					var msg = `{"_type":"cmd","power":"${value}","mode":"1"}`
				}
				if(topic == 'ping'){
					var msg = `{"_type":"ping","power":"1"}`
					value = 0;
				}
				console.log(`Roomba - Sending ${req} ${msg}`);
				client.publish(req, msg);
				client.end();

				return value;
            });

            client.on('error', function (error) {
                console.log(`Roomba - Error: ${error}`);
                client.end();

                return false;
            });
        });
}

