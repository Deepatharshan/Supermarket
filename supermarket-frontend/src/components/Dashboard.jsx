import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../dashboard.css';
import API from '../api';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import AnalyticsCards from './AnalyticsCards';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProducts(); 
  }, []);

  const handleAdd = async (productData) => {
    const exists = products.some(
      p => p.name.trim().toLowerCase() === productData.name.trim().toLowerCase()
    );
    if (exists) {
      throw new Error('A product with that name already exists.');
    }

    const res = await API.post('/products', productData);
    setProducts(prev => [res.data, ...prev]);
    setShowAddModal(false);
    toast.success('✅ Product added successfully!');
  };

  const handleUpdate = async (id, productData) => {
    const exists = products.some(
      p => p.id !== id && p.name.trim().toLowerCase() === productData.name.trim().toLowerCase()
    );
    if (exists) {
      throw new Error('Another product with that name already exists.');
    }

    const res = await API.put(`/products/${id}`, productData);
    setProducts(prev => prev.map(p => p.id === id ? res.data : p));
    setEditingProduct(null);
    toast.info('✏️ Product updated successfully!');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await API.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.warn('🗑️ Product deleted');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="dashboard">
      {/* Top Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <i className="bi bi-shop me-2"></i>
            Supermarket Dashboard
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="sidebar" 
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col lg={3} xl={2} className="d-none d-lg-block sidebar">
            <Card className="h-100">
              <Card.Body className="p-0">
                <Nav className="flex-column">
                  <Nav.Link href="#" className="active">
                    <i className="bi bi-house-door me-2"></i>
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href="#">
                    <i className="bi bi-box me-2"></i>
                    Products
                  </Nav.Link>
                  <Nav.Link href="#">
                    <i className="bi bi-graph-up me-2"></i>
                    Analytics
                  </Nav.Link>
                  <Nav.Link href="#">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col lg={9} xl={10}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Dashboard Overview</h2>
              <Button 
                variant="primary" 
                onClick={() => setShowAddModal(true)}
                className="d-flex align-items-center"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Product
              </Button>
            </div>

            {/* Analytics Cards */}
            <AnalyticsCards products={products} />

            {/* Products Section */}
            <Card className="mt-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Products Management</h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="bi bi-plus me-1"></i>
                  Add Product
                </Button>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <ProductList
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Add/Edit Product Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
          />
        </Modal.Body>
      </Modal>

      {/* Mobile Sidebar Offcanvas */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#" className="active">
              <i className="bi bi-house-door me-2"></i>
              Dashboard
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-box me-2"></i>
              Products
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-graph-up me-2"></i>
              Analytics
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-gear me-2"></i>
              Settings
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
