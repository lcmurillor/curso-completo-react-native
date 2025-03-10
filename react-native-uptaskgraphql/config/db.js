const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });


const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    console.log('Base de datos conectadas');
    
  } catch (error) {
     // Ensures that the client will close when you finish/error
     await client.close();
    console.log('Hubo un error');
    console.log(error);
    process.exit(1); //detiene la app
  }
};
module.exports = conectarDB;