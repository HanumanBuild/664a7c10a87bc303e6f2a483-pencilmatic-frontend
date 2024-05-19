import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const history = useHistory();
  const [canvas, setCanvas] = useState(null);
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current);
    initCanvas.isDrawingMode = true;
    setCanvas(initCanvas);

    const saveDrawing = async () => {
      const drawing = initCanvas.toDataURL();
      try {
        await axios.post(
          `${process.env.REACT_APP_PENCILMATIC_BACKEND_URL}/api/drawings`,
          { drawing },
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    };

    const loadDrawings = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_PENCILMATIC_BACKEND_URL}/api/drawings`, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        if (res.data.length > 0) {
          const img = new Image();
          img.src = res.data[0].drawing;
          img.onload = () => {
            const fabricImg = new fabric.Image(img);
            initCanvas.add(fabricImg);
            initCanvas.renderAll();
          };
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadDrawings();

    return () => {
      saveDrawing();
    };
  }, [history]);

  const handleClearCanvas = () => {
    canvas.clear();
  };

  const handleToggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
    canvas.isDrawingMode = !canvas.isDrawingMode;
  };

  const handleEraseMode = () => {
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.isDrawingMode = true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Drawing App</h1>
        <div className="mb-4">
          <button onClick={handleToggleDrawingMode} className="bg-blue-500 text-white p-2 rounded mr-2">
            {isDrawingMode ? 'Switch to Erase Mode' : 'Switch to Draw Mode'}
          </button>
          <button onClick={handleClearCanvas} className="bg-red-500 text-white p-2 rounded">
            Clear Canvas
          </button>
        </div>
        <canvas ref={canvasRef} width={800} height={600} className="border border-gray-300"></canvas>
      </div>
    </div>
  );
};

export default DrawingApp;