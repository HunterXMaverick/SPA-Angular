;
'use strict'

const mongoose = require('mongoose'),
    {   USER_DB,
        PASS_DB,
        HOST_DB,
        NAME_DB
    } = process.env

    mongoUrl = `mongodb+srv://${USER_DB}:${PASS_DB}@${HOST_DB}/${NAME_DB}?retryWrites=true&w=majority`
    
let connection,
    connectDB = async () => {
        if (connection) return connection

        try {
            connection = await mongoose.connect(`${mongoUrl}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

            console.log('DB conectada....')
        } catch (error) {
            console.log(error);
            process.exit(1);
        }

        return connection
    }
    
module.exports = connectDB
