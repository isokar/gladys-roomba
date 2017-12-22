var util = require('util');
var mqtt = require('mqtt');

// MQTT protocol (%prefix%/%topic%/%command%)
var powerMqttCmd = 'roomba/cmd';

module.exports = function exec(params) {

        if (params.deviceType.type == 'binary') {
			var identifier = params.deviceType.identifier.split('_');
			var topic = identifier[0];
			var id = identifier.length > 1 ? identifier[1] : '';

			return sendMqttMsg(topic, id, params.state.value);
        } else {
            console.log(`Roomba - DeviceType type invalid or unknown: ${params.deviceType.type}`);
        }

    return false;
};

function sendMqttMsg(topic, id, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {
            var client = mqtt.connect(url, {
                username: username,
                password: password
            });

            client.on('connect', function () {
                console.log(`Roomba - Successfully connected to MQTT : ${url}`);

                var req = powerMqttCmd;
                var state = value === 1 ? 'on' : 'off';
                console.log(`Roomba - Sending ${req} ${state}`);
                client.publish(req, state);
				client.end();

                return state;
            });

            client.on('error', function (error) {
                console.log(`Roomba - Error: ${error}`);
                client.end();

                return false;
            });
        });
}
