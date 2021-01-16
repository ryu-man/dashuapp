const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Check if running on production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
} else {
	require("dotenv").config();
}

// useFindAndModify to use query like "findOneAupdate"
mongoose.set("useFindAndModify", false);
// Connect to the Database
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on('connected', ()=>(console.log("connected to Dashu DB...")))


// Setup routers
require("./routes/auth")(app);
require("./routes/agency")(app);

// Error handling middleware
app.use((req, res, next, err) => {
	if (err) {
		console.log(err);
	}
});

// Start listening
app.listen(process.env.PORT || 9090, () => {
	console.log("Dashu server started...");
});
