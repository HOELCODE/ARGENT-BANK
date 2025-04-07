import React from 'react';

// Layout
import Footer from './layout/Footer.jsx';
import Navbar from './layout/Navbar.jsx';

// Routes
import AppRouter from './routes/Router.jsx';

// Css
import './css/main.css'

const App = () => {

  return (
    <>
    <Navbar />
    <AppRouter />
    <Footer />
    </>
  )
}

export default App
