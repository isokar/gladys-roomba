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
            identifier: "start",
            type: 'binary',
            unit: 'binary',
            min: 0,
            max: 1,
            sensor: false
        },
        {
            identifier: "battery",
            type:'batt',
            unit: '%',
            min: 0,
            max: 100,
            sensor: true
        }
    ]   
};
gladys.device.create(myDevice)
      .catch(function(err){
          // something bad happened ! :/
                    console.log(err)

      });
}