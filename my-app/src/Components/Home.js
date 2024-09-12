import React, { useRef, useState, useEffect } from "react";

const CanvasApp = () => {
  // State to manage color, brush size, background color, and drawing status
  const [brushColor, setBrushColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Reference to the canvas element
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // Initialize the canvas context and set the background color
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    // Set the initial canvas background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [bgColor]);

  // Function to update the canvas background color
  const updateCanvasBackground = () => {
    const ctx = ctxRef.current;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // Start drawing when the mouse is pressed
  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  // Stop drawing when the mouse is released
  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.beginPath(); // Begin a new path after drawing stops
  };

  // Draw on the canvas
  const draw = (e) => {
    if (!isDrawing) return;

    const ctx = ctxRef.current;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  // Clear the canvas and reset the background color
  const clearCanvas = () => {
    updateCanvasBackground();
    ctxRef.current.beginPath();
  };

  // Download the canvas content as an image
  const saveCanvas = () => {
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  // Retrieve a saved image file and display it on the canvas
  const retrieveImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          updateCanvasBackground(); // Reset background
          ctxRef.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <label htmlFor="colorPicker">Pick a color: </label>
      <input
        type="color"
        id="colorPicker"
        value={brushColor}
        onChange={(e) => setBrushColor(e.target.value)}
      />
      <br></br>

      <label htmlFor="fontSize">Brush Size: </label>
      <input
        type="range"
        id="fontSize"
        min="1"
        max="20"
        value={lineWidth}
        onChange={(e) => setLineWidth(e.target.value)}
      />
        <br></br>
      <label htmlFor="canvasColour">Canvas Background Color: </label>
      <input
        type="color"
        id="canvasColour"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
        <br></br>
      <canvas
        id="myCanvas"
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
        <br></br>
        <br></br>
        <br></br>
      <button onClick={clearCanvas} className="container.mr-10px">Clear Canvas</button>
      <button onClick={saveCanvas}>Download Signature</button>
      <input type="file" accept="image/png" onChange={retrieveImage} />
    </div>
  );
};

export default CanvasApp;
