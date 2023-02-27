import struct
import time
from typing import List
from eth_utils import to_bytes
import serial
from serial.tools import list_ports


def save_to_file(data: list):
    with open('data.csv', 'a') as f:
        data = [str(i) for i in data]
        data = time.strftime('%Y-%m-%d %H:%M:%S') + ',' + ','.join(data) + '\n'
        f.write(str(data))


def convert_to_bytes(
    sayac: int,
    irtifa: float,
    enlem: float,
    boylam: float,
    gps_irtifa: float,
    faydali_enlem: float,
    faydali_boylam: float,
    faydali_irtifa: float,
    gyr_x: float,
    gyr_y: float,
    gyr_z: float,
    durum: int,
) -> bytes:

    # 78 bytes size byte array
    my_bytes = bytearray(78)
    my_bytes[0] = 0xFF
    my_bytes[1] = 0xFF
    my_bytes[2] = 0x54
    my_bytes[3] = 0x52
    # TAKIM ID SINI BURAYA YAZICAKSINN !!!!!!!
    my_bytes[4] = int(24).to_bytes(1, 'big')[0]
    my_bytes[5] = sayac.to_bytes(1, 'big')[0]

    irtifa = irtifa if type(irtifa) is float else 0.0
    irtifa_bytes = bytearray(struct.pack("f", irtifa))
    my_bytes[6] = irtifa_bytes[0]
    my_bytes[7] = irtifa_bytes[1]
    my_bytes[8] = irtifa_bytes[2]
    my_bytes[9] = irtifa_bytes[3]

    enlem = enlem if type(enlem) is float else 0.0
    boylam = boylam if type(boylam) is float else 0.0
    gps_irtifa = gps_irtifa if type(gps_irtifa) is float else 0.0
    enlem_bytes = bytearray(struct.pack("f", enlem))
    boylam_bytes = bytearray(struct.pack("f", boylam))
    gps_irtifa_bytes = bytearray(struct.pack("f", gps_irtifa))
    my_bytes[10] = gps_irtifa_bytes[0]
    my_bytes[11] = gps_irtifa_bytes[1]
    my_bytes[12] = gps_irtifa_bytes[2]
    my_bytes[13] = gps_irtifa_bytes[3]
    my_bytes[14] = enlem_bytes[0]
    my_bytes[15] = enlem_bytes[1]
    my_bytes[16] = enlem_bytes[2]
    my_bytes[17] = enlem_bytes[3]
    my_bytes[18] = boylam_bytes[0]
    my_bytes[19] = boylam_bytes[1]
    my_bytes[20] = boylam_bytes[2]
    my_bytes[21] = boylam_bytes[3]

    faydali_enlem_bytes = bytearray(struct.pack("f", faydali_enlem))
    faydali_boylam_bytes = bytearray(struct.pack("f", faydali_boylam))
    faydali_irtifa_bytes = bytearray(struct.pack("f", faydali_irtifa))
    my_bytes[22] = faydali_irtifa_bytes[0]
    my_bytes[23] = faydali_irtifa_bytes[1]
    my_bytes[24] = faydali_irtifa_bytes[2]
    my_bytes[25] = faydali_irtifa_bytes[3]
    my_bytes[26] = faydali_enlem_bytes[0]
    my_bytes[27] = faydali_enlem_bytes[1]
    my_bytes[28] = faydali_enlem_bytes[2]
    my_bytes[29] = faydali_enlem_bytes[3]
    my_bytes[30] = faydali_boylam_bytes[0]
    my_bytes[31] = faydali_boylam_bytes[1]
    my_bytes[32] = faydali_boylam_bytes[2]
    my_bytes[33] = faydali_boylam_bytes[3]

    my_bytes[34] = 0xFF
    my_bytes[35] = 0xFF
    my_bytes[36] = 0xFF
    my_bytes[37] = 0xFF
    my_bytes[38] = 0xFF
    my_bytes[39] = 0xFF
    my_bytes[40] = 0xFF
    my_bytes[41] = 0xFF
    my_bytes[42] = 0xFF
    my_bytes[43] = 0xFF
    my_bytes[44] = 0xFF
    my_bytes[45] = 0xFF

    gyr_x = gyr_x if type(gyr_x) is float else 0.0
    gyr_y = gyr_y if type(gyr_y) is float else 0.0
    gyr_z = gyr_z if type(gyr_z) is float else 0.0
    gyr_x_bytes = bytearray(struct.pack("f", gyr_x))
    gyr_y_bytes = bytearray(struct.pack("f", gyr_y))
    gyr_z_bytes = bytearray(struct.pack("f", gyr_z))
    my_bytes[46] = 0xFF
    my_bytes[47] = 0xFF
    my_bytes[48] = 0xFF
    my_bytes[49] = 0xFF
    my_bytes[50] = 0xFF
    my_bytes[51] = 0xFF
    my_bytes[52] = 0xFF
    my_bytes[53] = 0xFF
    my_bytes[54] = 0xFF
    my_bytes[55] = 0xFF
    my_bytes[56] = 0xFF
    my_bytes[57] = 0xFF

    my_bytes[58] = 0xFF
    my_bytes[59] = 0xFF
    my_bytes[60] = 0xFF
    my_bytes[61] = 0xFF
    my_bytes[62] = 0xFF
    my_bytes[63] = 0xFF
    my_bytes[64] = 0xFF
    my_bytes[65] = 0xFF
    my_bytes[66] = 0xFF
    my_bytes[67] = 0xFF
    my_bytes[68] = 0xFF
    my_bytes[69] = 0xFF
    my_bytes[70] = 0xFF
    my_bytes[71] = 0xFF
    my_bytes[72] = 0xFF
    my_bytes[73] = 0xFF
    my_bytes[74] = int(durum).to_bytes(1, 'big')[0]

    check_sum = sum(my_bytes[4:75]) % 256
    my_bytes[75] = check_sum

    my_bytes[76] = 0x0D
    my_bytes[77] = 0x0A

    return my_bytes


