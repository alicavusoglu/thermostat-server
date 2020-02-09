import mongoose from 'mongoose';
import { Decimal128 } from 'mongodb';
const Schema = mongoose.Schema;
const RoomStateModel = new Schema({
    value: {type:Decimal128 },
    timeStamp: { type: Date, default: Date.now },
    is_working:{type:Boolean}
});
export default mongoose.model('room_state', RoomStateModel);