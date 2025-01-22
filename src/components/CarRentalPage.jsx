import React, { useState, useEffect } from 'react';
import CarList from './CarList';
import CarDetails from './CarDetail';
import SortBar from './SortBar';
import RentalForm from './RentalForm';
import NavBar from './NavBar';

function CarRentalPage() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [filters, setFilters] = useState({ make: '', model: '', transmission: '', price: '' });

  useEffect(() => {
    fetch('http://localhost:3000/cars')  // Ensure your JSON server is running on the correct port
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const handleHire = (car) => {
    setSelectedCar(car);
    setShowRentalForm(true);
  };

  const handleBack = () => {
    setSelectedCar(null);
    setShowRentalForm(false);
  };

  const handleSort = () => {
    let filteredCars = [...cars];
    
    // Apply filters
    if (filters.make) {
      filteredCars = filteredCars.filter(car => car.make === filters.make);
    }
    if (filters.model) {
      filteredCars = filteredCars.filter(car => car.model === filters.model);
    }
    if (filters.transmission) {
      filteredCars = filteredCars.filter(car => car.transmission === filters.transmission);
    }
    if (filters.price) {
      filteredCars = applyPriceFilter(filteredCars, filters.price);
    }
  
    setCars(filteredCars);
  };

  const applyPriceFilter = (cars, priceRange) => {
    return cars.filter(car => {
      const price = parseFloat(car.price.replace(/[^\d.]/g, '')); // Parse price to number
      switch (priceRange) {
        case 'Below KSH 5,000':
          return price < 5000;
        case 'KSH 5,000 - KSH 10,000':
          return price >= 5000 && price < 10000;
        case 'KSH 10,000 - KSH 15,000':
          return price >= 10000 && price < 15000;
        case 'KSH 15,000 - KSH 20,000':
          return price >= 15000 && price < 20000;      
        case 'Above KSH 20,000':
          return price >= 20000;
        default:
          return true;  // If no price range is selected, return all cars
      }
    });
  };

  return (
    <div>
      {/* <h1>CAR RENTAL</h1> */}
      {/* <NavBar /> */}
      <SortBar setFilters={setFilters} handleSort={handleSort} />
      
      {selectedCar && !showRentalForm && (
        <button className='BTC' onClick={handleBack}>Back to Cars</button>
      )}
      
      {!selectedCar && !showRentalForm ? (
        <CarList cars={cars} onCarSelect={handleCarSelect} />
      ) : (
        <div>
          {showRentalForm ? (
            <RentalForm car={selectedCar} onCancel={handleBack} />
          ) : (
            <CarDetails car={selectedCar} onHire={handleHire} />
          )}
        </div>
      )}
    </div>
  );
}

export default CarRentalPage;
