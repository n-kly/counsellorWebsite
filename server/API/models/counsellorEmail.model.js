import mongoose from 'mongoose';
mongoose.pluralize(null); // Prevent database from pluralizing

const schema = mongoose.Schema({
    name: {type:String, required:true},
    counsEmail: {type:String, required:true},
});

const counsellorEmail = mongoose.model('counsellorEmail', schema);

export default counsellorEmail;
