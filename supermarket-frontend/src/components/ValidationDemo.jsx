import React from 'react';
import { Card, Alert, ListGroup, Row, Col } from 'react-bootstrap';

export default function ValidationDemo() {
  const validationExamples = [
    {
      field: 'Product Name',
      valid: ['Apple iPhone 15', 'Samsung Galaxy S24', 'MacBook Pro'],
      invalid: ['', 'A', '   ', 'Product with very long name that exceeds reasonable limits']
    },
    {
      field: 'Price',
      valid: ['10', '10.5', '10.50', '999999.99'],
      invalid: ['0', '-5', '10.999', '1000000', 'abc', '', '10.123']
    }
  ];

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Frontend Validation Examples</h5>
      </Card.Header>
      <Card.Body>
        <Alert variant="info">
          <strong>Validation Rules:</strong>
          <ul className="mb-0 mt-2">
            <li><strong>Product Name:</strong> Required, minimum 2 characters, cannot be empty</li>
            <li><strong>Price:</strong> Required, must be greater than 0, up to 2 decimal places, maximum 999,999.99</li>
          </ul>
        </Alert>
        
        {validationExamples.map((example, index) => (
          <div key={index} className="mb-3">
            <h6 className="fw-bold">{example.field} Validation</h6>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0 p-1">
                    <strong className="text-success">✅ Valid Examples:</strong>
                  </ListGroup.Item>
                  {example.valid.map((item, i) => (
                    <ListGroup.Item key={i} className="border-0 py-1 text-success">
                      • {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0 p-1">
                    <strong className="text-danger">❌ Invalid Examples:</strong>
                  </ListGroup.Item>
                  {example.invalid.map((item, i) => (
                    <ListGroup.Item key={i} className="border-0 py-1 text-danger">
                      • {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
