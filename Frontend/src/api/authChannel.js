let channel = null;

export const initAuthChannel = (onMessage) => {
    if (!channel) {
        channel = new BroadcastChannel("auth");
    }

    channel.onmessage = (event) => {
        if (!event.data) return;

        onMessage(event.data);
    };


    return () => {
        channel?.close();
        channel = null;
    };
};

export const sendAuthEvent = (data) => {
    if (!channel) {
        channel = new BroadcastChannel("auth");
    }

    channel.postMessage(data);
};