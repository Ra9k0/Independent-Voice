const api = {
    key: "809ee7d74928db62ff349d5dd1fd2e4d",
    base: "https://api.openweathermap.org/data/2.5/weather?",
  };
  
export default async function fetchWeather(lat, lon){
    const response = await fetch(
      `${api.base}lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };