import { Button } from "antd";
import React, { useState } from "react";
import warranty from "../warranty/warranty";
import * as Style from "./styles/tag";

function tag({ generalInformationData, nextForm, preForm }) {
  const [tagName, setTagName] = useState("Furniture");
  const [pill, showPill] = useState(false);

  const submitData = () => {};
  const preComponent = {
    name: "warranty",
    title: "Warranty",
    unique: "firstName",
    isMulti: false,
    component: warranty,
    warranty: {},
  };
  const handleTag = (tag) => {
    setTagName(tag);
  };
  const createTag = () => {
    console.log("in tag");
    showPill(true);
  };
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
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>Add Tags</h4>
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
              style={{ display: "flex", flexDirection: "column", width: "97%" }}
            >
              <div>
                <h5>Tag Name:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "100%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "97%" }}
                  placeholder="Enter Tag Name"
                  onChange={(event) => handleTag(event.target)}
                />
                <Button
                  onClick={createTag}
                  style={{
                    backgroundColor: "#39b54a",
                    borderRadius: "0.5rem",
                    width: "3.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "32px",
                    height: "3.5rem",
                  }}
                >
                  +
                </Button>
              </Style.InputBorder>
            </div>
          </div>
          { pill ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "80%",
                rowGap: "1rem",
              }}
            >
              <div>
                <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>Tags</h4>
              </div>
              <div style={{ display: "flex", columnGap: "1rem" }}>
                <div
                  style={{
                    backgroundColor: "#39b54a",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.6rem",
                    color: "white",
                  }}
                >
                  { tagName }
                </div>
              </div>
            </div>
          ) : null}
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
                Save
              </Style.Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default tag;
