import React, { useEffect, useState } from 'react'
import { searchCoin } from '../../Services/CryptoAPI';
import { RotatingLines } from 'react-loader-spinner';
import styles from "./Search.module.css"

function Search({currency,setCurrency}) {
  const [text,setText] = useState("");
  const [coins,setCoins] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    setIsLoading(false)
    if(!text) return;
    const search = async () => {
      try {        
        const response = await fetch(searchCoin(text),{signal:controller.signal})
        const json = await response.json();
        console.log(json);
        if(json.coins){
          setCoins(json.coins)
          setIsLoading(false)
        }else{
          alert(json.status.error_message)
        }
        console.log(coins); 
      } catch (error) {
        if(error.name !== "AbortError"){
            alert(error.message)
        }
      }
    }
    setIsLoading(true);
    search();
    return () => controller.abort();
  },[text])
  return (
    <div className={styles.searchBox}>
        <input type="text" placeholder="Please a Search" value={text} onChange={e => setText(e.target.value)}/>
        <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
        </select>
        <div className={text ? styles.searchResult : styles.disable}>
          {isLoading && <RotatingLines width='50px' height='50px' strokeWidth='2' strokeColor='#3874ff'/>}
          <ul>
            {coins.map(coin => 
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name}/>
                <p>{coin.name}</p>
              </li>
            )}
          </ul>
        </div>
    </div>
  )
}

export default Search