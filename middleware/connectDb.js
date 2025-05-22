import mongoose from "mongoose"

const superChef = async () =>{
    try {
        const conn = await mongoose.createConnection(process.env.MONGO_SUPERCHEF_URI);
        return conn;
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}

const connectDb = async () => {
    const chefConn = await superChef();

    return{chefConn}
}

export default connectDb;