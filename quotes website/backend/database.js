import mongoose from "mongoose";

const connectToDb = async () => {

    mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quotes')
    .then((conn) => {
        console.log(`Connected to DB: ${conn.connection.host}`);
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1)
    })
}

export default connectToDb;