import React, { useState } from 'react';
import axios from 'axios';
import processData from './prosesdata';
const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const hai = async() =>{
    alert('hahaha')

  }

//   const uploadImage = async () => {
//     try {
//       const response = await axios.post(
//         'https://backend-dot-recipe-finder-388213.as.r.appspot.com/history',
//         {
//           image: selectedImage,
//         },
//         {
//           headers: {
//             Authentication: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2MTQ1OTEzfQ.NOrWAi9l3iz4ebcsgsH0gKXCalhD-KwPOfTm7fxgOXo',
//           },
//         }
//       );
//       console.log(response.data);
//       alert('Data berhasil disimpan!');
//     } catch (error) {
//       console.error(error);
//       alert('Terjadi kesalahan dalam menyimpan data!');
//     }
//   };



const uploadImage = async () => {
    try {
      // Proses data gambar
      const processedData = await processData(selectedImage);
console.log(processedData);
      // Kirim data int16 ke API
      const response = await axios.post(
        'https://us-central1-aiplatform.googleapis.com/v1/projects/288463562539/locations/us-central1/endpoints/305220029824106496:predict',
        {
            instances: processedData,
        },
        {
            headers: {
                Authorization: 'Bearer ya29.a0AWY7CklN1CvK-bUsK1C_IzMHD_Jju1oFf3v1SzG98RpwOCvz0kPLImbFUIeC3A19gY7pis72_1t3186oSfZsZoY3F6AZriXhBEIMtIxXyMsh0wKyV5anQdToKlmViLl1qTdzMkm7IanlS_jl7OEh1GZPji8YDaI2qdrEM3nWmPvaZeJ7FV5MuUmSUT3aUFYmGVKGFyDrlN9plhSP4b0Y9ny8SNgLQ9PolMbGVQEaCgYKAQ4SARISFQG1tDrp55Op5lRvMvP02-APY8Dehg0238',
            },
          }
        
      );
      console.log(response.data);
     alert("Classification berhasil")
    } catch (error) {
      console.error(error);
      alert("Classification gagal")
    }
  };
  

  return (
    <div className="flex flex-col items-center mt-8">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {selectedImage && (
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt="Selected"
            className="rounded-lg h-64 w-auto mb-4"
          />
          <button
            onClick={uploadImage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload Gambar
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
