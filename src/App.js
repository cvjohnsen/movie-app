import React, { useState } from 'react';
import Search from './components/Search';
import axios from 'axios';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });


  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=4582b002";

  const search = (m) => {
    if (m.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const handleInput = (m) => {
    let s = m.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
    // console.log (state.s);
  }

  const openPopup = id => {
    axios(apiurl + "&=" + id).then(({ data }) => {
      let result = data;
      console.log (result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Station</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
