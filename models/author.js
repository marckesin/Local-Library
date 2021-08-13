const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const AuthorSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true, max: 100 },
        family_name: { type: String, required: true, max: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

AuthorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

AuthorSchema
    .virtual('lifespan')
    .get(function () {
        // return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
        return this.date_of_birth && this.date_of_death
            ? (`${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}`)
            : this.date_of_birth
            ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
            : '';
    });

AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });


module.exports = mongoose.model('Author', AuthorSchema);