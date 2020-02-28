window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
        console.log('Registering ServiceWorker');
        navigator.serviceWorker
               .register('./sw.js');
    } else {
        console.log('ServiceWorker not available');
    }
  };