import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Icon } from "antd";

const formName = "messageForm";

class MessageForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { role, changeRole } = this.props;
    return (
      <React.Fragment>
        <Button onClick={changeRole}>
          {role === "ROLE" ? "Viewer" : "Client"}
        </Button>
        {role !== "ROLE" ? (
          <Row>
            <Col span={24}>
              <h3
                className="font-weight-bold"
                style={{ color: "#39b54a", marginTop: "30px" }}
              >
                This is what the Viewer will see
              </h3>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <div className="info-form-block" style={{ marginTop: "30px" }}>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Asset Planet Message
              </h2>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                On behalf of everyone at Asset Planet we extend our deepest
                sympathies for the difficulties you are facing if you are
                reading this introduction. This event was triggered by a recent
                death or incapacity by someone that loved or trusted you. Our
                client has empowered you with helping carry out their final
                wishes using this program in connection with any legal documents
                they have created and left behind.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                Each topic within this estate planning module has help features
                found on each page (top right side under the help icon). You
                were given a specific user access code that locked your ability
                to delete or make changes to program. You don?t have to worry
                over making mistakes and you can?t break anything by clicking or
                exploring. If you get lost within the program just get back here
                by going to the menu top menu bar for ? Worst Case Scenarios.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                To ease your burden our Asset Planet client has prepared for
                this possibility by using our software and this specific module.
                On the left side of this screen you will see 14 different topics
                starting with the message that you are reading right now. After
                this topic, go to Audio/Video message as our user was given the
                opportunity to leave a voice or video message for their family,
                friends and loved ones and this is where it will be located.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                Following this message is your checklist that has been crafted
                by our user to help make this difficult process easier. The
                checklist can be electronically updated in this planner and
                changes will be reflected from any web-based browser that can
                access assetplanet.com. You can also print out the checklist if
                this is more convenient for you
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                Keep following down the list as everything has been carefully
                arranged and details completed as per our clients wishes. The
                final topic for Programming Status reflects the progress made by
                user in completing this module. It is possible that this may not
                be complete and this knowledge will help you understand what
                remains to be done based on what the user was able to finish.
              </h4>
            </Col>
          </Row>
        </div>
        <div className="row justify-content-between">
          <div className="col-8"></div>
          <div className="col-4 d-flex justify-content-end">
            <Button
              type="primary"
              size={"large"}
              onClick={() => {
                console.log("FORM DATA ", this.props.checklistObject);
                this.props.nextForm();
              }}
              style={{ background: "#39b54a", width: "30%" }}
            >
              {/* <Icon type="left" /> */}
              <span className="custom-footer-text">Next</span>
            </Button>

            {/* <Button
              type="primary"
              size={"large"}
              onClick={() => {
                console.log("FORM DATA ", this.props.checklistObject);
                this.props.nextForm();
              }}
            >
              Next
              <Icon type="right" />
            </Button> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MessageForm;
