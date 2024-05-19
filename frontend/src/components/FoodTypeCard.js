import React, { useState } from 'react';
import {  put, get } from './Api';


function FoodTypeCard({ foodType  }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentFoodType, setCurrentFoodType] = useState(foodType);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentFoodType((prevFoodType) => ({
            ...prevFoodType,
            [name]: value
        }));
    };

    const handleSave = () => {
        put(`FoodType?id=${foodType.id}`, currentFoodType)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(`HTTP error! Status: ${response.status}`);
                }
                
                return get(`FoodType/getById?id=${foodType.id}`)
            })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Преобразуем ответ в формат JSON
            })
            .then((data) => {
                console.log('Обновленные данные получены:', data);
                setCurrentFoodType(data); // Устанавливаем новые данные в `currentFoodType`
                setIsEditing(false); 
                
            })
            .catch((err) => {
                console.error('Ошибка сохранения данных:', err);
            });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    if (!foodType) {
        return <p>Ошибка: объект FoodType отсутствует</p>; // Сообщение об ошибке, если foodType отсутствует
    }

    return (
        <div className="foodtype-card">
            <h2>Детали FoodType</h2>
            {isEditing ? (
                <>
                    <p>Имя: <input type="text" name="name" value={currentFoodType.name} onChange={handleInputChange} /></p>
                    <p>Цена за 100 грамм: <input type="number" name="pricePer100Grams" value={currentFoodType.pricePer100Grams} onChange={handleInputChange} /></p>
                    
                    <button onClick={handleSave}>Сохранить изменения</button>
                </>
            ) : (
                <>
                    <p>Имя: {currentFoodType.name}</p>
                    <p>Цена за 100 грамм: {currentFoodType.pricePer100Grams}</p>
                    <button onClick={handleEditClick}>Редактировать</button>
                </>
            )}
        </div>
    );
}

export default FoodTypeCard;