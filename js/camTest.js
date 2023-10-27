const cameraWidth = 300;
const cameraHeight = 400;

const cameraInitSmartphoneSupport = () => {
    const video = document.getElementById("camera");

    const cameraSetting = {
        audio: false,
        video: {
            width: cameraWidth,
            height: cameraHeight,
            facingMode: "environment",
        }
    }

    navigator.mediaDevices.getUserMedia(cameraSetting)
        .then((mediaStream) => {
            video.srcObject = mediaStream;
        })
        .catch((err) => {
            console.log(err.toString());
        });
}

window.cameraInitSmartphoneSupport = cameraInitSmartphoneSupport;
export{ cameraInitSmartphoneSupport };