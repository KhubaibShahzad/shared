import React from "react";
import { Button, Icon } from "antd";
import "../../custom/CustomSubFormTable.css";

const Footer = (props) => {
  const { cbPrev, cbNext } = props;
  return (
    <div className="row justify-content-between">
      <div className="col-8">
        {cbPrev ? (
          <Button
            type="primary"
            size={"large"}
            onClick={() => cbPrev()}
            style={{ background: "#39b54a", width: "20%" }}
          >
            {/* <Icon type="left" /> */}
            <span className="custom-footer-text">Previous</span>
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="col-4 d-flex justify-content-end">
        {cbNext ? (
          <Button
            type="primary"
            size={"large"}
            style={{ background: "#39b54a", width: "30%" }}
            onClick={() => {
              cbNext();
            }}
          >
            <span className="custom-footer-text">Next</span>
            {/* <Icon type="right" /> */}
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Footer;
