import React, {useState, useEffect} from 'react';
import './App.css';
import Clock from "./Clock";
import Navbar from './Navbar';

function App() {

  const [countryData, setCountryData] = useState([]);
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  const [clocks, setClocks] = useState([]);
  const [offsetByIP, setOffsetByIP] = useState(0);

  const fixName = name => {
    const spaces = new RegExp(" ", "g");
    const underscores = new RegExp("_", "g");
    return name.includes(" ") ? name.replace(spaces, "_") : name.replace(underscores, " ");
  }

  const bodyStyle = {
    width: "100%",
    height: "100vh",
  }

  const mainStyle = {
    background: "url('analog.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "top",
    width: "100%",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

    const clockGrid = {
      width: "90%",
      height: "95%",
      display: "grid",
      gridTemplate: "1fr 1fr / 1fr 1fr 1fr",
    }

  const placeholder = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "25px"
  }

  useEffect(()=> {
    fetch("https://worldtimeapi.org/api/timezone")
      .then(blob => blob.json())
      .then(data => {
        setCountryData(data);
      });
    fetch("https://worldtimeapi.org/api/ip")
      .then(blob => blob.json())
      .then(data => {
        setOffsetByIP(data.utc_offset)
      })
      .catch(err => {
        console.log(err + "Failed to recognize your timezone by public IP. Setting your timezone to Poland");
        fetch("https://worldtimeapi.org/timezone/Europe/Warsaw")
          .then(blob => blob.json())
          .then(data => setOffsetByIP(data.utc_offset))
          .catch(err => console.log(err));
      })
  }, []);

  useEffect(()=> {
    const renderClocks = () => {
      setClocks([]);
      if (selectedTimezones.length !== 0) {
        selectedTimezones.forEach(item => {
          setClocks(prevState => [...prevState, <Clock name={item.timezone} key={item.unixtime} timeDifference={parseInt(item.utc_offset) - parseInt(offsetByIP)} remove={remove} datetime={item.datetime} fixName={fixName}/>])
        });
      }
    }
    renderClocks()
  }, [selectedTimezones, offsetByIP])

  const addClock = timezone => {
    let duplicate = false;
    selectedTimezones.forEach(item => {
      if (item.timezone === timezone) {
        alert("Timezone already selected");
        duplicate = true;
        return;
      }
    });
    if (duplicate) {
      return;
    }

    if (selectedTimezones.length >=6) {
      alert("Too many clocks");
      return;
    }

    setClocks(prevState => [...prevState, <div style={placeholder} key={prevState.length}><span>Loading your clock...</span></div>]);
    let currentURL = `https://worldtimeapi.org/api/timezone/${timezone}`;
    fetch(currentURL)
      .then(blob=>blob.json())
      .then(data => {
        setSelectedTimezones(prevState => [...prevState, data]);
      }
        );
  }

  const reset = () => {
    setSelectedTimezones([]);
  }

  const remove = timezone => {
    setTimeout(()=> {
      setSelectedTimezones(prevState => prevState.filter(item => 
        item.timezone === timezone ? false : true));
    }, 500);
  }

  return (
    <div style={bodyStyle}>
      <Navbar countryData={countryData} addClock={addClock} reset={reset} fixName={fixName}/>
      <div style={mainStyle}>
        <div style={clockGrid}>
          {clocks}
        </div>
      </div>
    </div>
  );
}

export default App;
