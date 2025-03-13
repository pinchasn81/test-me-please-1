const request = require('supertest');
const app = require('../server');

describe('Calculator API Tests', () => {
  // Test 1: Basic Addition
  test('should correctly add two numbers', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({
        num1: '5',
        num2: '3',
        operator: '+'
      });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe('8');
  });

  // Test 2: Division by Zero
  test('should handle division by zero', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({
        num1: '10',
        num2: '0',
        operator: '/'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Division by zero is not allowed');
  });

  // Test 3: Invalid Operator
  test('should reject invalid operators', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({
        num1: '5',
        num2: '3',
        operator: '%'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid operator');
  });

  // Test 4: Large Numbers (This will fail due to integer overflow bug)
  test('should handle large number multiplication correctly', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({
        num1: '999999999',
        num2: '999999999',
        operator: '*'
      });

    expect(response.status).toBe(200);
    // This will fail because JavaScript's number handling will cause overflow
    expect(response.body.result).toBe('999999998000000001');
  });

  // Test 5: Decimal Numbers
  test('should handle decimal division with floor', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({
        num1: '7',
        num2: '2',
        operator: '/'
      });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe('3'); // Should floor 3.5 to 3
  });
}); 