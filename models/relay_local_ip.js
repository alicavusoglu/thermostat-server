import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const RelayLocalIpModel = new Schema({
    ipAddress:{type:String},
    timeStamp: { type: Date, default: Date.now },
});
export default mongoose.model('relay_local_ip', RelayLocalIpModel);