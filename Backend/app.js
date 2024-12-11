const express = require('express');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const salesRouter = require('./Routes/Sales.route');
const inventoryRouter = require('./Routes/Inventory.routes');
const customerRouter = require('./Routes/Customers.route');
const Inventory = require('./Models/Inventory.model');
const Customer = require('./Models/Customers.model')

require('dotenv').config();

const app = express();

const cors = require('cors');

// Allow specific origins
app.use(cors({
  ORIGIN: ['*'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  AllowedOrigin: ['*'],

}));


// Middleware
app.use(bodyParser.json());
const PORT = process.env.PORT;


// Routes
app.use('/api/sales', salesRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/customers', customerRouter);


const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('Client connected');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    const inventoryChangeStream = Inventory.watch();

    inventoryChangeStream.on('change', (change) => {
      console.log('Change detected:', change);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(change));
        }
      });
    });

    inventoryChangeStream.on('error', (err) => {
      console.error('Change stream error:', err);
    });

    //Update loyalty points on the first day of every month at midnight
    cron.schedule('0 0 1 * *', async () => {
      try {
        console.log('Running scheduled loyalty points update...');
        await Customer.updateMany({}, { $inc: { loyaltyPoints: 10 } });
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message: 'Loyalty points updated successfully.' }));
          }
        });

        console.log('Loyalty points updated successfully.');
      } catch (err) {
        console.error('Error updating loyalty points:', err);
      }
    });
  })


  .catch(err => console.log('Failed to connect to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
