var util = require('util');
var mqtt = require('mqtt');

// MQTT protocol (%prefix%/%topic%/%command%)
var powerMqttCmd = 'roomba/cmd';

module.exports = function exec(params) {

        if (params.deviceType.type == 'binary') {
			var topic = params.deviceType.identifier;

			return sendMqttMsg(topic, params.state.value);
        } else {
            sails.log.warning(`Roomba - DeviceType type invalid or unknown: ${params.deviceType.type}`);
        }

    return false;
};

function sendMqttMsg(topic, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {
            var client = mqtt.connect(url, {
                username: username,
                password: password
            });

            client.on('connect', function () {
                sails.log.info(`Roomba - Successfully connected to MQTT : ${url}`);

                var req = powerMqttCmd;
				var msg = `{"_type":"cmd","power":"${value}",,"mode":"1"}`
                console.log(`Roomba - Sending ${req} with ${msg}`);
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
