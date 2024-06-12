import styles from './rightbar.module.css'
import Image from 'next/image'
import {MdPlayCircleFilled, MdReadMore} from "react-icons/md"

const Rightbar = () => {
    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>

                    <Image src="/astronaut.png"
                        alt=""
                        fill className={styles.bg}
                    />
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>
                    🔥 Availble Now
                    </span>
                    <h3 >How to use the new version of the admin dashboard?</h3>
                    <span className={styles.subtitle}>Takes 4 minutes to learn</span>
                    <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipisicing elit. Perferendis animi autem voluptas vero esse officia, itaque 
                    </p>
                    <button className={styles.notification}>
                        <MdPlayCircleFilled/>
                        Watch
                    </button>
                </div>
            </div>
            <div className={styles.item}>
                
                <div className={styles.texts}>
                    <span className={styles.notification}>
                    🔥 Availble Now
                    </span>
                    <h3 >How to use the new version of the admin dashboard?</h3>
                    <span className={styles.subtitle}>Takes 4 minutes to learn</span>
                    <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipisicing elit. Perferendis animi autem voluptas vero esse officia, itaque 
                    </p>
                    <button className={styles.notification}>
                        <MdReadMore/>
                        Watch
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Rightbar