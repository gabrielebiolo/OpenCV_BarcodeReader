// SCRIPT BASE

// let video = document.getElementById("videoInput"); // video is the id of video tag
// navigator.mediaDevices.getUserMedia({ video: true, audio: false })
//     .then(function(stream) {
//         video.srcObject = stream;
//         video.play();
//     })
//     .catch(function(err) {
//         console.log("An error occurred! " + err);
//     });

// let canvasFrame = document.getElementById("canvasFrame"); // canvasFrame is the id of <canvas>
// let context = canvasFrame.getContext("2d");
// let src = new cv.Mat(height, width, cv.CV_8UC4);
// let dst = new cv.Mat(height, width, cv.CV_8UC1);
// const FPS = 30;
// function processVideo() {
//     let begin = Date.now();
//     context.drawImage(video, 0, 0, width, height);
//     src.data.set(context.getImageData(0, 0, width, height).data);
//     cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
//     cv.imshow("canvasOutput", dst); // canvasOutput is the id of another <canvas>;
//     // schedule next one.
//     let delay = 1000/FPS - (Date.now() - begin);
//     setTimeout(processVideo, delay);
// }
// // schedule first one.
// setTimeout(processVideo, 0);


// SCRIPT BASE MA SEMPLIFICATO

// let src = new cv.Mat(height, width, cv.CV_8UC4);
// let dst = new cv.Mat(height, width, cv.CV_8UC1);
// let cap = new cv.VideoCapture(videoSource);
// const FPS = 30;
// function processVideo() {
//     let begin = Date.now();
//     cap.read(src);
//     cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
//     cv.imshow("canvasOutput", dst);
//     // schedule next one.
//     let delay = 1000/FPS - (Date.now() - begin);
//     setTimeout(processVideo, delay);
// }
// // schedule first one.
// setTimeout(processVideo, 0);


// SCRIPT DI ESEMPIO

let video = document.getElementById('webcam');
let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
let cap = new cv.VideoCapture(video);

const FPS = 30;
function processVideo() {
    try {
        if (!streaming) {
            // clean and stop.
            src.delete();
            dst.delete();
            return;
        }
        let begin = Date.now();
        // start processing.
        cap.read(src);
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow('output', dst);
        // schedule the next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    } catch (err) {
        utils.printError(err);
    }
};

// schedule the first one.
setTimeout(processVideo, 0);
