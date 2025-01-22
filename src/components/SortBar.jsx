import React, { useState, useEffect } from 'react';

function SortBar({ setFilters, handleSort, setCars }) {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cars')
      .then(response => response.json())
      .then(data => {
        const uniqueMakes = Array.from(new Set(data.map(car => car.make)));
        const uniqueModels = Array.from(new Set(data.map(car => car.model)));
        const uniqueTransmissions = Array.from(new Set(data.map(car => car.transmission)));
        const uniquePriceRanges = Array.from(new Set(data.map(car => getPriceRange(car.price))));
  
        setMakes(uniqueMakes);
        setModels(uniqueModels);
        setTransmissions(uniqueTransmissions);
        setPriceRange(uniquePriceRanges);
        setCars(data); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    const handleMakeChange = (e) => {
    const selectedMake = e.target.value;
    setFilters(prev => ({ ...prev, make: selectedMake }));
  };

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setFilters(prev => ({ ...prev, model: selectedModel }));
  };

  const handleTransmissionChange = (e) => {
    const selectedTransmission = e.target.value;
    setFilters(prev => ({ ...prev, transmission: selectedTransmission }));
  };

  const handlePriceRangeChange = (e) => {
    const selectedPriceRange = e.target.value;
    setFilters(prev => ({ ...prev, price: selectedPriceRange }));
  };

  const getPriceRange = (price) => {
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    if (numericPrice < 5000) {
      return 'Below KSH 5,000';
    } else if (numericPrice >= 5000 && numericPrice < 10000) {
      return 'KSH 5,000 - KSH 10,000';
    } else if (numericPrice >= 10000 && numericPrice < 15000) {
      return 'KSH 10,000 - KSH 15,000';
    }else if (numericPrice >= 15000 && numericPrice < 20000) {
      return 'KSH 15,000 - KSH 20,000';
    }else {
      return 'Above KSH 20,000';
    }
  };

  return (
    <div className="sort-bar">
      <label>Make:</label>
      <select onChange={handleMakeChange}>
        <option value="">All</option>
        {makes.map((make, index) => (
          <option key={index} value={make}>{make}</option>
        ))}
      </select>

      <label>Model:</label>
      <select onChange={handleModelChange}>
        <option value="">All</option>
        {models.map((model, index) => (
          <option key={index} value={model}>{model}</option>
        ))}
      </select>

      <label>Transmission:</label>
      <select onChange={handleTransmissionChange}>
        <option value="">All</option>
        {transmissions.map((transmission, index) => (
          <option key={index} value={transmission}>{transmission}</option>
        ))}
      </select>

      <label>Price Range:</label>
      <select onChange={handlePriceRangeChange}>
        <option value="">All</option>
        {priceRange.map((range, index) => (
          <option key={index} value={range}>{range}</option>
        ))}
      </select>

      <button onClick={handleSort}>Sort</button>
    </div>
  );
}

export default SortBar;
