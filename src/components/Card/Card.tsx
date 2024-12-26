import style from './Card.module.scss';

import scatteredClouds from './../../assets/icons/weather-icons-42-svgrepo-com.svg';
import overcastClouds from './../../assets/icons/weather-icons-16-svgrepo-com.svg';
import lightRain from './../../assets/icons/weather-icons-48-svgrepo-com.svg';
import moderateRain from './../../assets/icons/weather-icons-45-svgrepo-com.svg';
import brokenClouds from './../../assets/icons/weather-icons-17-svgrepo-com.svg';
import fewClouds from './../../assets/icons/weather-icons-12-svgrepo-com.svg';
import clearSky from './../../assets/icons/weather-icons-01-svgrepo-com.svg';
import lightSnow from './../../assets/icons/weather-icons-32-svgrepo-com.svg';


type CardProps ={
    cardData: any
    cardTemp: any
    cardDesc: any
}

function Card({cardData , cardTemp , cardDesc} : CardProps){
    return(
        <div className={style.weatherCard}>
            <p>{cardData}</p>
            <p>{cardTemp} °C</p>
            <p className={style.weatherCard__description}>{cardDesc}</p>
            {
                cardDesc === 'scattered clouds' && (
                    <img src={scatteredClouds} alt="scatteredClouds" className={style.weatherCard__image} />
                )
            }
            {
                cardDesc === 'overcast clouds' && (
                    <img src={overcastClouds} alt="overcast clouds" className={style.weatherCard__image} />
                )
            }
            {
                cardDesc === 'light rain' && (
                    <img src={lightRain} alt="light rain" className={style.weatherCard__image} />
                )
            }
            {
                cardDesc === 'moderate rain' && (
                    <img src={moderateRain} alt="moderateRain" className={style.weatherCard__image} />
                )
            }
            {
                cardDesc === 'broken clouds' && (
                    <img src={brokenClouds} alt="broken clouds" className={style.weatherCard__image} />
                )
            }
            {
                cardDesc === 'few clouds' && (
                    <img src={fewClouds} alt="few clouds" className={style.weatherCard__image} />
                )
            }
            {
                cardDesc === 'clear sky' && (
                    <img src={clearSky} alt="clear sky" className={style.weatherCard__image} />
                )
            }
            {
                cardDesc === 'light snow' && (
                    <img src={lightSnow} alt="light snow" className={style.weatherCard__image} />
                )
            }
        </div>
    )
}

export default Card;