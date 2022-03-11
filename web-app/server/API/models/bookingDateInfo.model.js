// schematic for a booking record

import mongoose from 'mongoose';
mongoose.pluralize(null); // Prevent database from pluralizing

const schema = mongoose.Schema({
    aptDate: { type: Date, required: true, unique: true },
    status: { type: String, required: true },
    booking: {
        uniName: String,
        uniRepName: String,
        uniRepJobTitle: String,
        uniRepEmail: String,
        uniRegion: String,
        logoUrl: String,
    },
});

const bookingDateInfo = mongoose.model('bookingDateInfo', schema);

export default bookingDateInfo;
