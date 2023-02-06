import React, { useState } from "react";
import * as Style from "./styles/room-add";
import Upload from "../../../../../assets/images/upload.png";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import DropDown from "../../../../styled-components/dropdown/dropdown";
import { MODULE_API } from "../../../../../apis";

function roomAdd() {
  const [name, setName] = useState();
  const [property, setProperty] = useState();
  const [details, setDetails] = useState();
  const [image, setImage] = useState();
  const [video, setVideo] = useState();

  const { styles } = defaultStyles;

  async function addRoom() {
    let addRoom = await MODULE_API.addProperty({
      id: 96,
      moduleName: "ROOM",
      body: {
        clientModules: [
          {
            name: name,
            detail: details,
            images: image,
            videos: video,
            parentId: 7333,
          },
        ],
      },
    });
  }

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
      setImage(imgUrl);
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

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", rowGap: "2.5rem" }}
      >
        <div>
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>Add New Room</h4>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "49%" }}
            >
              <div>
                <h5>Name:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  height: "3.5rem",
                  display: "flex",
                  padding: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Room Name"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "49%" }}
            >
              <div>
                <h5>Property:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.mediumDropDown}
                  name="Select"
                  title="Property"
                  // setSelectedItem={onChange}
                  list={[
                    { id: 1, name: "Bookkeeper" },
                    { id: 2, name: "CPA" },
                    { id: 3, name: "Financial" },
                  ]}
                  displayKey="name"
                />
              </div>
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
              <h4>Room:</h4>
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
              <Style.RoomInput
                style={{
                  outline: "none",
                  border: "none",
                  width: "100%",
                  height: "11rem",
                  borderRadius: "0.5rem",
                  padding: "0rem 0 7rem 1rem",
                }}
                placeholder="Enter Room Details Here"
                onChange={(e) => setDetails(e.target.value)}
              />
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
                  onChange={handleFileChange}
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
            onClick={() => addRoom()}
          >
            Add Room
          </Style.Btn>
        </div>
      </div>
    </div>
  );
}

export default roomAdd;
