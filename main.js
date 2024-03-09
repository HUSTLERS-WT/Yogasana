// Code to load the model and estimate poses



import * as poseDetection from '@tensorflow-models/pose-detection';


const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);

const video = document.getElementById('vid');
const poses = await detector.estimatePoses(video);

console.log(poses[0].keypoints);