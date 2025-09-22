import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const EMPTY = { name: '', sku: '', description: '', price: 0, quantity: 0 };

export default function ProductForm({ onAdd, onUpdate, editingProduct, setEditingProduct }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || '',
        sku: editingProduct.sku || '',
        description: editingProduct.description || '',
        price: editingProduct.price ?? 0,
        quantity: editingProduct.quantity ?? 0,
      });
    } else {
      setForm(EMPTY);
    }
    setError('');
    setFieldErrors({});
  }, [editingProduct]);

  const validateField = (name, value) => {
    if (name === 'name') {
      if (!value || value.trim().length === 0) {
        return 'Product name is required and cannot be empty';
      }
      if (value.trim().length < 2) {
        return 'Product name must be at least 2 characters long';
      }
    }
    
    if (name === 'price') {
      if (!value || value === '' || value === null || value === undefined) {
        return 'Price is required and cannot be empty';
      }
      
      const priceValue = Number(value);
      if (isNaN(priceValue)) {
        return 'Price must be a valid number';
      }
      if (priceValue <= 0) {
        return 'Price must be greater than 0';
      }
      
      const priceStr = value.toString();
      if (!/^\d+(\.\d{1,2})?$/.test(priceStr)) {
        return 'Price must have up to 2 decimal places (e.g., 10.50)';
      }
      
      if (priceValue > 999999.99) {
        return 'Price must be less than 1,000,000.00';
      }
    }
    
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // force numeric conversion for price & quantity
    if (name === 'price' || name === 'quantity') {
      const num = value === '' ? 0 : Number(value);
      setForm(f => ({ ...f, [name]: num }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
    
    // Validate field and update field errors
    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
    
    // Clear main error if field becomes valid
    if (!fieldError) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check for any field errors first
    const hasFieldErrors = Object.values(fieldErrors).some(error => error !== null);
    if (hasFieldErrors) {
      setError('Please fix the validation errors before submitting');
      return;
    }

    // Validate product name - must not be empty and minimum 2 characters
    if (!form.name || form.name.trim().length === 0) {
      setError('Product name is required and cannot be empty');
      return;
    }
    if (form.name.trim().length < 2) {
      setError('Product name must be at least 2 characters long');
      return;
    }

    // Validate price - must not be empty, must be positive, and have proper decimal format
    if (!form.price || form.price === '' || form.price === null || form.price === undefined) {
      setError('Price is required and cannot be empty');
      return;
    }

    // Convert to number and validate
    const priceValue = Number(form.price);
    if (isNaN(priceValue)) {
      setError('Price must be a valid number');
      return;
    }
    if (priceValue <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    // Check for valid decimal format (up to 2 decimal places)
    const priceStr = form.price.toString();
    if (!/^\d+(\.\d{1,2})?$/.test(priceStr)) {
      setError('Price must be a valid number with up to 2 decimal places (e.g., 10.50)');
      return;
    }
    
    // Check if price exceeds reasonable limit
    if (priceValue > 999999.99) {
      setError('Price must be less than 1,000,000.00');
      return;
    }

    // Validate quantity
    if (Number(form.quantity) < 0) {
      setError('Quantity must be >= 0');
      return;
    }

    setSaving(true);
    try {
      if (editingProduct) {
        await onUpdate(editingProduct.id, form);
      } else {
        await onAdd(form);
      }
      setForm(EMPTY);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold">Product Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              isInvalid={!!fieldErrors.name}
              required
            />
            {fieldErrors.name && (
              <Form.Control.Feedback type="invalid">
                {fieldErrors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold">Price *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0.01"
              max="999999.99"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              isInvalid={!!fieldErrors.price}
              required
            />
            {fieldErrors.price ? (
              <Form.Control.Feedback type="invalid">
                {fieldErrors.price}
              </Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">
                Enter a price greater than 0 with up to 2 decimal places (e.g., 10.50)
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Quantity *</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2 justify-content-end">
        <Button variant="secondary" onClick={() => setEditingProduct?.(null)}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          type="submit" 
          disabled={saving || Object.values(fieldErrors).some(error => error !== null)}
        >
          {saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
        </Button>
      </div>
    </Form>
  );
}
