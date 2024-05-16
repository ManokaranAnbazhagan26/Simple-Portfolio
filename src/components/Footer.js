import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const Footer = () => {
    const theme = useContext(ThemeContext);
    return (
        <footer style={{backgroundColor: theme.cardFooterBackground, textAlign: 'center', padding: '10px', position: 'fixed', left: '0', bottom: '0', width: '100%'}}>
            <p>Saurabh Patel • © 2024. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
