import TableRow from "./TableRow"
import { RotatingLines } from 'react-loader-spinner';
import styles from "./TableCoine.module.css"
function TableCoin({coins,isLoading,setChart}) {
  return (
    <div className={styles.container}>
        {isLoading ? <RotatingLines strokeColor="#3874ff"/> :(
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24H</th>
                    <th>Total Volume</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map(coin => <TableRow coin={coin} key={coin.id} styles={styles} setChart={setChart}/>)}
                </tbody>
              </table>
        )}
    </div>
  )
}

export default TableCoin