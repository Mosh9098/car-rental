import React from 'react';
import CarRentalPage from './components/CarRentalPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <CarRentalPage />
      <Footer/>
    </div>
  );
}

export default App;