def get_port() -> List[serial.Serial]:
    ports = [p.device for p in list_ports.comports() if 'USB' in p.description]
    if not ports:
        raise IOError("Seri Baglantili cihaz yok!")
    print(ports)

    return serial.Serial("COM8", 9600), serial.Serial("COM9", 9600), serial.Serial("COM10", 19200)


def main():
    ser, ser2, ser3 = get_port()
    sayac = 0
    data = '0,0,0,0,0'
    data2 = '0,0,0,0,0,0,0'

    while True:
        if (ser.inWaiting() > 0):
            data = ser.read(ser.inWaiting()).decode(
                'utf-8').strip().replace('\n', '').replace(' ', '')
        if (ser2.inWaiting() > 0):
            data2 = ser2.read(ser2.inWaiting()).decode(
                'utf-8').strip().replace('\n', '').replace(' ', '')
        # data = ser.readline().decode('utf-8').strip().replace('\n', '').replace(' ', '')
        # data2 = ser2.readline().decode('utf-8').strip().replace('\n', '').replace(' ', '')

        veriii = data.split(',')
        veriii2 = data2.split(',')
        veriii = [i if i != '' else 0. for i in veriii]
        veriii2 = [i if i != '' else 0. for i in veriii2]
        print(veriii + veriii2)
        save_to_file(veriii + veriii2)

        durum = 1
        if veriii[4] in ['0', '1']:
            durum = 1
        elif veriii[4] == '2':
            durum = 2
        elif veriii[4] in ['3', '4']:
            durum = 4

        ser3.write(convert_to_bytes(
            sayac,
            float(veriii[3]),
            float(veriii[0]),
            float(veriii[1]),
            float(veriii[2]),
            float(veriii2[0]),
            float(veriii2[1]),
            float(veriii2[2]),
            0.0,  # veriii[3] if type(veriii[3]) is float else -7.01,
            0.0,  # veriii[4] if type(veriii[4]) is float else -1.2,
            0.0,  # veriii[5] if type(veriii[5]) is float else 2.9,
            durum
        ))

        if sayac == 255:
            sayac = 0
        sayac += 1
        time.sleep(0.5)


main()
