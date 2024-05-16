import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import CustomCard from './Custom/CustomCard';
import FallbackSpinner from './FallbackSpinner';
import Slider from 'react-slick';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  sliderContainerStyle: {
    padding: '1rem 2rem',
    maxWidth: '100vw',
  },
  centerSlideStyle: {
    transform: 'scale(1.5) translateX(50%)',
    zIndex: 1,
  },
};

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const responsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",
        background: "#ddd", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",
        background: "#ddd", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    centerMode: true,
    centerPadding: '60px',
    initialSlide: 1,
    responsive,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div
        style={{
          ...styles,
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "1px",
        }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
      )
  };

  return (
    <div id="/projects">
      <Header title={header} />
      {data ? (
        <div className="projects-container">
          <Container style={styles.containerStyle}>
            <div style={styles.sliderContainerStyle}>
              <Slider {...settings}>
                {data.projects?.map((project, index) => (
                  <div key={project.title} style={index === 1 ? styles.centerSlideStyle : {}}>
                    <Fade>
                      <CustomCard SectionType={project} />
                    </Fade>
                  </div>
                ))}
              </Slider>
            </div>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;

