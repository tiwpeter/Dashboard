"use client"
import styles from '../../../../app/ui/dashboard/products/addProduct/addProduct.module.css';
import { useState } from 'react';
import axios from 'axios';

const AddProductPage = () => {
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    cat: 'general',
    price: '',
    stock: '',
    color: '',
    size: '',
    desc: '',
    image: ''
  });

  const handleImageUpload = (imageUrl) => {
    setImage(imageUrl);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const uploadImages = async (ev) => {
    const files = ev.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('http://localhost:3000/api/uploadimg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        if (response.status === 200) {
          const data = response.data;
          console.log('Upload successful:', data);
  
          const imageUrl = `http://localhost:3000/images/${data.slug}`;
          setFormData({
            ...formData,
            image: imageUrl
          });
        } else {
          console.error('Upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error occurred during upload:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          cat: formData.cat,
          price: formData.price,
          stock: formData.stock,
          color: formData.color,
          size: formData.size,
          desc: formData.desc,
          imgurl: formData.image // Use 'image' from formData as the imgurl
        })
      });
  
      if (response.ok) {
        console.log('Product added successfully');
        // Do something after adding the product
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
      {/* title */}
      <input type="text" placeholder='title' name='title' value={formData.title} onChange={handleChange} required />
      {/**Category */}
      <select name="cat" id="cat" value={formData.cat} onChange={handleChange}>
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
            {/*price */}
        <input type="number" placeholder='price' name='price' value={formData.price} onChange={handleChange} required />
        {/*stock */}
        <input type="number" placeholder='stock' name='stock' value={formData.stock} onChange={handleChange} required />
        {/*color */}
        <input type="text" placeholder='color' name='color' value={formData.color} onChange={handleChange} required />
        {/*size */}
              {/*Images */}
              <input type="file" accept="image/*" onChange={uploadImages} />
        <textarea name="desc" id="desc" rows="16" placeholder='Description' value={formData.desc} onChange={handleChange}></textarea>

        <button type='submit'>Submit</button>
        
      </form>
    </div>
  );
};

export default AddProductPage;