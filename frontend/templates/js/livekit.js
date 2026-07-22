const { Room, RoomEvent } = LivekitClient;

let room = null;

export async function setMicrophoneEnabled(enabled, onStatusChanged) {
    if (!room) {
        return false;
    }

    try {
        await room.localParticipant.setMicrophoneEnabled(enabled);
        onStatusChanged?.(enabled ? "🎤 Microphone enabled" : "🔈 Microphone disabled");
        return enabled;
    } catch (error) {
        console.warn("Microphone toggle failed:", error);
        onStatusChanged?.(`⚠️ ${error.message}`);
        return false;
    }
}

export async function connectToLiveKit(tokenData, onStatusChanged) {

    room = new Room();

    room
        .on(RoomEvent.Connected, () => {
            onStatusChanged("✅ Connected to LiveKit");
        })

        .on(RoomEvent.Disconnected, () => {
            onStatusChanged("❌ Disconnected");
        })

        .on(RoomEvent.TrackSubscribed, (track) => {

            if (track.kind === "audio") {

                const element = track.attach();

                document.body.appendChild(element);

                onStatusChanged("🎧 Agent audio connected");

            }

        });

    await room.connect(
        tokenData.livekit_url,
        tokenData.token
    );

    try {
        await setMicrophoneEnabled(true, onStatusChanged);
    } catch (error) {
        console.warn("Microphone unavailable:", error);
        onStatusChanged(`⚠️ ${error.message}`);
    }
}

export async function disconnectFromLiveKit() {

    if (room) {
        await room.disconnect();
        room = null;
    }

}