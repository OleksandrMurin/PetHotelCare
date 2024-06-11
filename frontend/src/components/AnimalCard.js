import React, { useState, useEffect } from 'react';

function AnimalCard({ animalId }) {
    // Состояние для хранения данных о животном
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Состояние для отслеживания режима редактирования
    const [isEditing, setIsEditing] = useState(false);

    // Используем useEffect для загрузки данных о животном из API
    useEffect(() => {
        // URL для запроса данных о животном
        const url = `${connectionAPIString}/api/Pet/getById?id=${animalId}`;

        // Отправляем запрос к API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Преобразуем ответ в JSON
            })
            .then(data => {
                setAnimal(data); // Обновляем состояние данными о животном
                setLoading(false); // Устанавливаем, что данные загружены
            })
            .catch(err => {
                console.error('Ошибка загрузки:', err);
                setError(err);
                setLoading(false);
            });
    }, [animalId]);

    // Обработка состояний загрузки, ошибки и данных
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>;
    if (!animal) return null;

    // Функция для обработки изменения полей ввода
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimal((prevAnimal) => ({
            ...prevAnimal,
            [name]: value
        }));
    };

    // Функция для отправки данных на сервер
    const handleSave = () => {
        // URL для отправки данных на сервер
        const url = `${connectionAPIString}/api/Pet?id=${animalId}`;

        // Отправляем PUT-запрос на сервер
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        })
            .then(response => {
                console.log(animal)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response
            })
            .then(data => {
                console.log('Данные успешно обновлены:', data);
                // После сохранения можно отключить режим редактирования
                setIsEditing(false);
            })
            .catch(err => {
                console.error('Ошибка сохранения данных:', err);
            });
    };

    // Функция для включения режима редактирования
    const handleEditClick = () => {
        setIsEditing(true);
        console.log(animal)
    };

    // Отображение информации о животном и полей ввода
    return (
        <div className="animal-card">
            <h2>Детали животного</h2>
            {isEditing ? (
                // Если в режиме редактирования, отображаем поля ввода
                <>
                    <p>Имя: <input type="text" name="name" value={animal.name} onChange={handleInputChange} /></p>
                    <p>Возраст: <input type="number" name="age" value={animal.age} onChange={handleInputChange} /></p>
                    <p>Специальные требования: <input type="text" name="specialRequirements" value={animal.specialRequirements} onChange={handleInputChange} /></p>
                    <button onClick={handleSave}>Сохранить изменения</button>
                </>
            ) : (
                // Если не в режиме редактирования, отображаем информацию о животном
                <>
                    <p>Имя: {animal.name}</p>
                    <p>Возраст: {animal.age}</p>
                    <p>Специальные требования: {animal.specialRequirements}</p>
                    <button onClick={handleEditClick}>Редактировать</button>
                </>
            )}
        </div>
    );
}

export default AnimalCard;