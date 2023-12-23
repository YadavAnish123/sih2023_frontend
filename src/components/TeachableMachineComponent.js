import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const TeachableMachineComponent = () => {
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  let model, webcam, maxPredictions;

  useEffect(() => {
    const init = async () => {
      const modelURL = '{{Replace with your model URL}}/model.json';
      const metadataURL = '{{Replace with your model URL}}/metadata.json';

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const width = 200;
      const height = 200;
      const flip = true;

      webcam = new tmImage.Webcam(width, height, flip);
      await webcam.setup();

      document.getElementById("webcam-container").appendChild(webcam.canvas);

      labelContainerRef.current = document.getElementById('label-container');
      for (let i = 0; i < maxPredictions; i++) {
        labelContainerRef.current.appendChild(document.createElement('div'));
      }

      webcam.play();
      window.requestAnimationFrame(loop);
    };

    const loop = async () => {
      webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    };

    const predict = async () => {
      let prediction;
      if (webcamRef.current) {
        prediction = await model.predict(webcamRef.current.canvas);
        for (let i = 0; i < maxPredictions; i++) {
          const classPrediction = `${prediction[i].className}: ${prediction[i].probability.toFixed(2)}`;
          labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
        }
      }
    };

    init();

    return () => {
      // Cleanup code (optional)
      if (webcam) {
        webcam.pause();
        webcam.stop();
      }
    };
  }, []);

  return (
    <div>
      <div>Teachable Machine Image Model</div>
      <button type="button" onClick={() => webcam && webcam.play()}>Start</button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
    </div>
  );
};

export default TeachableMachineComponent;
