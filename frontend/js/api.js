const BACKEND_URL = "http://16.171.31.78:8000";

/*
    Keyinchalik Cloudflare Tunnel yoki AWS ga o'tganimizda
    faqat shu URL ni almashtiramiz.
*/

export async function getToken(identity, roomName) {

    const response = await fetch(`${BACKEND_URL}/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identity: identity,
            room_name: roomName
        })
    });

    if (!response.ok) {
        throw new Error("Backend token yaratolmadi.");
    }

    return await response.json();
}