import { useEffect, useState } from 'react';
import { Error } from './components/Error';
import Form from './components/Form';
import Header from './components/Header';
import Weather from './components/Weather';

function App() {
  const [search, setSearch] = useState({
    city: '',
    country: '',
  });
  const [consulting, setConsulting] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);
  const { city, country } = search;
  const appid = 'f331b5536993f86ee172c856fe869d56';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appid}`;
  useEffect(() => {
    const consultApi = async () => {
      if (consulting) {
        const response = await fetch(url);
        const result = await response.json();
        setResult(result);
        setConsulting(false);
        if (result.cod === '404') {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    consultApi();
  }, [consulting, url]);
  let component;
  if (error) {
    component = <Error message={'There are no results'} />;
  } else {
    component = <Weather result={result} />;
  }
  return (
    <>
      <Header title={'Weather React App'} />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form search={search} setSearch={setSearch} setConsulting={setConsulting} />
            </div>
            <div className="col m6 s12">{component}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
