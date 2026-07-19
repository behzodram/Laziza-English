import { getToken } from "./api.js";
import {
    connectToLiveKit,
    disconnectFromLiveKit
} from "./livekit.js";

const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");

const identityInput = document.getElementById("identity");
const roomInput = document.getElementById("room");

const status = document.getElementById("status");

function setStatus(message) {
    console.log(message);
    status.textContent = message;
}

connectButton.addEventListener("click", async () => {

    try {

        connectButton.disabled = true;

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

        disconnectButton.disabled = false;

    } catch (error) {

        console.error(error);

        setStatus(error.message);

        connectButton.disabled = false;

    }

});

disconnectButton.addEventListener("click", async () => {

    await disconnectFromLiveKit();

    connectButton.disabled = false;

    disconnectButton.disabled = true;

    setStatus("Not Connected");

});