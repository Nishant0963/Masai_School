const express = require('express');
const app = express();
const PORT = 3000;

// Route for Home Page (GET /)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Home Page</h1>');  // Sends an HTML response
});

// Route for About Us Page (GET /aboutus)
app.get('/aboutus', (req, res) => {
  res.json({ message: "Welcome to About Us" });  // Sends a JSON response
});

// Route for Contact Us Page (GET /contactus)
app.get('/contactus', (req, res) => {
  res.json({
    email: "contact@example.com",
    phone: "+123456789",
    address: "123 Main St, City, Country"
  });  // Sends dummy contact details as JSON
});

// Handle any undefined routes (404 error)
app.all('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');  // Respond with a 404 message for unknown routes
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
