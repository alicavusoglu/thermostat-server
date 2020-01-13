import express from 'express';
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
import bodyParser from 'body-parser';
let apiRoute = require('./routes/api');
let targetDegreeRoute = require('./routes/target_degree');
let roomStateRoute = require('./routes/room_state');
import room_state from './models/room_state';
import target_degree from './models/target_degree';

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(__dirname + '/pages'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/api', apiRoute);
app.use('/api/target-degree', targetDegreeRoute);
app.use('/api/room-state', roomStateRoute);

mongoose.connect('mongodb://alicavusoglu:beldeyama258852@ds161134.mlab.com:61134/heroku_tsk5gnhh');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (err, db) {
    if (err) {
        throw err;
    }
    console.log('MongoDB connected');
});



function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}

io.on('connection', function (socket) {
    console.log("Connected");
    target_degree.
    findOne()
    .sort({timeStamp: -1}).
    exec(function (err, input) {
            io.sockets.emit('target_degree', input);
        });

    socket.emit('target_degree', { message: 'Connected !!!!' });
    socket.on('connection', function (data) {
        console.log(data);
    });
    
    socket.on('atime', function (data) {

    });
    socket.on('JSON', function (datas) {
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            let input = new Input(data);
            var timeStamp = null;
            input.save(function (err, input) {
                if (input == undefined)
                    return;
                Input.
                    findOne({ _id: input.id }).
                    populate('device', 'id', Device). // only return the Persons name
                    exec(function (err, input) {
                        //if (err) return handleError(err);
                        timeStamp = input.timeStamp;
                        io.sockets.emit('value_updated', { timestamp: timeStamp, device: input.device.id, value: input.value });
                    });

                Input.deleteMany({ timeStamp: { $lt: input.timeStamp - (5 * 60000) } }, function (err) { });
            });
        }
        //var jsonStr = JSON.stringify(data);
        //var parsed = ParseJson(jsonStr);
    });
    socket.on('arduino', function (data) {
        io.sockets.emit('arduino', { message: 'R0' });
        console.log(data);
    });

    socket.on('target_degree', function (data) {
        let targetDegree = new target_degree(data);
        var timeStamp = null;
        targetDegree.save(function (err, input) {
            if (input == undefined)
                return;
            target_degree.
                findOne({ _id: input.id }). // only return the Persons name
                exec(function (err, input) {
                        io.sockets.emit('target_degree', input);
                    });
            target_degree.deleteMany({ timeStamp: { $lt: input.timeStamp - (5 * 60000) } }, function (err) { });
            });
    });

    socket.on('room_state', function (data) {
        console.log("Connected");
        console.log("Connected1");
        console.log("Connected2");
        console.log(data);
        let roomState = new room_state(data);
        roomState.save(function (err, input) {
            if (input == undefined)
                return;
            room_state.
                findOne({ _id: input.id }). // only return the Persons name
                exec(function (err, input) {
                        io.sockets.emit('room_state', input);
                    });
            room_state.deleteMany({ timeStamp: { $lt: input.timeStamp - (5 * 60000) } }, function (err) { });
            });
    });
});

http.listen((process.env.PORT || 5000), function () {
    console.log('listening on *:5000');
});