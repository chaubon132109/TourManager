const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const bookingSchema = new Schema(
  {
    note: {
      type: String,
    },
    dateStart: {
        type: Date,
        require : [true, 'Booking must belong to date start.']
    },
    price: {
        type : Number,
        required: [true, 'Booking must belong to price.'],
    },
    tour: {
      type: ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to a tour.'],
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a user'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    paid: {
        type: Boolean,
        default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar',
  });
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);