import { useState } from "react"
import TableCoin from "../Modules/TableCoin"
import { useEffect } from "react";
import { getCoinList } from "../../Services/CryptoAPI";
import Pagination from "../Modules/Pagination";
import Search from "../Modules/Search";
import Chart from "../Modules/Chart";

function HomePage() {
  const [coins,setCoins] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [currency,setCurrency] = useState("usd");
  const [chart,setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      const response = await fetch(getCoinList(page,currency));
      const json = await response.json()
      setCoins(json)
      setIsLoading(false)
    }
    getData()
  },[page,currency])
  return (
    <div>
        <Search currency={currency} setCurrency={setCurrency}/>
        <TableCoin coins={coins} isLoading={isLoading} setChart={setChart}/>
        <Pagination page={page} setPage={setPage}/>
        {!!chart && <Chart chart={chart} setChart={setChart}/>}
    </div>
  )
}

export default HomePage