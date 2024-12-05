const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 const salesRouter = require('./Routes/Sales.route');  
const inventoryRouter = require('./Routes/Inventory.routes'); 
const customerRouter = require('./Routes/Customers.route');  
const Inventory = require('./Models/Inventory.model')
 
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
const PORT = process.env.PORT ;


// Routes
app.use('/api/sales', salesRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/customers', customerRouter); 

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
  
      // Initialize Change Stream
      const inventoryChangeStream = Inventory.watch();
  
      inventoryChangeStream.on('change', (change) => {
          console.log('Change detected:', change);
          if (change.operationType === 'insert') {
              console.log('New inventory item added:', change.fullDocument);
          } else if (change.operationType === 'update') {
              console.log('Inventory item updated:', change.updateDescription.updatedFields);
          } else if (change.operationType === 'delete') {
              console.log('Inventory item deleted:', change.documentKey._id);
          }
      });
  
      inventoryChangeStream.on('error', (err) => {
          console.error('Change stream error:', err);
      });
    })
    .catch(err => console.log('Failed to connect to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
