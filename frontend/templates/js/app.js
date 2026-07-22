import { getToken } from "./api.js";
import {
    connectToLiveKit,
    disconnectFromLiveKit,
    setMicrophoneEnabled
} from "./livekit.js";

const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const micButton = document.getElementById("micButton");

const identityInput = document.getElementById("identity");
const roomInput = document.getElementById("room");

const status = document.getElementById("status");

let isConnected = false;
let micEnabled = false;

function setStatus(message) {
    console.log(message);
    status.textContent = message;
}

function updateMicButton() {
    micButton.disabled = !isConnected;
    micButton.textContent = micEnabled ? "🔘 Microphone: On" : "🔘 Microphone: Off";
}

async function askMic() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        alert("Permission granted");
        stream.getTracks().forEach((track) => track.stop());
        return true;
    } catch (error) {
        alert(error.message);
        return false;
    }
}

connectButton.addEventListener("click", async () => {

    try {

        connectButton.disabled = true;
        setStatus("Mikrofon ruxsati tekshirilmoqda...");

        const permissionGranted = await askMic();

        if (!permissionGranted) {
            setStatus("Microphone permission not granted");
            connectButton.disabled = false;
            return;
        }

        setStatus("Backend bilan bog'lanmoqda...");

        const tokenData = await getToken(
            identityInput.value,
            roomInput.value
        );

        setStatus("LiveKit ga ulanmoqda...");

        await connectToLiveKit(
            tokenData,
            setStatus
        );

        micEnabled = true;
        isConnected = true;
        await setMicrophoneEnabled(true, setStatus);
        updateMicButton();
        disconnectButton.disabled = false;

    } catch (error) {

        console.error(error);

        setStatus(error.message);

        connectButton.disabled = false;

    }

});

disconnectButton.addEventListener("click", async () => {

    await disconnectFromLiveKit();

    isConnected = false;
    micEnabled = false;
    updateMicButton();

    connectButton.disabled = false;
    disconnectButton.disabled = true;

    setStatus("Not Connected");

});

micButton.addEventListener("click", async () => {
    if (!isConnected) {
        return;
    }

    micEnabled = await setMicrophoneEnabled(!micEnabled, setStatus);
    updateMicButton();
});

updateMicButton();