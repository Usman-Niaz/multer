import {app} from './app.js'
import { dbConnection } from './config/dbConnection.js'

const PORT = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;
(async ()=>{
    try {
        const mongodbconnection= await dbConnection(uri)
        console.log(`MongoDB Connection Successful DB Name: ${mongodbconnection.connection.name}`);
        app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
    } catch (error) {
        console.log("Error:",error)
    }
})()