var mongoose = require('mongoose');

mongoose.connect(
    `mongodb+srv://john:john@cluster0-gdyxb.mongodb.net/docs?retryWrites=true`,
    {useNewUrlParser: true}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});
