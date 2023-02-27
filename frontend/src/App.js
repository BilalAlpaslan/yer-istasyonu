import React, { useEffect, useRef } from "react";
import { useEntity } from "simpler-state";
import Map from "./map";
import Model from "./model";
import { chatConnect, data, map, count } from "./soc";



export default function App() {
  const arr = data.use()
  const mapArr = map.use()
  const c = count.use()

  useEffect(() => {
    chatConnect();
  }, []);

  return (
    <>
      <div className={"takim-adi"}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#0d2e56", fontWeight: "900" }}>Mahir Roket Takımı Yer İstasyonu</h1>
      </div>
      <div className={"top-bar"}>
        <div className={"info-item"}>
          <div className={"header"} style={{ border: "none" }}>
            <p>Kurtarma Durumu</p>
          </div>
          <div className={"tetikleme-tablosu"}>
            <table>
              <thead>
                <tr>
                  <th>Birincil Paraşüt</th>
                  <th>İkincil Paraşüt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {arr[arr.length - 1][0][0] !== '+' ? (
                    <td className={"nantrigger"}>Tetiklenmedi</td>
                  ) : (
                    <td className={"trigger"}>Tetiklendi</td>
                  )}
                  {arr[arr.length - 1][0][1] !== '+' ? (
                    <td className={"nantrigger"}>Tetiklenmedi</td>
                  ) : (
                    <td className={"trigger"}>Tetiklendi</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={"info-item"}>
          <div className={"header"}>
            <p className={"pakettt"}>Paket No</p>
            <p className={"saatt"}>Saat</p>
          </div>
          <div className={"info-item-content saat-paket"}>
            <div className={"paket-no"}>
              <p className={"first"}>{c}</p>
            </div>
            <div className={"saat"}>
              {arr[arr.length - 1][1]}
            </div>
          </div>
        </div>
        <div className={"info-item"}>
          <div className={"header"}>
            <p>İrtifa</p>
          </div>
          <div className={"info-item-content"}>
            <p className={"first"}>{arr[arr.length - 1][2]}</p>
          </div>
        </div>
        <div className={"info-item"}>
          <div className={"header"}>
            <p>Sicaklik</p>
          </div>
          <div className={"info-item-content"}>
            <p className={"first"}>{arr[arr.length - 1][9]}</p>
          </div>
        </div>
      </div>
      <div className={"bottom-bar"}>
        <div className={"info-item gps-item"}>
          <p>Roket Konum</p>
          <div style={{ color: "white" }}>{arr[arr.length - 1][6]} / {arr[arr.length - 1][7]}</div>
          {/* <iframe
            // src={"https://www.google.com/maps/@" + mapArr[0] + "," + mapArr[1] + ",15z"}
            // src="https://www.google.com/maps/@40.9127162,29.1739508,15z"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5856.969464102959!2d29.148173714294437!3d40.91908835560495!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac404efbb39e1%3A0x9c07e4446db965b4!2zQ2V2aXpsaSwgR8O8cmLDvHogU2suIE5vOjYsIDM0ODQ2IE1hbHRlcGUvxLBzdGFuYnVs!5e1!3m2!1str!2str!4v1651917759224!5m2!1str!2str"
            className={"GPS"}
            style={{ border: "0" }}   
            width="600" height="450"
            title="GPS"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe> */}
          {/* <Map/> */}
        </div>
        <div className={"info-item roket-gyro"} >
          <p>Roket Eksenleri</p>
          <div className={"roket-gyro-content"} style={{ color: "white" }}>ROKET GYRO</div>
          <div style={{ color: "white" }}>x:{arr[arr.length - 1][3]} / y:{arr[arr.length - 1][4]} / z:{arr[arr.length - 1][5]}</div>
          {/* <Model  x={arr[arr.length -1][3]} y={arr[arr.length -1][4]} z={arr[arr.length -1][5]} 
          style={{ maxWidth: "100px", maxHeight: "100px" }}
          /> */}
        </div>
      </div>
      <div className={"info-item fayda"}>
        <div className={"fayda-header"}>
          <p>Faydalı Yük</p>
        </div>
        <div className={"fayda-content"}>
          <div className={"fayda-item"}>
            <p>Sicaklik</p>
            <p>{arr[arr.length - 1][19]}</p>
          </div>
          <div className={"fayda-item"}>
            <p>Yuksekllik</p>
            <p>{arr[arr.length - 1][12]}</p>
          </div>
          <div className={"fayda-item"}>
            <p>Enlem</p>
            <p>{arr[arr.length - 1][16]}</p>
          </div>
          <div className={"fayda-item"}>
            <p>Boylam</p>
            <p>{arr[arr.length - 1][17]}</p>
          </div>
        </div>

      </div>
    </>
  );
}
