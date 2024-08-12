import NewsGrid from './news-grid/NewsGrid'
import React from 'react';
import Weather from '../../components/weather/Weather'

export default function Home() {
    return (
        <>
            <Weather />
            <div className='container'>
                <NewsGrid />
            </div>
        </>
    )
}