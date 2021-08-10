import mongoose from 'mongoose';
mongoose.pluralize(null);

const schema = mongoose.Schema({ //change true
    name: {type:String, required:false},
    counsEmail: {type:String, required:false},
});

const counsellorEmail = mongoose.model('counsellorEmail', schema);

export default counsellorEmail;
