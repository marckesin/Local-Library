const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const BookInstanceSchema = new mongoose.Schema(
    {
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
        imprint: { type: String, required: true },
        status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
        // due_back: { type: Date, default: Date.now() }
        due_back: { type: Date, default: Date.now() }
    }
);

BookInstanceSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });

BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
        // return DateTime.fromJSDate(this.due_back).setLocale('br').toLocaleString(DateTime.DATE_HUGE);
        return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_FULL);
    });

module.exports = mongoose.model('BookInstance', BookInstanceSchema);