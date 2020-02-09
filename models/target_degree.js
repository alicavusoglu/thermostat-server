import mongoose from 'mongoose';
import { Decimal128 } from 'mongodb';
const Schema = mongoose.Schema;
const TargetDegree = new Schema({
    user:{type:String},
    timeStamp: { type: Date, default: Date.now },
    value: { type: Decimal128 },
    is_working:{type:Boolean}
});
export default mongoose.model('target_degree', TargetDegree);