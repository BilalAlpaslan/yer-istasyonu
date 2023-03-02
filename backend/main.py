import time

import serial
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ser import convert_to_bytes
from serial.tools import list_ports

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

Serial1: serial.Serial = None
Serial2: serial.Serial = None
Serial3: serial.Serial = None

serial1_prev = '0,0,0,0,0,0,0,0,0,0'
serial2_prev = '0,0,0,0,0,0,0,0,0,0'


counter = -1


def get_counter():
    global counter
    counter += 1
    if counter == 255:
        counter = 0
    return counter


def clean(data: bytes) -> str:
    return data.decode('utf-8').strip().replace('\n', '').replace(
        '\r', '').replace('\t', '').replace(' ', '')


@app.get("/ports")
def get_ports():
    return [p.device for p in list_ports.comports() if 'USB' in p.description]


@app.get("/connect/{port1}/{port2}/{port3}")
def connect(port1: str, port2: str, port3: str):
    global Serial1, Serial2, Serial3
    if port1 != 'null':
        Serial1 = serial.Serial(port1, 9600, timeout=0.4)
    if port2 != 'null':
        Serial2 = serial.Serial(port2, 9600, timeout=0.3)
    if port3 != 'null':
        Serial3 = serial.Serial(port3, 9600, timeout=0.3)
    return {
        "message": f"connected to ports {port1}, {port2}, {port3}",
        "port1": port1, "port2": port2, "port3": port3
    }


@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    global Serial1, Serial2, Serial3, serial1_prev, serial2_prev
    await websocket.accept()
    try:
        while True:
            if Serial1:
                if Serial1.inWaiting() > 0:
                    data = clean(Serial1.read(Serial1.inWaiting()))
                    serial1_prev = data
                else:
                    data = serial1_prev
            else:
                data = serial1_prev

            if Serial2:
                if Serial2.inWaiting() > 0:
                    temp = clean(Serial2.read(Serial2.inWaiting()))
                    data = f"{data},{temp}"
                    serial2_prev = temp
                else:
                    data = f"{data},{serial2_prev}"
            else:
                data = f"{data},{serial2_prev}"

            print(data)
            await websocket.send_text(data)

            if Serial3:  # work only if Serial3 is connected (HYI)
                veriii = data.split(',')
                durum = 1
                if veriii[0] == '-':
                    durum = 1
                elif veriii[0] == '+':
                    durum = 4

                Serial3.write(
                    convert_to_bytes(
                        get_counter(),
                        float(veriii[2]),
                        float(veriii[6]),
                        float(veriii[7]),
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        float(veriii[3]),
                        float(veriii[4]),
                        float(veriii[5]),
                        durum
                    ))
            time.sleep(0.5)

    except WebSocketDisconnect as e:
        print("disconnect", e)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(
        "main:app",
        # workers=4,
        port=8001,
        reload=True,
    )
