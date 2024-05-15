import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';
import "../css/darkbackground.css";

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const styles = {
    ulStyle: {
      listStylePosition: 'outside',
      paddingLeft: 20,
    },
    subtitleContainerStyle: {
      marginTop: 10,
      marginBottom: 10,
    },
    subtitleStyle: {
      display: 'inline-block',
    },
    inlineChild: {
      display: 'inline-block',
    },
    itemStyle: {
      marginBottom: 10,
    },
  };

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const toggleExpand = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div id="/experience">
    <div id="stars" />
    <div id="stars2" />
    <div id="stars3" />
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={{ height: '70vh' }}>
            <div className="timeline-container">
              <Timeline lineColor={theme.timelineLineColor}>
                {data.map((item, index) => (
                  <TimelineItem
                    key={`${item.title}-${item.dateText}-${index}`}
                    dateText={item.dateText}
                    dateInnerStyle={{ background: theme.accentColor }}
                    style={styles.itemStyle}
                    bodyContainerStyle={{ color: theme.color }}
                    isExpanded={expandedItems[index] || false}
                  >
                    <Fade>
                      <h2 className="item-title">{item.title}</h2>
                    </Fade>
                    <div style={styles.subtitleContainerStyle}>
                      <Fade>
                        <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                      </Fade>
                      {item.workType && (
                        <Fade>
                          <h5 style={styles.inlineChild}> &nbsp;·&nbsp;{item.workType} </h5>
                        </Fade>
                      )}
                    </div>
                    <Fade>
                      <button onClick={() => toggleExpand(index)}>
                        {expandedItems[index] ? '- Collapse' : '+ Expand'}
                      </button>
                    </Fade>
                    {expandedItems[index] && (
                      <Fade>
                        <ul style={styles.ulStyle}>
                          {Array.isArray(item.workDescription) ? (
                            item.workDescription.map((point, pointIndex) => (
                              <li key={`${index}-${pointIndex}`}>{point}</li>
                            ))
                          ) : (
                            <li>{item.workDescription}</li>
                          )}
                        </ul>
                      </Fade>
                    )}
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;