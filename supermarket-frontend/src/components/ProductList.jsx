import React from 'react';
import { Table, Button, Badge, Row, Col } from 'react-bootstrap';

export default function ProductList({ products, onEdit, onDelete }) {
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { variant: 'danger', text: 'Out of Stock' };
    if (quantity < 10) return { variant: 'warning', text: 'Low Stock' };
    return { variant: 'success', text: 'In Stock' };
  };

  return (
    <div className="table-responsive">
      {products.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-box text-muted" style={{ fontSize: '3rem' }}></i>
          <h5 className="text-muted mt-3">No products found</h5>
          <p className="text-muted">Add your first product to get started</p>
        </div>
      ) : (
        <Table hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Total Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const stockStatus = getStockStatus(product.quantity);
              const totalValue = product.price * product.quantity;
              
              return (
                <tr key={product.id}>
                  <td>
                    <div>
                      <strong>{product.name}</strong>
                      {product.description && (
                        <div className="text-muted small">{product.description}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <code className="text-muted">{product.sku || 'N/A'}</code>
                  </td>
                  <td>
                    <strong>${Number(product.price).toFixed(2)}</strong>
                  </td>
                  <td>
                    <span className="fw-bold">{product.quantity}</span>
                  </td>
                  <td>
                    <Badge bg={stockStatus.variant}>{stockStatus.text}</Badge>
                  </td>
                  <td>
                    <strong className="text-success">${totalValue.toFixed(2)}</strong>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="d-flex align-items-center"
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        className="d-flex align-items-center"
                      >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
