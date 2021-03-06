// schematic for a counselor record

import mongoose from 'mongoose';
mongoose.pluralize(null); // Prevent database from pluralizing

const schema = mongoose.Schema({
    name: String,
    counsEmail: {type:String, required:true, unique: true},
    receiveEmail: {type:Boolean ,required:true}
});

const counsellorEmail = mongoose.model('counsellorEmail', schema);

export default counsellorEmail;
