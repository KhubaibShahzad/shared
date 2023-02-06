import React, { useState } from "react";
import * as Style from "./styles/property-add";
import Upload from "../../../../../assets/images/upload.png";
import { MODULE_API } from "../../../../../apis";
import axios from "axios";

function propertyAdd() {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [file, setFile] = useState();
  const [video, setVideo] = useState();

  let type = [
    { id: 1, name: "House" },
    { id: 2, name: "Condominium" },
    { id: 3, name: "Appartment" },
    { id: 4, name: "Storage" },
    { id: 5, name: "Townhouse" },
    { id: 6, name: "Business" },
    { id: 7, name: "Ranch" },
    { id: 8, name: "Others" },
  ];

  const handleFileChange = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files) {
      let abc = e.target.files[0];
      console.log(abc);
      let formData = new FormData();
      formData.append("image", abc);
      let img = await MODULE_API.uploadImage(formData);
      let imgUrl = img.file_url;
      console.log("image url", imgUrl);
      setFile(imgUrl);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files) {
      let abc = e.target.files[0];
      console.log(abc);
      let formData = new FormData();
      formData.append("video", abc);
      let vid = await MODULE_API.uploadImage(formData);
      let vidUrl = vid.file_url;
      console.log("vid url", vidUrl);
      setVideo(vidUrl);
    }
  };

  async function addProperty() {
    let addProperty = await MODULE_API.addProperty({
      id: 96,
      moduleName: "PROPERTY",
      body: {
        clientModules: [
          {
            name: name,
            type: propertyType,
            city: city,
            state: state,
            zip: zipCode,
            street: street,
            images: file,
            videos: video,
          },
        ],
      },
    });
  }

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", rowGap: "2.5rem" }}
      >
        <div>
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>
            Add New Property
          </h4>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              width: "93%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>Name:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "130%",
                  height: "3.5rem",
                  display: "flex",
                  padding: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter property name"
                />
              </Style.InputBorder>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>Street:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "130%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Enter street here"
                />
              </Style.InputBorder>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>City:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "130%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city here"
                />
              </Style.InputBorder>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>State:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "141%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Enter state here"
                />
              </Style.InputBorder>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>Zip:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "126%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  marginRight: "0.5rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter ZIP here"
                />
              </Style.InputBorder>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "93%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "35%",
              rowGap: "1rem",
            }}
          >
            <div>
              <h4>Type:</h4>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                rowGap: "1rem",
              }}
            >
              {type.map((value, index) => (
                <Style.Type onClick={(e) => setPropertyType(e.target.value)}>
                  <p style={{ fontSize: "16px" }}>{value.name}</p>
                </Style.Type>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "33%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4>Upload Images:</h4>
              </div>
              <div>
                <input
                  style={{ width: "6rem" }}
                  type="file"
                  // onClick={handleFileChange}
                  onChange={handleFileChange}
                />
              </div>
              <div
                type="upload"
                style={{ backgroundColor: "#39b54a", borderRadius: "0.3rem" }}
              >
                <img
                  src={Upload}
                  style={{ padding: "0.4rem", width: "2rem" }}
                />
              </div>
            </div>
            <div></div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "25%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "130%",
                paddingLeft: "0.5rem",
              }}
            >
              <div>
                <h4>Upload Videos:</h4>
              </div>
              <div>
                <input
                  style={{ width: "6rem" }}
                  type="file"
                  onChange={handleVideoUpload}
                />
              </div>
              <div
                style={{ backgroundColor: "#39b54a", borderRadius: "0.3rem" }}
              >
                <img
                  src={Upload}
                  style={{ padding: "0.4rem", width: "2rem" }}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Style.Btn
            style={{
              border: "none",
              width: "10rem",
              height: "2rem",
              borderRadius: "0.6rem",
              color: "white",
              backgroundColor: "#39b54a",
            }}
            onClick={() => addProperty()}
          >
            Add Property
          </Style.Btn>
        </div>
      </div>
    </div>
  );
}

export default propertyAdd;
