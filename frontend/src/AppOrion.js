import React, { Component, useEffect, useState } from "react";
import { useEntity } from "simpler-state";
import { chatConnect, data } from "./soc";
import logo from "./logo.png";
import Map from "./map";


export default function App() {
  var arr = useEntity(data)

  useEffect(() => {
    chatConnect()
  }, []);

  return (
    <>
      <div className={"nav-bar"}>
        <h1 style={{ textAlign: "center", marginBottom: 20, color: "green", fontWeight: 900 }}>Orion Roket Takımı Yer İstasyonu</h1>
      </div>
      <div className={"saat"}>
        <p>Saat: </p>
        <p className={"saat-deger"}>{arr[arr.length - 1][1]}</p>
      </div>
      <div className={"info-box"}>
        <div className={"left-side"}>
          <div className={"roket-gyro"}>
            <img src={logo}  alt="roket-gyro" style={{ width: "35%", height: "auto", paddingTop:'10px' }} />
          </div>
          <div className={"sensor-verileri"}>
            <div className={"sensor-verileri-header"}>Sensör Verileri</div>
            <div className={"item-content-container"}>
              <div className={"item-info"}>
                <div className={"item-info-header"}>Sıcaklık:</div>
                <div className={"item-info-content"}>{arr[arr.length - 1][9]} C°</div>
              </div>
              <div className={"item-info"}>
                <div className={"item-info-header"}>İrtifa:</div>
                <div className={"item-info-content"}>{arr[arr.length - 1][2]} m</div>
              </div>
              <div className={"item-info"}>
                <div className={"item-info-header"}>Uydu:</div>
                <div className={"item-info-content"}>{arr[arr.length - 1][8]}</div>
              </div>
              <div className={"item-info"}>
                <div className={"item-info-header"}>x:</div>
                <div className={"item-info-content"}>{arr[arr.length - 1][3]}</div>
              </div>
              <div className={"item-info"}>
                <div className={"item-info-header"}>y:</div>
                <div className={"item-info-content"}>{arr[arr.length - 1][4]}</div>
              </div>
              <div className={"item-info"}>
                <div className={"item-info-header"}>z:</div>
                <div className={"item-info-content"}>{arr[arr.length - 1][5]}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={"right-side"}>
          <div className={"tetikleme-durumu"}>
            <div className={"tetikleme-header"} style={{ border: "none" }}>
              Kurtarma Durumu
            </div>
            <div className={"tetikleme-tablosu"}>
              <table>
                <thead>
                  <tr>
                    <th>Birincil Paraşüt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {arr[arr.length - 1][0] == '+'
                      ? (<td className={"trigger"}>Tetiklendi</td>)
                      : (<td className={"nantrigger"}>Tetiklenmedi</td>)
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"roket-konum"}>
            <div className={"roket-konum-header"}>
              Roket Konumu   {arr[arr.length - 1][6]} / {arr[arr.length - 1][7]}
            </div>
            <div className={"roket-konum-content"}>
              {/* <iframe
                className={"GPS"}
                src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5867.457499457801!2d31.167786868388554!3d40.800582879220855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d750fe504d503%3A0x79ec2fbab9d9175c!2sHAFIZ%20%C4%B0HO%20STEAM%20MERKEZ%C4%B0!5e1!3m2!1str!2str!4v1656817205328!5m2!1str!2str"}
                width="600"
                height="450"
                style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                {/* <Map></Map> */}
            </div>
          </div>
        </div>
        
      </div>
      <div className={"  fayda"}>
       <div className={"fayda-header"}>
          <p>Faydalı Yük</p>
       </div>
       <div className={"fayda-content"}>
          <div className={"fayda-item"}>
            <p>Sicaklik</p>
            <p>{arr[arr.length -1][19]}</p>
          </div>
          <div className={"fayda-item"}>
          <p>Yukseklik</p>
            <p>{arr[arr.length -1][12]}</p>
          </div>
          <div className={"fayda-item"}>
          <p>Enlem</p>
            <p>{arr[arr.length -1][16]}</p>
          </div>
          <div className={"fayda-item"}>
          <p>Boylam</p>
            <p>{arr[arr.length -1][17]}</p>
          </div>
        </div> 
      </div>
    </>
  );
}
