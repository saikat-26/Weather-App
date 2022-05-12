import { useEffect,useState } from "react"

const WeatherCo=()=>{
    const[weatherData,setWeatherData]=useState([{}])
    const[city,setCity]=useState("")
    const [forecastData, setForecastData] = useState({})
    function result(){
        fetchApi_for();
    }
    const fetchApi_for = async () => {
        const url_forecast = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=ZNGZR36SLKEHNJXUN9MUK4HMH&contentType=json`
        const forecast_response = await fetch(url_forecast)
        const forecast_json = await forecast_response.json()
        setForecastData(forecast_json)
    }
    const getWeather=(eve)=>{
        if(eve.key==="Enter"){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8fbc3f61d6fae467ecfc433a718415cd`).then(response=>response.json()).then(data=>{setWeatherData(data)})
        }
    }
    useEffect(() => {
        console.log(forecastData.days)
    }, [forecastData])
    return(
        <div className="container">
            <input className="input" placeholder="Enter City" onChange={e=>setCity(e.target.value)} value={city} onKeyPress={getWeather}/>
        {typeof weatherData.main==='undefined'?(
            <div>
                <p className="message">Press Enter for current weather</p>
            </div>
        ):(
            <div className="weather-data"><p className="city">{weatherData.name}</p>
                <p className="temp">{weatherData.main.temp}°F</p>
            </div>
        )}
        {weatherData.cod==="404"?(
            <p className="error">Sorry! Data Unavailable</p>   
        ):(
            <></>
        )}{
            forecastData.days && forecastData.days.length > 0 &&
            forecastData.days.slice(0,6).map((day, index) => {
                return(
                <div key={index} className="nextdays">
                    <div className="day">
                    <h2>Date: {day.datetime},</h2>
                    <h2> Average temp(°C): {day.temp},</h2>
                    <h2> {day.conditions}</h2>
                    </div>
                </div>
                )
            })
        }
        
    <button onClick={result} className="button" disabled={weatherData.cod==="404"}>Complete Forecast</button>
        </div>
    );
}
export default WeatherCo;
