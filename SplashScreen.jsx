import React, { useState, useEffect } from 'react';

const SplashScreen = ({ isFading }) => {
    return (
        <div style={{
            ...styles.container,
            // Apply opacity 0 if isFading is true, otherwise 1
            opacity: isFading ? 0 : 1,
            // Smooth transition for the opacity change
            transition: 'opacity 1s ease-in-out'
        }}>
            <img
                src="/porsche-logo.png"
                alt="Porsche Logo"
                style={styles.logo}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000',
        position: 'fixed', // Keep it on top of everything
        top: 0,
        left: 0,
        zIndex: 9999,
    },
    logo: {
        width: '250px',
        // Initial fade-in when the app first loads
        animation: 'fadeIn 2s ease-in-out',
    }
};

export default SplashScreen;