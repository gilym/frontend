import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [shapeType, setShapeType] = useState(null);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setStartX(offsetX);
    setStartY(offsetY);
    setIsDrawing(true);
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    setEndX(offsetX);
    setEndY(offsetY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    saveShape();
  };

  const saveShape = () => {
    const shape = {
      type: shapeType,
      startX,
      startY,
      endX,
      endY,
    };
    setShapes([...shapes, shape]);
  };

  const drawShapes = () => {
    if (!context) return;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    shapes.forEach((shape) => {
      if (shape.type === 'triangle') {
        drawTriangle(shape.startX, shape.startY, shape.endX, shape.endY);
      } else if (shape.type === 'rectangle') {
        drawRectangle(shape.startX, shape.startY, shape.endX, shape.endY);
      }
    });

    if (isDrawing) {
      if (shapeType === 'triangle') {
        drawTriangle(startX, startY, endX, endY);
      } else if (shapeType === 'rectangle') {
        drawRectangle(startX, startY, endX, endY);
      }
    }
  };

  const drawTriangle = (startX, startY, endX, endY) => {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineTo(startX + (endX - startX) / 2, startY);
    context.closePath();
    context.stroke();
  };

  const drawRectangle = (startX, startY, endX, endY) => {
    context.beginPath();
    context.rect(startX, startY, endX - startX, endY - startY);
    context.closePath();
    context.stroke();
  };

  const handleTriangleButtonClick = () => {
    setShapeType('triangle');
  };

  const handleRectangleButtonClick = () => {
    setShapeType('rectangle');
  };

  useEffect(() => {
    drawShapes();
  }, [shapes]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <button
          onClick={handleTriangleButtonClick}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: shapeType === 'triangle' ? 'lightblue' : 'transparent',
            border: '1px solid black',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Buat Segitiga
        </button>
        <button
          onClick={handleRectangleButtonClick}
          style={{
            padding: '10px 20px',
            backgroundColor: shapeType === 'rectangle' ? 'lightblue' : 'transparent',
            border: '1px solid black',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Buat Persegi
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ border: '1px solid black' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default Canvas;
