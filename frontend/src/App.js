import React from 'react';
import AnimalCard from "./components/AnimalCard"
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FoodTypeCard from './components/FoodTypeCard';
import FoodTypeList from './components/FoodTypeList';

function App() {
    const animalId = 13
    return (
        <div>
            <HomePage />
        </div>
        
    );
}

export default App;
