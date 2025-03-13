const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Calculator API endpoint
app.post('/api/calculate', (req, res) => {
  try {
    const { num1, num2, operator } = req.body;
    
    // Convert to integers (this is where overflow can happen)
    const a = parseInt(num1);
    const b = parseInt(num2);
    
    let result;
    
    switch (operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        if (b === 0) {
          return res.status(400).json({ error: 'Division by zero is not allowed' });
        }
        result = Math.floor(a / b); // Integer division
        break;
      default:
        return res.status(400).json({ error: 'Invalid operator' });
    }
    
    res.json({ result: result.toString() });
  } catch (error) {
    res.status(500).json({ error: 'Calculation error', details: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; 