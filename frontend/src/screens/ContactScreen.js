import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emailTo = 'd.libotte78@gmail.com';
  const mailtoHref = `mailto:${emailTo}?subject=Message de ${name}&body=${message}`;

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Contactez-nous</h2>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Entrez votre message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Button variant="danger" className="mt-3" href={mailtoHref} target="_blank">
                Envoyer
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ContactScreen;
