import mongoose from 'mongoose';
mongoose.pluralize(null);

const schema = mongoose.Schema({ //change true
    aptDate: {type:Date, required:false},
    status: {type:String, required:false},
    booking: {
        uniName: String,
        uniRepName: String,
        uniRepJobTitle: String,
        uniRepEmail: String,
        uniRegion: String
    },
});

const bookingDateInfo = mongoose.model('bookingDateInfo', schema);

export default bookingDateInfo;