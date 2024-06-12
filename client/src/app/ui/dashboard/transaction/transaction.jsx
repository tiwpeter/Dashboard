import styles from './transaction.module.css'
import Image from 'next/image'

const Transaction = () => {
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                            <Image
                            src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            width={40}
                            height={40}
                            className={styles.userImage}
                            />
                            Aleck
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                        </td>
                        <td>14.02.2024</td>
                        <td>$3.200</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                            <Image
                            src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            width={40}
                            height={40}
                            className={styles.userImage}
                            />
                            Bon
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>Done</span>
                        </td>
                        <td>14.02.2024</td>
                        <td>$3.200</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                            <Image
                            src="https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            width={40}
                            height={40}
                            className={styles.userImage}
                            />
                            Canny
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cencelled}`}>Cencelled</span>
                        </td>
                        <td>14.02.2024</td>
                        <td>$3.200</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                            <Image
                            src="https://images.pexels.com/photos/859265/pexels-photo-859265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            width={40}
                            height={40}
                            className={styles.userImage}
                            />
                            Don
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                        </td>
                        <td>14.02.2024</td>
                        <td>$3.200</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default Transaction