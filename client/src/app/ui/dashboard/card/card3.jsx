import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './card.module.css';

const Card = () => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>
            <div className={styles.texts}>
                <span className={styles.title}>All product stock</span>
                <span className={styles.number}>700</span>

                <span className={styles.detail}>
                    <span className={styles.positive}>'remaining' </span>300
                </span>
            </div>
        </div>
    );
}

export default Card;
