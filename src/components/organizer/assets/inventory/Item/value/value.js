import React, { useState } from "react";
import * as Style from "./styles/value";
import { defaultStyles } from "../../../../../../constants/style-constants/utils";
import DropDown from "../../../../../styled-components/dropdown/dropdown";
import itemAdd from "../item-add";
import warranty from "../warranty/warranty";
function value({ handleItemsAddObject, nextForm, preForm, data }) {
  const uniqueKey = Object.keys(data.value.data)[0];
  const valueInfoJob = data.value.data[uniqueKey];
  const [valueInfoData, setValueInfoData] = useState({
    Quantity: valueInfoJob && valueInfoJob["Quantity"],
    "Price Paid": valueInfoJob && valueInfoJob["Price Paid"],
    "Current Value": valueInfoJob && valueInfoJob["Current Value"],
    Condition: valueInfoJob && valueInfoJob["Condition"],
    Appreciation: valueInfoJob && valueInfoJob["Appreciation"],
    "Appraisal Source": valueInfoJob && valueInfoJob["Appraisal Source"],
    "Appraisal Date": valueInfoJob && valueInfoJob["Appraisal Date"],
  });

  const submitData = () => {
    // handleItemsAddObject(valueInfoData);
    nextForm(nextComponent);
  };

  const haldleValueInfo = (obj) => {
    console.log("obj", obj);
    const { name, value } = obj;

    setValueInfoData({
      ...valueInfoData,
      [name]: value,
    });
    console.log("valueInfoData", valueInfoData);
  };

  const nextComponent = {
    name: "warranty",
    title: "Warranty",
    unique: "matric",
    isMulti: true,
    component: warranty,
    warranty: {},
  };

  const preComponent = {
    name: "generalInformation",
    title: "General Information",
    unique: "firstName",
    isMulti: false,
    component: itemAdd,
    generalInformation: {},
  };

  const fields = [
    {
      value: {
        name: "Quantity",
        title: "Quantity",
        displayKey: "name",
        value: valueInfoData["Quantity"],
        onChange: (event) => haldleValueInfo(event.target),
      },
    },
    {
      value: {
        name: "Price Paid",
        title: "Price Paid",
        value: valueInfoData["Price Paid"],
        onChange: (event) => haldleValueInfo(event.target),
      },
    },
    {
      value: {
        name: "Current Value",
        title: "Current Value",
        value: valueInfoData["Current Value"],
        onChange: (event) => haldleValueInfo(event.target),
      },
    },
    {
      value: {
        name: "Condition",
        title: "Condition",
        value: valueInfoData["Condition"],
        onChange: (event) => haldleValueInfo(event.target),
      },
    },
    {
      value: {
        name: "Appreciation/Depreciation",
        title: "Appreciation/Depreciation",
        value: valueInfoData["Appreciation/Depreciation"],
        onChange: (event) => haldleValueInfo(event.target),
      },
    },
    {
      value: {
        name: "Appraisal Source",
        title: "Appraisal Source",
        value: valueInfoData["Appraisal Source"],
        onChange: (event) => haldleValueInfo(event.target),
      },
    },
    {
      value: {
        name: "Appraisal Date",
        title: "Appraisal Date",
        value: valueInfoData["Appraisal Date"],
        onChange: (event) => haldleValueInfo(event.target),
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
            Value Details
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
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Quantity:</h5>
              </div>
              <Style.InputBorder
                onChange={(event) => haldleValueInfo(event.target)}
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
                  placeholder="Enter Quantity Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Price Paid:</h5>
              </div>
              <Style.InputBorder
                onChange={(event) => haldleValueInfo(event.target)}
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
                  placeholder="Enter Price Paid Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Current Value:</h5>
              </div>
              <Style.InputBorder
                onChange={(event) => haldleValueInfo(event.target)}
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
                  placeholder="Enter Current Value Here"
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
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <div>
                <h5>Condition:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.m_smallDropdown}
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
              style={{ display: "flex", flexDirection: "column", width: "85%" }}
            >
              <div>
                <h5>Appreciation/Depreciation:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.m_smallDropdown}
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
                <h5>Appraisal Source:</h5>
              </div>
              <Style.InputBorder
                onChange={(event) => haldleValueInfo(event.target)}
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
                  placeholder="Enter Appraisal Source"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Appraisal Date:</h5>
              </div>
              <Style.InputBorder
                onChange={(event) => haldleValueInfo(event.target)}
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
                  placeholder="Select Appraisal Date"
                />
              </Style.InputBorder>
            </div>
            <div style={{ width: "26%" }}></div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "97%",
            marginTop: "5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "87.5%",
              }}
            >
              <Style.Btn
                style={{
                  border: "none",
                  width: "10rem",
                  height: "2rem",
                  borderRadius: "0.6rem",
                  color: "white",
                  backgroundColor: "#39b54a",
                }}
                onClick={() => preForm(preComponent)}
              >
                Previous
              </Style.Btn>
            </div>

            <div
              style={{ display: "flex", justifyContent: "end", width: "87.5%" }}
            >
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
      </div>
    </div>
  );
}

export default value;
