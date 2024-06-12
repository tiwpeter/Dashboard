import styles from '../../../../app/ui/dashboard/user/singleUser/singleUser.module.css';
import Image from 'next/image';
import {fechUser} from "../../../lib/db"

const SingleUserPage = async ({params}) => {
    const {id} = params;
    const user = await fechUser(id);

    

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={user.img || "/noavatar.png"} alt='' fill />
                </div>
                {user.username}
            </div>
            <div className={styles.formContainer}>
            <form action="" className={styles.form}>
                <label>Username</label>
                <input type="text" name='username' placeholder={user.username} />
                <label>Email</label>
                <input type="text" name='email' placeholder={user.email} />
                <label>Password</label>
                <input type="text" name='password' placeholder={user.password} />
                <label>Phone</label>
                <input type="text" name='phone' placeholder={user.phone} />
                <label>Address</label>
                <input type="text" name='address' placeholder={user.address} />
                <label>Cat</label>
                <select name="cat" id="cat">
                    <option value={true}>Yes</option>
                    <option value={true}>No</option>                    
                </select>
                <label>Is Admin?</label>
                <select name="isAdmin" id="isAdmin">
                    <option value={true}>Yes</option>
                    <option value={true}>No</option>
                </select>
                <button>Update</button>
                </form>
                <label >Is Active</label>
            </div>
        </div>
    );
}

export default SingleUserPage;
