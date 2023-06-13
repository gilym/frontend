import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetchFoodData();
  }, []);

  const fetchFoodData = () => {
    axios
      .get('https://backend-dot-recipe-finder-388213.as.r.appspot.com/food', {
        headers: {
          Authentication: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2MTQ1OTEzfQ.NOrWAi9l3iz4ebcsgsH0gKXCalhD-KwPOfTm7fxgOXo', // Menyertakan token dalam header Authorization
        },
      })
      .then(response => {
        setFoodData(response.data);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://backend-dot-recipe-finder-388213.as.r.appspot.com/food/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'), // Menyertakan token dalam header Authorization
        },
      })
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        alert('Data berhasil dihapus!');
        fetchFoodData(); // Memuat kembali data setelah penghapusan berhasil
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan dalam menghapus data!');
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">
          <Link to={`/addFood`} className="button is-success">
            Add New
          </Link>
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">
          <Link to={`/listuser`} className="button is-success">
            list User
          </Link>
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">
          <Link to={`/inputUser`} className="button is-success">
            Input User
          </Link>
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">
          <Link to={`/image`} className="button is-success">
            Classification
          </Link>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Food List</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Ingredients</th>
            <th className="px-4 py-2">KKal</th>
            <th className="px-4 py-2">Lemak</th>
            <th className="px-4 py-2">Protein</th>
            <th className="px-4 py-2">Karbohidrat</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map(food => (
            <tr key={food.id}>
              <td className="border px-4 py-2">{food.id}</td>
              <td className="border px-4 py-2">{food.name}</td>
              <td className="border px-4 py-2">{food.description}</td>
              <td className="border px-4 py-2">{food.ingredients}</td>
              <td className="border px-4 py-2">{food.kkal}</td>
              <td className="border px-4 py-2">{food.lemak}</td>
              <td className="border px-4 py-2">{food.protein}</td>
              <td className="border px-4 py-2">{food.karbohidrat}</td>
              <td className="border px-4 py-2">
                <a href={food.img} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {food.img}
                </a>
              </td>
              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(food.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/updatefood/${food.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodList;
