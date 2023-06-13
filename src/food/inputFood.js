import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Food = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [kkal, setKkal] = useState('');
  const [lemak, setLemak] = useState('');
  const [protein, setProtein] = useState('');
  const [karbohidrat, setKarbohidrat] = useState('');
  const [idx, setIdx] = useState(''); // Menambahkan state idx
  const [selectedImage, setSelectedImage] = useState(null);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    fetchPreferences();
  }, []);

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
    formData.append('kkal', kkal);
    formData.append('lemak', lemak);
    formData.append('protein', protein);
    formData.append('karbohidrat', karbohidrat);
    formData.append('idx', idx); // Menggunakan nilai idx yang diinput oleh pengguna
    formData.append('img', selectedImage);

    axios.post('http://localhost:8000/food', formData)
      .then(response => {
        console.log('Data berhasil disimpan:', response.data);
        alert('Data berhasil disimpan!');

        setName('');
        setCategory('');
        setDescription('');
        setIngredients('');
        setKkal('');
        setLemak('');
        setProtein('');
        setKarbohidrat('');
        setIdx('');
        setSelectedImage(null);
      })
      .catch(error => {
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
            <label htmlFor="kkal" className="block">Kkal:</label>
            <input type="text" id="kkal" value={kkal} onChange={(e) => setKkal(e.target.value)} className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="lemak" className="block">Lemak:</label>
            <input type="text" id="lemak" value={lemak} onChange={(e) => setLemak(e.target.value)} className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="protein" className="block">Protein:</label>
            <input type="text" id="protein" value={protein} onChange={(e) => setProtein(e.target.value)} className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="karbohidrat" className="block">Karbohidrat:</label>
            <input type="text" id="karbohidrat" value={karbohidrat} onChange={(e) => setKarbohidrat(e.target.value)} className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="idx" className="block">IDX:</label>
            <input type="text" id="idx" value={idx} onChange={(e) => setIdx(e.target.value)} className="border border-gray-300 p-2 w-full" />
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

export default Food;
