import ChartUp from "../../Assets/chart-up.svg"
import ChartDown from "../../Assets/chart-down.svg"
import { marketChart } from "../../Services/CryptoAPI"
function TableRow({coin,styles,setChart}){
    const{
        name,
        id,
        image,
        current_price,
        price_change_percentage_24h,
        total_volume,
        symbol
    } = coin;
    const showChartPageHandler = () => {
        try {
            const showChartHandler = async () => {
                const response = await fetch(marketChart(id));
                const json = await response.json();
                setChart({...json,coin:coin})
            }
            showChartHandler()
        } catch (error) {
            setChart(null)
        }
    }
  return (
    <tr>
        <td>
            <div className={styles.symbol} onClick={showChartPageHandler}>
                <img src={image} alt={name} />
                <span>{symbol.toUpperCase()}</span>
            </div>
        </td>
        <td>{name}</td>
        <td>{"$"+current_price.toLocaleString()}</td>
        {/* <td className={price_change_percentage_24h > 1 ? styles.success : styles.error}>{price_change_percentage_24h.toFixed(2)}%</td> */}
        <td style={price_change_percentage_24h > 1 ? {color:"#57bc7c"} : {color:"#d33636"}}>{price_change_percentage_24h.toFixed(2)}%</td>
        <td>{total_volume.toLocaleString()}</td>
        <td>
            <img src={price_change_percentage_24h.toFixed(2) > 1 ? ChartUp : ChartDown} alt={name} />
        </td>
        </tr>
  )
}

export default TableRow