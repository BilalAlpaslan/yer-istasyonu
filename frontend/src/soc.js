import { entity } from 'simpler-state'
// import { NotificationManager } from 'react-notifications';

export const channel = entity(0)
export const data = entity([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
export const state = entity(0)
export const map = entity([0, 0])
export const count = entity(0)

export const chatConnect = () => {
    if (channel.get()) console.log("channel var")
    else {
        let Ws = new WebSocket("ws://localhost:8001");

        channel.set(Ws)
    }

    let ws = channel.get()

    ws.onmessage = function (event) {
        count.set(count.get() + 1)
        let packets = event.data.split(",");
        data.set([...data.get(), packets])

        if (data.get().length > 9)
            data.set(data.get().slice(1, data.get().length))

        map.set([packets[6], packets[7]])
    };

    ws.onclose = function (event) {
        channel.set(0)
        state.set(0)
        if (event.wasClean) {
            console.log("[close] Connection closed cleanly, code=", event.code, "reason=", event.reason);
        } else {
            console.log("[close] Connection died");
        }
        chatConnect()
    }

    ws.onerror = function (error) {
        console.log("[error] ", error.message);
    };




}
