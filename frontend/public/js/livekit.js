const { Room, RoomEvent } = LivekitClient;

let room = null;

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

    await room.localParticipant.setMicrophoneEnabled(true);

    onStatusChanged("🎤 Microphone enabled");
}

export async function disconnectFromLiveKit() {

    if (room) {
        await room.disconnect();
        room = null;
    }

}