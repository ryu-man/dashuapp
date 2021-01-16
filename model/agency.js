const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: { type: String },
	wilaya: { type: String },
	commune: { type: String },
	phone: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("agency", schema);

