import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  

  const fetchUserData = () => {
    axios.get('https://backend-dot-recipe-finder-388213.as.r.appspot.com/users', {
      headers: {
        Authentication: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTY4NjY1NDIyNn0.JKaX2VCwz8ZsjcGIyNTk88z93seXGMVuDsDmSZeX1Kc', // Menyertakan token dalam header Authorization
      },
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://backend-dot-recipe-finder-388213.as.r.appspot.com/users/${id}`, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2MTQ1OTEzfQ.NOrWAi9l3iz4ebcsgsH0gKXCalhD-KwPOfTm7fxgOXo', // Menyertakan token dalam header Authorization
      },
    })
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        alert('Data berhasil dihapus!');
        fetchUserData(); // Memuat kembali data setelah penghapusan berhasil
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan dalam menghapus data!');
      });
  };

  return (
    <div className="flex justify-center flex-wrap">
      {users.map(user => (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-4 my-4" key={user.id}>
          <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mt-5 mb-3 rounded-full shadow-lg" src={user.img} alt="Bonnie image" />
            <h5 className="mt-5 mb-5 text-xl font-medium text-gray-900 dark:text-white">{user.username}</h5>
            
            <div >
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>

            <Link to={`/updateUser/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </Link>
            </div>

         

          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
