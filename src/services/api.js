import axios from "axios";

export const getCity = async (selectedCity) => {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=5&appid=${import.meta.env.VITE_APP_API_KEY}`)
        const suggestions = data.map(item => ({
            name: item.name,
            country: item.country,
            state: item.state,
            coord: {
                lat: item.lat,
                lon: item.lon,
            }
        }));
        return suggestions
    } catch (e) {
        console.log(e);
    }   
}

export const getCurrentCity = async () => {
    try {
        const { data } = await axios.get(`https://api.ipdata.co?api-key=${import.meta.env.VITE_APP_IP_KEY}`)
        return data
    } catch (e) {
        console.log(e);
    }
    
}

export const fetchWeather = async (lat, lon, days) => {
    try {
        const { data } = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}&days=${days}&lang=ru&key=${import.meta.env.VITE_APP_WEATHER_API_KEY}`);
        return data
    } catch (e) {
        console.log(e);
    }
}