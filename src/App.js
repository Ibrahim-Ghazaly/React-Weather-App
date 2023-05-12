import React, { useState } from 'react'
import axios from 'axios'
import sand from './Assets/sand.jpg'
import cloud from './Assets/cloud.jpg'
import windy from './Assets/windy.jpg'
import rain from './Assets/rain.jpg'
import sunset from './Assets/sunset.jpg'
import mist from './Assets/mist.jpg'
import haze from './Assets/haze.jpg'
import main from './Assets/main.jpg'




function App() {
  const [data, setData] = useState({})
  const [city, setCity] = useState('')
  const [img,setImg] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=65154f24fd3f231d7bdc321025f8c194`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)


    if(response.data?.weather[0].main === "Clear"){
      setImg(sand)
    }else if(response.data?.weather[0].main === "Mist"){
      setImg(mist)
    
    }else if(response.data?.weather[0].main === "Haze"){
      setImg(haze)
    
    }else if(response.data?.weather[0].main === "Clouds"){
      setImg(cloud)
    
    }else if(response.data?.weather[0].main === "Rain"){
      setImg(rain)
    }else{
      setImg(windy)
    }
      }).catch(err =>{
        alert("The location you have added not found please enter the right location")
      })
      setCity('')
    }
  }




  return (
    <div   className="app"  >
      <div className='overlay' style={{background:`url(${img})`}}></div>
      <div className="container">
      <div className="search">
        <input
          value={city}
          onChange={event => setCity(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
        <div className="top">
          <div className="location">
            <p className='gradiant'>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1 className='gradiant'>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p className='gradiant'>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold gradiant'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p  className='gradiant'>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold gradiant'>{data.main.humidity}%</p> : null}
              <p  className='gradiant'>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold gradiant'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p className='gradiant'>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
