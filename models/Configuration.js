const mongoose = require('mongoose');

const ConfigurationSchema = new mongoose.Schema({
  configurationID: { type: String, required: true, unique: true },
  home: {
    appName: { type: String },
    homeHeadline: { type: String },
    weddingDate: { type: String },
  },
  screenTitles: {
    schedule: { type: String },
    locations: { type: String },
    contacts: { type: String },
    ourStory: { type: String },
  },
  schedule: [{
    time: { type: String },
    title: { type: String },
    description: { type: String },
  }],
  locations: {
    categories: [{
      category: { type: String },
      locations: [{
        name: { type: String },
        lat: { type: Number },
        lng: { type: Number },
        description: { type: String },
      }],
    }],
  },
  contacts: {
    categories: [{
      category: { type: String },
      contacts: [{
        name: { type: String },
        role: { type: String },
        phone: { type: String },
      }],
    }],
  },
  story: { type: String },
  backgroundImage: { type: String },
  theme: {
    colors: {
      primary: { type: String },
      onPrimary: { type: String },
      secondary: { type: String },
      onSecondary: { type: String },
      background: { type: String },
      onBackground: { type: String },
      surface: { type: String },
      onSurface: { type: String },
      drawerHeader: { type: String },
    },
    font: {
      selectedFont: { type: String },
      selectedFontSize: { type: Number },
      isBold: { type: Boolean },
    }
  },
}, { timestamps: true });

module.exports = mongoose.model('Configuration', ConfigurationSchema);
