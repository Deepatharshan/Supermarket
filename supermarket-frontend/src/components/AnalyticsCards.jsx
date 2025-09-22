import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function AnalyticsCards({ products }) {
  // Calculate analytics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const averagePrice = totalProducts > 0 ? products.reduce((sum, product) => sum + product.price, 0) / totalProducts : 0;
  const lowStockProducts = products.filter(product => product.quantity < 10).length;
  const outOfStockProducts = products.filter(product => product.quantity === 0).length;

  const cards = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: 'bi-box',
      color: 'primary',
      subtitle: 'Items in inventory'
    },
    {
      title: 'Total Value',
      value: `$${totalValue.toFixed(2)}`,
      icon: 'bi-currency-dollar',
      color: 'success',
      subtitle: 'Inventory worth'
    },
    {
      title: 'Average Price',
      value: `$${averagePrice.toFixed(2)}`,
      icon: 'bi-graph-up',
      color: 'info',
      subtitle: 'Per product'
    },
    {
      title: 'Low Stock',
      value: lowStockProducts,
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      subtitle: 'Items < 10 units'
    },
    {
      title: 'Out of Stock',
      value: outOfStockProducts,
      icon: 'bi-x-circle',
      color: 'danger',
      subtitle: 'Items = 0 units'
    },
    {
      title: 'Stock Status',
      value: `${((totalProducts - outOfStockProducts) / totalProducts * 100).toFixed(1)}%`,
      icon: 'bi-check-circle',
      color: 'success',
      subtitle: 'In stock ratio'
    }
  ];

  return (
    <Row className="g-4 mb-4">
      {cards.map((card, index) => (
        <Col key={index} xs={12} sm={6} lg={4} xl={2}>
          <Card className={`border-0 shadow-sm h-100 bg-${card.color} bg-opacity-10`}>
            <Card.Body className="text-center">
              <div className={`text-${card.color} mb-3`}>
                <i className={`bi ${card.icon}`} style={{ fontSize: '2rem' }}></i>
              </div>
              <h3 className={`text-${card.color} mb-1`}>{card.value}</h3>
              <h6 className="text-muted mb-1">{card.title}</h6>
              <small className="text-muted">{card.subtitle}</small>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
