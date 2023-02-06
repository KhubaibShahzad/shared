import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Icon } from "antd";
import form from "../../../assets/images/form.png";
import Footer from "../components/footer";
import "./death.css";
import "../../custom/CustomSubFormTable.css";

const formName = "checkList";
const radioStyle = {
  borderRadius: "100px",
  marginRight: "30px",
  width: "200px",
  boxShadow: "1px 3px 1px #9E9E9E",
};

class ChecklistForm extends Component {
  constructor(props) {
    super(props);
  }

  getSelectedColor = (name, value) => {
    const { checklistObject } = this.props;
    if (
      checklistObject[formName][name] &&
      checklistObject[formName][name] === value
    )
      return {
        borderRadius: "5px",
        marginLeft: "10px",
        backgroundColor: "#39b54a",
      };

    return {
      borderRadius: "5px",
      marginLeft: "10px",
    };
  };

  getRadioField = (
    title,
    name,
    buttons = ["Not Started", "Incomplete", "Complete", "Not Applicable"]
  ) => {
    const { handleInputChange,handleRadioChange, checklistObject,currentForm } = this.props;
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16} type="flex" justify="center" align="center">
          <Form.Item label={title}>
            <Radio.Group
              defaultValue={checklistObject[formName][name]}
              name={name}
              size={"large"}
              onChange={(e) => {
                handleRadioChange(
                name,
                e.target.value,
                currentForm
              )}}
              buttonStyle="solid"
            >
              {buttons.map((button) => {
                return (
                  <Radio.Button
                    style={this.getSelectedColor(name, button)}
                    value={button}
                    className="checklist-hover-style"
                  >
                    {button}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    );
  };

  getCustomRadioField = (title, name, fields = []) => {
    const { handleInputChange,handleRadioChange, checklistObject,currentForm } = this.props;

    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16} type="flex" justify="center" align="center">
          <Form.Item label={title}>
            <Radio.Group
              defaultValue={checklistObject[formName][name]}
              name={name}
              size={"large"}
              buttonStyle="solid"
              onChange={(e) => {
                handleRadioChange(
                name,
                e.target.value,
                currentForm
              )}}
            >
              {fields.map((field) => {
                return (
                  <Radio.Button
                    style={this.getSelectedColor(name, field)}
                    value={field}
                    className="checklist-hover-style"
                  >
                    {field}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      checkList: { will, trust, advance_health_directives },
    } = this.props.checklistObject;

    const { role } = this.props;

    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                <img
                  src={form}
                  height={85}
                  width={85}
                  style={{ marginRight: "20px" }}
                ></img>
                Checklist
              </h2>
            </Col>
          </Row>
          {role === "ROLE" ? (
            <React.Fragment>
              {this.getRadioField(
                "Audio / Video Message Did you play your message ?",
                "audio_video_message",
                ["Incomplete", "Complete"]
              )}
              {this.getRadioField(
                "Personal Instructions",
                "personal_instructions",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Emails and Texts to Send Click Send Button for Email and Text",
                "emails_to_send",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Contact List Click on Trusted Advisor Button to see who will be helping",
                "contact_list",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Were death certificates ordered ?",
                "certificates",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Prepaid Burial Expenses",
                "prepaid_burial_expenses",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField("Bills to Pay", "bills_to_pay", [
                "Incomplete",
                "Complete",
              ])}

              {this.getRadioField(
                "Was account titling changed ?",
                "title_changed",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Was cost of bill updated ?",
                "cost_updated",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Was all medical equipment returned ?",
                "equipment_returned",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField("Important Document", "important_document", [
                "Incomplete",
                "Complete",
              ])}

              {this.getRadioField("Litigation List", "litigation_list", [
                "Incomplete",
                "Complete",
              ])}

              {this.getRadioField(
                "Location of Personal Items",
                "location_of_personal_items",
                ["Incomplete", "Complete"]
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.getRadioField(
                "Audio / Video Message",
                "audio_video_message"
              )}
              {this.getRadioField("Checklist", "checklist")}
              {this.getRadioField("Contact List", "contact_list")}
              {this.getRadioField("Emails to Send", "emails_to_send")}
              {this.getRadioField("Important Document", "important_document")}
              {this.getRadioField(
                "Personal Instructions",
                "personal_instructions"
              )}
              {this.getRadioField("List of Large Bills", "list_of_large_bills")}
              {this.getRadioField("Litigation List", "litigation_list")}
              {this.getRadioField(
                "Location of Personal Items",
                "location_of_personal_items"
              )}
              {this.getRadioField("List of Passwords", "list_of_passwords")}
              {this.getRadioField(
                "Prepaid Burial Expenses",
                "prepaid_burial_expenses"
              )}
              {this.getCustomRadioField("Will", "will", ["Yes", "No"])}
              {this.getCustomRadioField("Trust", "trust", ["Yes", "No"])}
              {this.getCustomRadioField(
                "Advance Health Directives",
                "advance_health_directives",
                ["Yes", "No"]
              )}
            </React.Fragment>
          )}

          {advance_health_directives === "No" ||
          will === "No" ||
          trust === "No" ? (
            <div className="info-form-block">
              <Row gutter={16}>
                <Col span={24}>
                  <h4 className="text-center  mb-4 ">
                    Reasons/Importance: AHD tell medical professionals your
                    personal wishes if you are incapacitated. It removes
                    guessing and delays based on your intentions and cannot be
                    overriden by others. Will may or may not be considered a
                    legal document in your state or jurisdiction. If done
                    properly, provides written intent for the creator. This
                    intent may or may not be recognized by courts and is often
                    not recognized by financial institutions. Trust is a legal
                    document that allows for specific instructions and intent
                    which is recognized by financial institutions. For assets to
                    be properly held, they must have the Trust as the owner. A
                    proper trust will avoid probate. Click HERE for DIY Click
                    HERE for introduction to Professional
                  </h4>
                </Col>
              </Row>
            </div>
          ) : null}
        </div>

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
        {/* <div className="row justify-content-between">
          <div className="col-8">
            <Button
              type="primary"
              size={"large"}
              onClick={() => this.props.previousForm()}
            >
              <Icon type="left" />
              Previous
            </Button>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button
              type="primary"
              size={"large"}
              onClick={() => {
                console.log("FORM DATA ", this.props.checklistObject);
                this.props.nextForm();
              }}
            >
              Next
              <Icon type="right" />
            </Button>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default ChecklistForm;
