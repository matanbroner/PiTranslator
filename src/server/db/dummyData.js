module.exports = {
    devices: [
        {
            name: 'Device 1',
            mac: '00:00:00:00:00:01',
        },
        {
            name: 'Device 2',
            mac: '00:00:00:00:00:02',
        },
        {
            name: 'Device 3',
            mac: '00:00:00:00:00:03',
        },
    ],
    channels: [
        {
            name: 'Channel 1',
            topic: 'channel1',
            restricted: false,
            password: '',
            deviceId: 1,
        },
        {
            name: 'Channel 2',
            topic: 'channel2',
            restricted: false,
            password: '',
            deviceId: 2,
        },
    ]

};