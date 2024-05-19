import React from 'react'
import { Navigate  } from 'react-router-dom'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      {/* Здесь можно добавить дополнительные секции или компоненты, если это нужно */}
    </div>
  )
}

export default HomePage