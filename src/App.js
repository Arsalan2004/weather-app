import React from 'react'
import './App.css';
import Weather from './Components/Weather/Weather';

function App() {

  const apikey = process.env.REACT_APP_WEATHER_API;
  // console.log(apikey);

  return (
    <div className="App">
      {/* <Todolist /> */}
      <Weather apikey={apikey} />
    </div>
  );
}

export default App;
