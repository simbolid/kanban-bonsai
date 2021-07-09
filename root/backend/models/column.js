const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [
    {
      title: {
        type: String,
        required: true,
      },
    },
  ],
});

// converting the ID field to a string makes testing easier
columnSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.cards.forEach((card) => {
      card.id = card._id.toString();
      delete card._id;
    });
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Column', columnSchema);