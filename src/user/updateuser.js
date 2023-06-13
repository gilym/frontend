import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from "react-router-dom";

const Updateuser = () => {
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  
  

  useEffect(() => {
    fetchUserData();
    fetchPreferences();
  }, []);

  const fetchUserData = () => {
    axios.get(`https://backend-dot-rosy-precinct-381212.et.r.appspot.com/users/${id}`)
      .then(response => {
        setUsers(response.data);
        setUsername(response.data[0].username)
        setPassword(response.data[0].password)
        setCategory(response.data[0].preferences)
    
        
 
        
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };

 

  const fetchPreferences = () => {
    axios
      .get('https://backend-dot-recipe-finder-388213.as.r.appspot.com/preferences')
      .then(response => {
        setPreferences(response.data);
        
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };



  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('preferences', category);
    formData.append('img', selectedImage);

    axios
      .put(`https://backend-dot-recipe-finder-388213.as.r.appspot.com/users/${id}`, formData)
      .then(response => {
        console.log('Data berhasil Diupdate:', response.data);
        alert('Data berhasil Diupdate!');

        setUsername('');
        setCategory('');
        setPassword('');
        setSelectedImage(null);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan dalam menyimpan data!');
      });
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-md w-[600px]">
        <h1 className="text-2xl font-bold mb-4">User Form</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="name" className="block">
              Username:
            </label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block">
              Password:
            </label>
            <input
              type="text"
              id="ingredients"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            >
              <option value="">Select Category</option>
              {preferences.map(preference => (
                <option key={preference.id} value={preference.id}>
                  {preference.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block">
              Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="border border-gray-300 p-2 w-full"
              accept="image/*"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updateuser;
