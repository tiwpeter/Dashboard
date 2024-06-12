"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from '../../../../app/ui/dashboard/user/addUser/addUser.module.css';

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,
    isActive: true,
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', formData);
      console.log(response.data); // Assuming the response data contains the result of adding the user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder='username' name='username' value={formData.username} onChange={handleChange} required />
        <input type="email" placeholder='email' name='email' value={formData.email} onChange={handleChange} required />
        <input type="password" placeholder='password' name='password' value={formData.password} onChange={handleChange} required />
        <input type="phone" placeholder='phone' name='phone' value={formData.phone} onChange={handleChange} />
        <select name="isAdmin" id="isAdmin" value={formData.isAdmin} onChange={handleChange}>
          <option value={false}>Is Admin</option>
          <option value={true}>Yes</option>
          <option value={false}>Phon</option>
        </select>
        <select name="isActive" id="isActive" value={formData.isActive} onChange={handleChange}>
          <option value={true}>Is Active</option>
          <option value={true}>Yes</option>
          <option value={false}>Phon</option>
        </select>
        <textarea
          name="address"
          id="address"
          rows="16"
          placeholder='Address'
          value={formData.address}
          onChange={handleChange}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddUserPage;