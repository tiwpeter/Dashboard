import Card from "../ui/dashboard/card/card"
import Card2 from "../ui/dashboard/card/card2"
import Card3 from "../ui/dashboard/card/card3"

import Chart from "../ui/dashboard/chart/chart"
import styles from "../ui/dashboard/dashboard.module.css"
import Rightbar from "../ui/dashboard/rightbar/rightbar"
import Transaction from "../ui/dashboard/transaction/transaction"

const Dashboad = () => {
    return (
        <div className={styles.wraper}>
        <div className={styles.main}>
            <div className={styles.cards}>
                    <Card/>
                    <Card2/>
                    <Card3/>
                </div>
                <Transaction/>
                <Chart/>
            </div>
             <div className={styles.side}>
                <Rightbar/>
             </div>
        </div>
    )
}

export default Dashboad