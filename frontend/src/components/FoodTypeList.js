import React, { useState, useEffect } from 'react';
import FoodTypeCard from './FoodTypeCard';
import { get } from './Api'; 

function FoodTypeList() {
    const [foodTypes, setFoodTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    
    useEffect(() => {
        
        // Функция для загрузки списка FoodType
        const fetchFoodTypes = () => {
            
            get('FoodType?query=F')
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Обновляем состояние списка FoodType
                    setFoodTypes(data.items);
                    setLoading(false);
                })
                .catch(err => {
                    // Обработка ошибки
                    console.error('Ошибка загрузки списка FoodType:', err);
                    setError(err);
                    setLoading(false);
                });
        };

        // Загрузка списка FoodType при монтировании компонента
        fetchFoodTypes();
    }, []);

    // Отображение списка FoodType
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>;

    return (
        <div className="foodtype-list">
            <h2>Список FoodType</h2>
            {/* Использование компонента FoodTypeCard для отображения каждого FoodType */}
            <ul>
                {foodTypes.map(foodType => (
                    <li key={foodType.id}>
                        <FoodTypeCard foodType={foodType} /> {/* Передача каждого foodType в компонент FoodTypeCard */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FoodTypeList;