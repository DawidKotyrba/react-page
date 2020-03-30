import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faLocationArrow} />


const WeatherList = props => {
    const listItem = props.weatherArray.map((weather, index) => {
        let rot = -weather.wind + 90
        return (

            <div key={index} className={'list-item'}>Kierunek wiatru
                <div className={'arrow'} style={{ transform: 'rotate( ' + rot + 'deg)' }}>
                    {element}
                </div>
                <h2>{weather.city}</h2>
                <p>Temperatura: {weather.temperature}</p>
                <p>Ciśnienie: {weather.pressure}</p>
            </div>
        );
    });
    return (
        <div className={'list'}>
            {listItem}
        </div>
    );
};


export default WeatherList;