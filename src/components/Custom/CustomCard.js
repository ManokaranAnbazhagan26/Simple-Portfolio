import React, { useContext, useState } from 'react';
import { Button, Card, Badge, Col, Modal, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { FaRegCheckCircle } from 'react-icons/fa';
import '../Custom/customcard.css';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
};

const CustomCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;
  const { SectionType } = props;
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const truncateBodyText = (text) => {
    const lines = text.split(/\r\n|\r|\n/);
    if (lines.length > 2) {
      return showMore ? text : `${lines[0]}\n${lines[1]}...`;
    }
    return text;
  };

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <div className="img-overlay">
          <Card.Img
            variant="top"
            src={SectionType?.image}
            onClick={handleShow}
            style={{ cursor: 'pointer' }}
            className="img-hover-zoom"
          />
        </div>
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{SectionType.title}</Card.Title>
          {SectionType.bodyText && (
            <Card.Text style={styles.cardTextStyle}>
              {parseBodyText(truncateBodyText(SectionType.bodyText))}
              {SectionType.bodyText.split(/\r\n|\r|\n/).length > 2 && (
                <Button variant="link" onClick={toggleShowMore}>
                  {showMore ? 'Read Less' : 'Read More'}
                </Button>
              )}
            </Card.Text>
          )}
        </Card.Body>
        <Card.Body>
          {SectionType?.links?.map((link) => (
            <Button
              key={link.href}
              style={styles.buttonStyle}
              variant={`outline-${theme.bsSecondaryVariant} contrast-dark`}
              onClick={() => window.open(link.href, '_blank')}
            >
              {link.text}
            </Button>
          ))}
        </Card.Body>
        {SectionType.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {SectionType.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
        {SectionType.credentialUrl && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            <Button
              variant={`outline-${theme.bsSecondaryVariant} contrast-dark`}
              href={SectionType.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Credential <FaRegCheckCircle />
            </Button>
          </Card.Footer>
        )}
        <Modal size="lg" show={showModal} onHide={handleClose}>
          <Modal.Body>
            <Image src={SectionType.image} fluid />
          </Modal.Body>
        </Modal>
      </Card>
    </Col>
  );
};

CustomCard.propTypes = {
  SectionType: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
    credentialUrl: PropTypes.string,
  }).isRequired,
};

export default CustomCard;