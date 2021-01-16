const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// useFindAndModify to use query like "findOneAupdate"
mongoose.set("useFindAndModify", false);

// Setup routers
require("./routes/auth")(app);
require("./routes/agency")(app);

// Error handling middleware
app.use((req, res, next, err) => {
	if (err) {
		console.log(err);
	}
});

// Check if running on production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/public")))

} else {
	require("dotenv").config();
}

// Start listening
app.listen(process.env.PORT, () => {
	// Connect to the Database
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((db) => {
			console.log("Dashu db connected...");
		})
		.catch((err) => {
			console.log(err);
		});
	console.log("Dashu server started...");
});
