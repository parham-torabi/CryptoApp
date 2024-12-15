import { useState } from "react"
import styles from "./Chart.module.css"
import { converData } from "../../Helpers/ConvertData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart({chart,setChart}) {
  const [type,setType] = useState("prices")
  const closeChartPage = () => {
    setChart(null)
  }
  const typesHandler = (event) => {
    if(event.target.tagName === "BUTTON"){
      const type = event.target.innerText.toLowerCase().replace(" ","_");
      setType(type);
    }
  }
  return (
    <div className={styles.container}>
        <button onClick={closeChartPage} className={styles.closeBtn}>X</button>
        <div className={styles.chart}>
          <div className={styles.name}>
            <img src={chart.coin.image}/>
            <p>{chart.coin.name}</p>
          </div>
          <div className={styles.graph}>
            <ChartComponent data={converData(chart,type)} type={type}/>
          </div>
          <div className={styles.types} onClick={typesHandler}>
            <button className={type === "prices" ? styles.selected : null}>Prices</button>
            <button className={type === "market_caps" ? styles.selected : null}>Market Caps</button>
            <button className={type === "total_volumes" ? styles.selected : null}>Total Volumes</button>
          </div>
          <div className={styles.details}>
            <div>
              <p>Price:</p>
              <span>${chart.coin.current_price}</span>
            </div>
            <div>
              <p>ATH:</p>
              <span>${chart.coin.ath}</span>
            </div>
            <div>
              <p>Market Cap:</p>
              <span>{chart.coin.market_cap}</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Chart

const ChartComponent = ({data,type}) => {
  return(
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart width={500} height={400} data={data}>
        <Line type={"monotone"} stroke="#3874ff" dataKey={type} strokeWidth={"2px"}/>
        <CartesianGrid stroke="#404042"/>
        <YAxis dataKey={type} domain={"auto"}/>
        {/* <XAxis dataKey="date" hide/> */}
        <Legend/>
        <Tooltip/>
      </LineChart>
    </ResponsiveContainer>
  )
}