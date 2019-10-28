import React from 'react';
import { AddStop } from '../components/AddStop';
import { ItineraryList } from '../components/ItineraryList';

const url = "https://dev-api.shipwell.com/v2/locations/addresses/validate/";
const data = { formatted_address: "209 West 9th St. Austin, Texas 78701" };

async function request() {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return await json;
}

function App() {
  console.log('request -> ', request())
  return (
    <div className="App">
      <AddStop />
      <ItineraryList />
    </div>
  );
}

export default App;
