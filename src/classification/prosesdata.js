import { createCanvas, loadImage } from 'canvas';

const processData = async (dataUrl) => {
  const canvas = createCanvas(180, 180);
  const ctx = canvas.getContext('2d');

  // Mengubah ukuran gambar menjadi 180x180
  const image = await loadImage(dataUrl);
  ctx.drawImage(image, 0, 0, 180, 180);

  // Mengambil data piksel dari canvas
  const imageData = ctx.getImageData(0, 0, 180, 180);

  // Mengkonversi data piksel menjadi array multidimensi dengan format RGB
  const outputArray = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    outputArray.push([r, g, b]);
  }

  return outputArray;
};

export default processData;
