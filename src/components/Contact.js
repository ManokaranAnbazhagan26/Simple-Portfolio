import React, { useState, useContext } from 'react';
import Header from './Header';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import Fade from 'react-reveal';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';

function Contact(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enquiry, setEnquiry] = useState('Freelance project proposal');
  const [message, setMessage] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);
  const [showModal, setShowModal] = useState(false); // New state variable for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // New state variable for modal message
  const { header } = props;
  const theme = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation here
    const isValid = validateForm();

    if (isValid) {
      // Prepare form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('enquiry', enquiry);
      formData.append('message', message);

      // Post the form data using fetch
      fetch('https://formspree.io/f/mleqvapr', {
        method: 'POST',
        body: formData,
        redirect: 'manual'  // Add this line
      })
      .then((response) => {
        if (response.type === 'opaqueredirect') {
          // Formspree redirected the request, which means the form submission was successful
          return Promise.resolve({ ok: true });
        } else if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((response) => {
        // Show a success message
        setModalMessage(`Thanks for your submission ${name}, we will get back to you shortly!`);
        setShowModal(true);
      })
      .catch((error) => {
        // Show an error message
        setModalMessage('Something went wrong, please try again later!');
        setShowModal(true);
      });

      // Reset the form fields and touched states
      setName('');
      setEmail('');
      setEnquiry('Freelance project proposal');
      setMessage('');
      setNameTouched(false);
      setEmailTouched(false);
      setMessageTouched(false);
    }
  };

  const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${props => props.theme.cardFooterBackground};
    color: ${props => props.theme.textColor};
  }
  .modal-header,
  .modal-footer {
    border-color: ${props => props.theme.cardBorderColor};
  }
`;

  const validateForm = () => {
    // Add form validation logic here
    // For now, let's just check that all fields are filled and email is valid
    return name.length > 0 && validateEmail(email) && message.length >= 10;
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div id='/contact'>
      <Header title={header} />
      <Container
        style={{
          height: '50vh',
          backgroundColor: theme.cardFooterBackground ,
          borderColor: theme.cardBorderColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade>
          <Row>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    required
                    style={nameTouched && name.length === 0 ? { borderColor: 'red' } : {}}
                  />
                  {nameTouched && name.length === 0 && <div className="error">Name is required</div>}
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    required
                    style={emailTouched && !validateEmail(email) ? { borderColor: 'red' } : {}}
                  />
                  {emailTouched && !validateEmail(email) && <div className="error">Invalid email address</div>}
                </Form.Group>
                <Form.Group controlId="formSubject" className="mb-3">
                  <Form.Control
                    as="select"
                    value={enquiry}
                    className="custom-select"
                    onChange={(e) => setEnquiry(e.target.value)}
                  >
                    <option>Freelance Project Proposal</option>
                    <option>General enquiry</option>
                    <option>Feedback</option>
                    <option>Hire Me</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => setMessageTouched(true)}
                    minLength={10}
                    required
                    style={messageTouched && message.length < 10 ? { borderColor: 'red' } : {}}
                  />
                  {messageTouched && message.length < 10 && <div className="error">Message must be at least 10 characters</div>}
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                  Send Message
                </Button>
              </Form>
            </Col>
            <Col md={6}>
              <div style={{ textAlign: 'center' }}>
                <h2>Get In Touch</h2>
                <p>
                  Whether you want to get in touch, talk about a project collaboration, or just say hi, I'd love to hear from you.
                  Simply fill the form and send me an email.
                </p>
              </div>
            </Col>
          </Row>
        </Fade>
      </Container><StyledModal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submission Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </StyledModal>
    </div>
  );
}

Contact.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Contact;
