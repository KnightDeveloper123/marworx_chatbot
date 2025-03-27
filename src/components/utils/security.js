const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encrypt = (data) => {
    const keyBytes = new TextEncoder().encode(SECRET_KEY.padEnd(32, " ").slice(0, 32));
    const textBytes = new TextEncoder().encode(JSON.stringify(data));

    // XOR encryption
    const encryptedBytes = textBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

    // Convert to base64 for better readability
    return btoa(String.fromCharCode(...encryptedBytes));
};

export const decrypt = (encryptedData) => {
    const keyBytes = new TextEncoder().encode(SECRET_KEY.padEnd(32, " ").slice(0, 32));

    // Convert base64 back to bytes
    const textBytes = Uint8Array.from(atob(encryptedData), char => char.charCodeAt(0));

    // XOR decryption
    const decryptedBytes = textBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

    return JSON.parse(new TextDecoder().decode(decryptedBytes));
};
