import styles from "./Pagination.module.css"
function Pagination({page,setPage}) {
  const perviousHandler = () => {
    if(page <= 1) return;
    setPage((page) => page - 1)
  }
  const nextHandler = () => {
    if(page >= 10) return;
    setPage((page) => page + 1)
  }
  return (
    <div className={styles.pagination}>
        <button onClick={perviousHandler} className={page === 1 ? styles.disable : ""}>Pervious</button>
        <p className={page === 1 ? styles.enable : null}>1</p>
        <p className={page === 2 ? styles.enable : null}>2</p>
        {
            page > 2 && page < 9 && (
            <>
            <span>...</span>
            <span className={page === page ? styles.enable : null}>{page}</span>
            </>
        )
        }
        <span>...</span>
        <p className={page === 9 ?  styles.enable : null}>9</p>
        <p className={page === 10 ? styles.enable  : null}>10</p>
        <button onClick={nextHandler} className={page === 10 ? styles.disable : ""}>Next</button>
    </div>
  )
}

export default Pagination