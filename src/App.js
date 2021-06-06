import React, {useState} from 'react';
import Search from './components/Search';
import axios from 'axios';
import Results from './components/Results';

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });


  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=4582b002";

  const search = (m) => {
    if (m.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({data}) => {
        let results = data.Search;

        setState(prevState => {
          return {... prevState, results: results }
        })
      }); 
    }
  }

  const handleInput =(m) => {
    let s = m.target.value;
    
    setState(prevState => {
      return {...prevState, s: s }
    });
    // console.log (state.s);
}

  return (
    <div className="App">
      <header>
      <h1>Movie App</h1>
      <main>
        <Search handleInput= {handleInput} search = {search}/>
        <Results results={state.results}/>
      </main>
      </header>
    </div>
  );
}

export default App;
