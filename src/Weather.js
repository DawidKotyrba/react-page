import React, { Component } from 'react';
import WeatherList from './WeatherList';

class Weather extends Component {

    constructor() {
        super()
        this.state = {
            weatherArray: [],
            filteredCitiWeather: []
        };
    };

    inputChange = e => {
        let inputVal = e.target.value
        this.filtrCities(inputVal)
    }
    filtrCities = val => {
        let filteredArray = this.state.weatherArray.filter(citvObj => {
            return citvObj.city.toUpperCase().includes(val.toUpperCase())
        });
        this.setState({ filteredCitiWeather: filteredArray })
    };

    getData = () => {
        fetch('https://danepubliczne.imgw.pl/api/data/synop')
            .then(resp => resp.json())
            .then(data => {
                let newWeatherArray = []
                for (const key in data) {
                    let currencyArray = {}

                    currencyArray.id = key;
                    currencyArray.city = data[key].stacja;
                    currencyArray.temperature = data[key].temperatura;
                    currencyArray.wind = data[key].kierunek_wiatru;
                    if (data[key].temperatura === null) {
                        currencyArray.temperature = 'Brak danych'
                    } else {
                        currencyArray.temperature = data[key].temperatura + ' \xB0C'
                    }
                    if (data[key].cisnienie === null) {
                        currencyArray.pressure = 'Brak danych'
                    } else {
                        currencyArray.pressure = data[key].cisnienie + ' hPa'
                    }

                    newWeatherArray.push(currencyArray)
                };
                this.setState({ weatherArray: newWeatherArray })
                this.setState({ filteredCitiWeather: newWeatherArray })
            });
    };

    componentDidMount() {
        this.getData()
    };

    render() {
        return (
            <h2>
                <form >
                    <h2>Wpisz miasto</h2>
                    <input type="text" onChange={this.inputChange} />
                </form>
                <WeatherList weatherArray={this.state.filteredCitiWeather} />
            </h2>
        )
    };
};

export default Weather;