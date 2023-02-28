import { entity } from 'simpler-state'
// import { NotificationManager } from 'react-notifications';

export const channel = entity(0)
export const data = entity([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
export const state = entity(0)
export const map = entity([0, 0])
export const count = entity(0)
export const ports = entity([])
export const startEntity = entity(false)

export const setStart = (value) => {
    startEntity.set(value)
}

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
        if (startEntity.get()) chatConnect()
    }

    ws.onerror = function (error) {
        console.log("[error] ", error.message);
    };

}

export const disconnect = () => {
    let ws = channel.get()
    setStart(false)
    console.log("bağlantı kesildi")
    ws.send("disconnect")
    ws.close()
}

export const getPorts = () => {
    fetch("http://localhost:8001/ports", {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            ports.set(['null',...data])
        })
}

export const connectPorts = (port1 = 'null', port2 = 'null', port3 = 'null') => {
    fetch("http://localhost:8001/connect/" + port1 + "/" + port2 + "/" + port3, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("bağlantı kuruldu")
            setStart(true)
        })
}
