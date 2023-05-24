const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    const mediadevices = navigator.mediaDevices;
    if (mediadevices && mediadevices.getUserMedia) {
        mediadevices.getUserMedia({video: true}).then(function(stream) {
            video.srcObject = stream;
            video.play();
        });
    }
}

video.addEventListener('playing', () => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        if (detections.length > 0) {
            console.log(detections[0].expressions['happy'])
        }
    }, 100)
})