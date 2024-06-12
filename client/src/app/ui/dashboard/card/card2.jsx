import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './card.module.css';

const Card = () => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>
            <div className={styles.texts}>
                <span className={styles.title}>This month's profit</span>
                <span className={styles.number}>10,252$</span>

                <span className={styles.detail}>
                    <span className={styles.positive}>300 </span>items sold out
                </span>
            </div>
        </div>
    );
}

export default Card;
