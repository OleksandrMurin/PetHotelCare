import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';

const UserAnimals = ({userId}) =>{
    const [animals, setAnimals] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{},[userId, currentPage])
}