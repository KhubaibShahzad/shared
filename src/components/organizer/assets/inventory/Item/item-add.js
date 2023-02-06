import React, { useState } from "react";
import DropDown from "../../../../styled-components/dropdown/dropdown";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import * as Style from "./styles/item-add";
import Upload from "../../../../../assets/images/upload.png";
import value from "./value/value";

function itemAdd({ handleItemsAddObject, nextForm, data }) {
  const uniqueKey = Object.keys(data.generalInformation.data)[0];
  const generalInfoJob = data.generalInformation.data[uniqueKey];

  const [generalInformationData, setGeneralInformationData] = useState({
    Property: generalInfoJob && generalInfoJob["Property"],
    Room: generalInfoJob && generalInfoJob["Room"],
    Name: generalInfoJob && generalInfoJob["Name"],
    "Universal Product Code":
      generalInfoJob && generalInfoJob["Universal Product Code"],
    "Serial Number": generalInfoJob && generalInfoJob["Serial Number"],
    Owner: generalInfoJob && generalInfoJob["Owner"],
    Brand: generalInfoJob && generalInfoJob["Brand"],
    Model: generalInfoJob && generalInfoJob["Model"],
    "Special Features": generalInfoJob && generalInfoJob["Special Features"],
    "Upload Image": generalInfoJob && generalInfoJob["Upload Image"],
    "Upload Videos": generalInfoJob && generalInfoJob["Upload Videos"],
  });

  const nextComponent = {
    name: "valueDetails",
    title: "Value",
    unique: "matric",
    isMulti: true,
    component: value,
    value: {},
  };

  const submitData = () => {
    handleItemsAddObject(generalInformationData);
    nextForm(nextComponent);
  };

  const handleGeneralInformation = (obj) => {
    console.log("obj", obj);
    const { name, value } = obj;

    setGeneralInformationData({
      ...generalInformationData,
      [name]: value,
    });
    console.log("generalInformationData", generalInformationData);
  };

  const fields = [
    {
      value: {
        name: "Property",
        title: "Property",
        displayKey: "name",
        value: generalInformationData["Property"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Room",
        title: "Room",
        displayKey: "name",
        value: generalInformationData["Room"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Name",
        title: "Name",
        value: generalInformationData["Name"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Universal Product Code",
        title: "Universal Product Code",
        value: generalInformationData["Universal Product Code"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Serial Number",
        title: "Serial Number",
        value: generalInformationData["Serial Number"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Owner",
        title: "Owner",
        value: generalInformationData["Owner"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Brand",
        title: "Brand",
        value: generalInformationData["Brand"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Model",
        title: "Model",
        value: generalInformationData["Model"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Special Features",
        title: "Special Features",
        value: generalInformationData["Special Features"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Upload Images",
        title: "Upload Images",
        value: generalInformationData["Upload Images"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
    {
      value: {
        name: "Upload Videos",
        title: "Upload Videos",
        value: generalInformationData["Upload Videos"],
        onChange: (event) => handleGeneralInformation(event.target),
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "1.5rem",
          rowGap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <h4 style={{ fontSize: "19px" }}>Add New Item</h4>
        </div>

        <div style={{ borderBottom: "2px solid #d9d9d9" }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>
            General Information
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "2.5rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <div>
                <h5>Property:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.mediumlargeDropDown}
                  name="Select"
                  title="Property"
                  // setSelectedItem={onChange}
                  list={[
                    { id: 1, name: "Bookkeeper" },
                    { id: 2, name: "CPA" },
                    { id: 3, name: "Financial Advisor" },
                  ]}
                  displayKey="name"
                />
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <div>
                <h5>Room:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.mediumlargeDropDown}
                  name="Select"
                  title="Property"
                  // setSelectedItem={onChange}
                  list={[
                    { id: 1, name: "Bookkeeper" },
                    { id: 2, name: "CPA" },
                    { id: 3, name: "Financial Advisor" },
                  ]}
                  displayKey="name"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Name:</h5>
              </div>
              <Style.InputBorder
                onChange={(event) => handleGeneralInformation(event.target)}
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  padding: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Item name"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Universal Product Code:</h5>
              </div>
              <Style.InputBorder
                onChange={(e) => handleGeneralInformation(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Universal Product Code"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Serial Number:</h5>
              </div>
              <Style.InputBorder
                onChange={(e) => handleGeneralInformation(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Serial Number here"
                />
              </Style.InputBorder>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Owner:</h5>
              </div>
              <Style.InputBorder
                onChange={(e) => handleGeneralInformation(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  padding: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Owner name"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Brand:</h5>
              </div>
              <Style.InputBorder
                onChange={(e) => handleGeneralInformation(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Brand Name Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Model:</h5>
              </div>
              <Style.InputBorder
                onChange={(e) => handleGeneralInformation(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Model Number here"
                />
              </Style.InputBorder>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            marginLeft: "9.5rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            <div>
              <h4>Special Features</h4>
            </div>
            <Style.RoomInput>
              <input
                onChange={(e) => handleGeneralInformation(e.target.value)}
                style={{
                  width: "18.5rem",
                  height: "11rem",
                  outline: "none",
                  border: "none",
                  padding: "0rem 0 7rem 1rem",
                  borderRadius: "0.5rem",
                }}
                placeholder="Enter Special Features Here"
              />
            </Style.RoomInput>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "27%",
              marginLeft: "6.5rem",
              rowGap: "1rem",
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
            style={{
              display: "flex",
              flexDirection: "column",
              width: "25%",
              rowGap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "112%",
                paddingLeft: "0.5rem",
                marginLeft: "6rem",
              }}
            >
              <div>
                <h4>Upload Videos:</h4>
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
        <div style={{ display: "flex", justifyContent: "end", width: "88%" }}>
          <Style.Btn
            style={{
              border: "none",
              width: "10rem",
              height: "2rem",
              borderRadius: "0.6rem",
              color: "white",
              backgroundColor: "#39b54a",
            }}
            onClick={submitData}
          >
            Next
          </Style.Btn>
        </div>
      </div>
    </div>
  );
}

export default itemAdd;
