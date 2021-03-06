module.exports = function install(){
var myDevice = {
    device: {
        name: 'Roomba',
        identifier: 'roomba',
        protocol: 'mqtt',
        service: 'roomba'
    },
    types: [
        {
            identifier: "onoff",
            type: 'binary',
            unit: 'binary',
            min: 0,
            max: 1,
            sensor: false
        },
        {
            identifier: "battery",
            type:'multilevel',
            unit: '%',
            min: 0,
            max: 100,
            sensor: true
        },
        {
            identifier: "ping",
            type:'binary',
            unit: 'binary',
            min: 0,
            max: 1,
            sensor: false
        }
    ]   
};
gladys.device.create(myDevice)
      .then(function(device){
          // device created ! 
      })
      .catch(function(err){
          // something bad happened ! :/
                    console.log(err)

      });
}
