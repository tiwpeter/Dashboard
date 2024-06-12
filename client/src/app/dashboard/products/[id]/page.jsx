import styles from '../../../../app/ui/dashboard/products/singleProduct/singleProduct.module.css';
import Image from 'next/image';

const SingleProductPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt='' fill />
                </div>
                iphone
            </div>
            <div className={styles.formContainer}>
            <form action="" className={styles.form}>
                <label>Title</label>
                <input type="text" name='title' placeholder='John Doe' />
                <label>Price</label>
                <input type="text" name='price' placeholder='JohnDoe@gmail.com' />
                <label>Stock</label>
                <input type="text" name='Stock' placeholder='w1234567e' />
                <label>Color</label>
                <input type="text" name='Color' placeholder='+123456' />
                <label>Size</label>
                <input type="text" name='Size' placeholder='New York' />
                <label>Is Admin?</label>
                <label>Cat</label>
                <select name="cat" id="cat">
                    <option value="kitchem">Kitchem</option>
                    <option value="computer">Computer</option>                    
                </select>
                <label >Description</label>
                <textarea name="desc" id="desc" rows="10" placeholder='description'></textarea>
                <button>Update</button>
                </form>
                <label >Is Active</label>
            </div>
        </div>
    );
}

export default SingleProductPage;
