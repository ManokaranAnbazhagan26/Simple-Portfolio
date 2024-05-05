import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';





function Certifications() {
  const certifications = [
    {
        name: 'Foundation of Project Management',
        image: './path-to-your-image.jpg', // replace with the path to your image
        issuingOrganization: 'Google',
        issueDate: 'Month Year', // replace with the actual issue date
        credentialId: 'Your Credential ID', // replace with your actual credential ID
        credentialUrl: 'https://www.your-credential-url.com', // replace with your actual credential URL
      },
      {
        name: 'Meta Front-End Developer',
        image: './path-to-your-image.jpg', // replace with the path to your image
        issuingOrganization: 'Meta',
        issueDate: 'Month Year', // replace with the actual issue date
        credentialId: 'Your Credential ID', // replace with your actual credential ID
        credentialUrl: 'https://www.your-credential-url.com', // replace with your actual credential URL
      },
      {
        name: 'IBM Full Stack Software Developer Professional Certificate',
        image: './path-to-your-image.jpg', // replace with the path to your image
        issuingOrganization: 'IBM',
        issueDate: 'Month Year', // replace with the actual issue date
        credentialId: 'Your Credential ID', // replace with your actual credential ID
        credentialUrl: 'https://www.your-credential-url.com', // replace with your actual credential URL
      },
      {
        name: 'Google Advanced Data Analytics',
        image: './path-to-your-image.jpg', // replace with the path to your image
        issuingOrganization: 'Google',
        issueDate: 'Month Year', // replace with the actual issue date
        credentialId: 'Your Credential ID', // replace with your actual credential ID
        credentialUrl: 'https://www.your-credential-url.com', // replace with your actual credential URL
      },
      {
        name: 'Fundamentals of AI & ML: Introduction to Artificial Intelligence',
        image: './path-to-your-image.jpg', // replace with the path to your image
        issuingOrganization: 'Unknown',
        issueDate: 'Month Year', // replace with the actual issue date
        credentialId: 'Your Credential ID', // replace with your actual credential ID
        credentialUrl: 'https://www.your-credential-url.com', // replace with your actual credential URL
      },
      // Add more certifications here...
    ];


    return (
      <div className="certifications-container">
        <h1 className="certifications-title">Certifications</h1>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          navigation={true}
          breakpoints={{
            '(min-width: 768px)': {
              slidesPerView: 1, // Show only center card on larger screens
            },}}
          pagination={{ clickable: true }}
        >
          {certifications.map((certification, index) => (
            <SwiperSlide key={index}>
              <div className="certification-item">
                <h2 className="certification-item-name">{certification.name}</h2>
                <img
                  className="certification-item-image"
                  src={certification.image}
                  alt={certification.name}
                />
                <h3 className="certification-item-issuer">
                  Issuing Organization: {certification.issuingOrganization}
                </h3>
                <h4 className="certification-item-issue-date">
                  Issue Date: {certification.issueDate}
                </h4>
                <p className="certification-item-id">
                  Credential ID: {certification.credentialId}
                </p>
                <a
                  className="certification-item-link"
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Credential
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

export default Certifications;