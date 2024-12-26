import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useState } from 'react';
import style from './MainArea.module.scss';
import Card from '../Card/Card';
import Map from '../MapWrapper/Map';

function MainArea(){
    const [weatherData, setWeatherData] = useState<any>(null);
    const [cityName, setCityName] = useState<string>('Bremen');
    const [newCityName, setNewCityName] = useState<string>('');

    useEffect(() => {
        let APIUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
        let APIKey = '&lang=eng&units=metric&APPID=b31d9e7bbf318b4b99ef5262e8f47dbd';
        let weatherURL = APIUrl + cityName + APIKey;
        
        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                console.log("Data List Loaded", data.list);
                setWeatherData(data.list);
            })
            .catch(error => console.error("Error loading data:", error));
    }, [cityName]);

    const dayArray = weatherData ? weatherData.filter((reading: any) => reading.dt_txt.includes("12:00:00")) : [];
    const date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const arrayForCurentDay =  weatherData ? weatherData.filter((reading: any) => reading.dt_txt.includes(currentDate)) : [];
    const render = (status: Status) => (<h1>{status}</h1>)

    const updateCityName = () => {
        if(newCityName !== ''){
            setCityName(newCityName);
        }
    }

    const clearCityNameInput = () => {
        setNewCityName('');
    }

    const refreshPage = () => {
        window.location.reload();
    }
    
    let isWeatherSunny;
    let sunnyBackground = style.sunnyBackground;
    let notSunnyBackground = style.notSunnyBackground;
    if(weatherData !== null){
        isWeatherSunny = !dayArray[0].weather[0].description.includes('rain');
    }

    return (
        <div className={`${style.mainArea}  ${isWeatherSunny ? sunnyBackground : notSunnyBackground}`}>
            {weatherData ? (
                <div className={style.mainArea__container}>
                    <div className={style.weatherSubContainer}>
                        <div className={style.currentWeather}>
                            <h3 className={style.currentWeather__secondTitle}>Today in {cityName} is</h3>
                            <h1 className={style.currentWeather__title}>{dayArray[0].weather[0].description}</h1>
                            <p className={style.currentWeather__text}>{dayArray[0].main.temp} °C</p>
                            {
                                arrayForCurentDay.map((item: any, index: number) => (
                                    <div className={style.currentWeather__reportContainer}>
                                        <p>{item.dt_txt.split(currentDate)}:</p>
                                        <p>{item.weather[0].description}</p>
                                        <p>{item.main.temp} °C</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={style.addNewLocationContainer}>
                            <input className={style.searchForLocation} name='searchForLocation' value={newCityName} onChange={(e) => setNewCityName(e.target.value)}/>
                            <div className={style.searchForLocation__buttons}>
                                <button className={style.searchForLocation__updateLocationBtn} onClick={updateCityName}>Accept</button>
                                <button className={style.searchForLocation__clearLocationBtn} onClick={clearCityNameInput}>Clear</button>
                            </div>
                            <Wrapper apiKey={'AIzaSyBMlh3BJdUsUGfI3TPkV6xY47xH8jfSUrE'} render={render}>
                                <Map></Map>
                            </Wrapper>
                        </div>
                    </div>
                    <div className={style.weatherCards}>
                        {dayArray.map((item: any, index: number) => (
                            <Card cardData={item.dt_txt} cardTemp={item.main.temp} cardDesc={item.weather[0].description}/>
                        ))}
                    </div>
                </div>

            ) : (
                <div className={style.mainArea__container}>
                    <p>Loading weather data...</p>
                    <p>You may entered the wrong city. Try again.</p>
                    <button onClick={refreshPage}>Reload Page</button>
                </div>
            )}
        </div>
    );
};

export default MainArea;