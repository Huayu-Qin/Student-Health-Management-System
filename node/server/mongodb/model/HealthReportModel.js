const mongoose = require('../db')
const Schema = mongoose.Schema

//  user module
const schema = new Schema({
  username: {type: String, required: true},
  name: {type: String, required: true},
  sex: {type: String},
  age: {type:Number},
  stature: {type:Number},
  weight: {type:Number},

  cholesterol: {type: Number},
  hdlc: {type: Number},
  smoke: {type: String},
  sbp: {type: Number},

  high_blood_pressure: {type: Number},
  low_blood_pressure: {type: Number},

  heart_disease_score: {type:Number},
  heart_disease_probability: {type:String},
  bmi: {type:Number},

  create_time: {type: Date, default: Date.now},
})

module.exports = mongoose.model('HealthReport', schema, 'tb_health_report')
