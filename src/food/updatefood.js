
import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import {  useParams } from "react-router-dom";
const UpdateFood = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const { id } = useParams();
  const [foodData, setFoodData] = useState([]);



  
  useEffect(() => {
    fetchFoodData();
    fetchPreferences();
  }, []);

  const fetchFoodData = () => {
    axios.get(`https://backend-dot-recipe-finder-388213.as.r.appspot.com/food/${id}`)
      .then(response => {
        setFoodData(response.data);
      
        setName(response.data[0].name);
        setCategory(response.data[0].category);
        setDescription(response.data[0].description);
        setIngredients(response.data[0].ingredients);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  }

  const fetchPreferences = () => {
    axios.get('https://backend-dot-recipe-finder-388213.as.r.appspot.com/preferences')
      .then(response => {
        setPreferences(response.data);
    
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('img', selectedImage);

    axios.put(`https://backend-dot-recipe-finder-388213.as.r.appspot.com/food/${id}`, formData)
      .then(response => {
        // Berhasil mengirim data, lakukan sesuatu (misalnya tampilkan pesan sukses)
        console.log('Data berhasil disimpan:', response.data);
        alert('Data berhasil disimpan!');

        // Setelah data dikirim, Anda dapat mereset nilai-nilai state form
        setName('');
        setCategory('');
        setDescription('');
        setIngredients('');
        setSelectedImage(null);
      })
      .catch(error => {
        // Terjadi kesalahan dalam pengiriman data, lakukan sesuatu (misalnya tampilkan pesan error)
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan dalam menyimpan data!');
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      xaxxax
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-md w-[600px]">
        <h1 className="text-2xl font-bold mb-4">Food Form</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Input fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block">Category:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 p-2 w-full">
              <option value="">Select Category</option>
              {preferences.map(preference => (
                <option key={preference.id} value={preference.id}>
                  {preference.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block">Description:</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block">Ingredients:</label>
            <input type="text" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block">Image:</label>
            <input type="file" id="image" onChange={handleImageUpload} className="border border-gray-300 p-2 w-full" accept="image/*" />
</div>
<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
</form>
</div>
</div>
);
};

export default UpdateFood;
