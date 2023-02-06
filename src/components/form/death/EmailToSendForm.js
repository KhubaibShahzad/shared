import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, DatePicker, Form, Input } from "antd";
import world from "../../../assets/images/latest/world.png";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import WebAddress from "../../../components/form/WebAddress";
import UpdateModal from "../components/updatemodal";
const formName = "emailToSendForm";

const dateFormat = "MM/DD/YYYY";

class EmailToSendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_to_send: [
        {To:"Noman",CC:"asghar,hamad",TemplateNickname:"Name",Subject:"Subject"}
      ],
      texts:[
        {TextTo:"Noman",Phone:"+92",TextTemplateNickname:"Name",TextMessage:"Message Here"}

      ],
      formData: {},

      isEmailAddModalVisible: false,
      isTextAddModalVisible: false,
      isEmailUpdateModalVisible: false,
      isTextUpdateModalVisible: false,
      updateObject: null,
      selectedIndex:null
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.emailToSendForm &&
      this.props.checklistObject.emailToSendForm.hasOwnProperty("email_to_send")
    )
      this.setState({
        email_to_send: this.props.checklistObject.emailToSendForm.email_to_send,
      });

      this.props.handleChecklistObject(this.props.currentForm,this.state.email_to_send)
      this.props.handleChecklistObject(this.props.currentForm,this.state.texts)

  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }


  // to handle hide and show for email add modal
setEmailAddModalVisible = () => {
  if (this.state.isEmailAddModalVisible)
    this.setState({ isEmailAddModalVisible: false });
  else this.setState({ isEmailAddModalVisible: true });
};

// to handle hide and show for text add modal
setTextAddModalVisible = () => {
  if (this.state.isTextAddModalVisible)
    this.setState({ isTextAddModalVisible: false });
  else this.setState({ isTextAddModalVisible: true });
};

// to handle hide and show for email update modal
setEmailUpdateModalVisible = () => {
  if (this.state.isEmailUpdateModalVisible)
    this.setState({ isEmailUpdateModalVisible: false });
  else this.setState({ isEmailUpdateModalVisible: true });
};

// to handle hide and show for text update modal
setTextUpdateModalVisible = () => {
  if (this.state.isTextAddModalVisible)
    this.setState({ isTextAddModalVisible: false });
  else this.setState({ isTextAddModalVisible: true });
};

  // function to store updated values of all fields in updateObject
  onUpdateChange = (val, index) => {
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });
  };

  // capture date change of datepicker of update modal
  handleDateChange = (date, dateString, index) => {
    this.onUpdateChange(dateString, index);
  };



        // Function to delete selected row
        deleteSelectedRow = (idx, all_rows, name) => {
          const updatedRows = all_rows.filter((row, index) => {
            return index != idx - 1;
          });
      
          if (name == "email") {
            this.setState({
              email_to_send: updatedRows,
            },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.email_to_send)

            });
          } else {
            this.setState({
              texts: updatedRows,
            },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.texts)

            });
          }
        };
    
    
      // Function to get selected  array (row)
      getSelectedRow = (idx, rows, name) => {
        this.setState({
          selectedIndex: idx,
        });
    
        // get selected row (this will return array of object)
        let selectedRow = rows.filter((row, index) => {
          return index == idx - 1;
        });
        console.log("selected row",selectedRow);
    
        // get first and only element from list and store it in update object
        this.setState({
          updateObject: { ...this.state.updateObject, ...selectedRow[0] },
        });
      };
  
  
  //  function to update a specific email row
  updateEmailRow = () => {
    let obj = {
      ...this.state.updateObject,
    };
  
    let { email_to_send, selectedIndex } = this.state;
    let index = selectedIndex - 1;
  
    email_to_send = [...this.state.email_to_send]; // important to create a copy, otherwise you'll modify state outside of setState call
    email_to_send[index] = obj; // replace current updated object in email_to_send based on index
    this.setState({ email_to_send },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.email_to_send)

    });
  };
  
  
    //  function to update a specific Text row
    updateTextRow = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { texts, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      texts = [...this.state.texts]; // important to create a copy, otherwise you'll modify state outside of setState call
      texts[index] = obj; // replace current updated object in texts based on index
      this.setState({ texts },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.texts)

      });
    };
  
  
  // function to create email row (data)
  createEmailRow = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in email_to_send list with keeping old data
    this.setState({
      email_to_send: [...this.state.email_to_send, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.email_to_send)

    });
  };
  
  // function to create text row(data)
  createTextRow = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in texts list with keeping old data
    this.setState({
      texts: [...this.state.texts, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.texts)

    });
  };
  
  
  
    // store all modal data in formData state
    setFormData = (value) => {
      this.setState({
        formData: {
          ...this.state.formData,
          ...value,
        },
      });
    };
 



  getEmailRow = ({data, index }) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">To:</span>
              <span className="custom-field-value-style"> {data.To}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Template Nickname:
              </span>
              <span className="custom-field-value-style"> {data.TemplateNickname}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">CC:</span>
              <span className="custom-field-value-style"> {data.CC}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Subject:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.Subject}
              </span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments"></div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="edit"
              onClick={() => {
                const { email_to_send } = this.state;
                this.getSelectedRow(index, email_to_send);

                this.setEmailUpdateModalVisible();
              }}
            ></Button>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="delete"
              onClick={() => {
                const { email_to_send } = this.state;
                const name = "email";
                this.deleteSelectedRow(index, email_to_send, name);
              }}
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };

  getTextRow = ({ data,index }) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">To:</span>
              <span className="custom-field-value-style"> {data.TextTo}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Template Nickname:
              </span>
              <span className="custom-field-value-style"> {data.TextTemplateNickname}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Phone:</span>
              <span className="custom-field-value-style"> {data.Phone}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Text Body: </span>
              <span className="custom-field-value-style">
                {data.TextMessage}
              </span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments"></div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="edit"
              onClick={() => {
                const { texts } = this.state;
                this.getSelectedRow(index, texts);

                this.setTextUpdateModalVisible();
              }}
            ></Button>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="delete"
              onClick={() => {
                const { texts } = this.state;
                const name = "text";
                this.deleteSelectedRow(index, texts, name);
              }}
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const largeBills = [
      {
        title: "Start with Template",
        dataIndex: "start_with_template",
        key: "start_with_template",
        fields: [
          {
            type: "Radio",
            name: "start_with_template",
            values: ["Friend", "Family", "Professional", "None"],
          },
        ],
      },
      {
        title: "Relationship",
        dataIndex: "relationship",
        key: "relationship",
        fields: [
          {
            type: "Select",
            name: "relationship",
            placeholder: "-Select-",
            values: ["Family", "Friend", "Professional"],
          },
        ],
      },
      {
        title: "Email Template Nickname",
        dataIndex: "email_template",
        key: "email_template",
        fields: [
          {
            type: "Input",
            name: "email_template",
          },
        ],
      },
      {
        title: "To",
        dataIndex: "to",
        key: "to",
        fields: [
          {
            type: "Select",
            name: "to",
            placeholder: "-Select-",
            values: ["Family", "Friend", "Professional"],
          },
        ],
      },
      {
        title: "CC",
        dataIndex: "cc",
        key: "cc",
        fields: [
          {
            type: "Select",
            name: "cc",
            placeholder: "-Select-",
            values: ["Family", "Friend", "Professional"],
          },
        ],
      },
      {
        title: "Subject of Email",
        dataIndex: "subject_of_email",
        key: "subject_of_email",
        fields: [
          {
            type: "Input",
            name: "subject_of_email",
          },
        ],
      },
      {
        title: "Body of Email",
        dataIndex: "body_of_email",
        key: "body_of_email",
        fields: [
          {
            type: "TextArea",
            name: "body_of_email",
          },
        ],
      },
    ];

    const emailFields = [
      {
        title: "To",
        type: "input",
        index:"To"
      },
      {
        title: "CC",
        type: "input",
        index:"CC"
      },
      {
        title: "Subject",
        type: "input",
        index:"Subject"
      },
      {
        title: "Relationship",
        type: "select",
        options: ["Abc", "Def"],
        index:"Relationship"
      },
      {
        title: "Template Nickname",
        type: "input",
        index:"TemplateNickname"
      },
      {
        title: "Template",
        type: "richtext",
        index:"Template"
      },
    ];



    const UpdateEmailFields = [
      {
        title: "To",
        type: "input",
        index:"To"
      },
      {
        title: "CC",
        type: "input",
        index:"CC"
      },
      {
        title: "Subject",
        type: "input",
        index:"Subject"
      },
      {
        title: "Relationship",
        type: "select",
        options: ["Abc", "Def"],
        index:"Relationship"
      },
      {
        title: "Template Nickname",
        type: "input",
        index:"TemplateNickname"
      },
      {
        title: "Template",
        type: "richtext",
        index:"Template"
      },
    ];


    const textFields = [
      {
        title: "To",
        type: "input",
        index:"TextTo"
      },
      {
        title: "Phone",
        type: "input",
        index:"Phone"
      },
      {
        title: "Relationship",
        type: "select",
        options: ["Abc", "Def"],
        index:"TextRelationship"
      },
      {
        title: "Template Nickname",
        type: "input",
        index:"TextTemplateNickname"
      },
      {
        title: "Text Message",
        type: "textarea",
        index:"TextMessage"
      },
    ];

    const UpdateTextFields = [
      {
        title: "TextTo",
        type: "input",
        index:"TextTo"
      },
      {
        title: "Phone",
        type: "input",
        index:"Phone"
      },
      {
        title: "Relationship",
        type: "select",
        options: ["Abc", "Def"],
        index:"TextRelationship"
      },
      {
        title: "Template Nickname",
        type: "input",
        index:"TextTemplateNickname"
      },
      {
        title: "Text Message",
        type: "textarea",
        index:"TextMessage"
      },
    ];


    const rows = [
      {
        title: "No. Of Emails Sent",
        dataIndex: "emails_sent",
        key: "emails_sent",
        fields: [
          {
            type: "Input",
            name: "emails_sent",
          },
        ],
      },
      {
        title: "No. Of Emails Rejected",
        dataIndex: "emails_rejected",
        key: "emails_rejected",
        fields: [
          {
            type: "Input",
            name: "emails_rejected",
          },
        ],
      },
      {
        title: "Email Of Rejected",
        dataIndex: "email_of_rejected",
        key: "email_of_rejected",
        fields: [
          {
            type: "Input",
            name: "email_of_rejected",
          },
        ],
      },
      {
        title: "Emails Opened",
        dataIndex: "emails_opened",
        key: "emails_opened",
        fields: [
          {
            type: "Input",
            name: "emails_opened",
          },
        ],
      },
    ];

    // const { handleFormInputChange, role } = this.props;

    const { currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      handlePhoneChange,
      handleRichTextChange,
      role
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Create New Email"}
          fields={emailFields}
          isVisible={this.state.isEmailAddModalVisible}
          cbClose={this.setEmailAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          handleRichTextChange={handleRichTextChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createEmailRow}
        />

        <AddModal
          title={"Create New Text"}
          fields={textFields}
          isVisible={this.state.isTextAddModalVisible}
          cbClose={this.setTextAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createTextRow}
        />




        <UpdateModal
          title={"Update Email"}
          fields={UpdateEmailFields}
          isVisible={this.state.isEmailUpdateModalVisible}
          cbClose={this.setEmailUpdateModalVisible}
          cbUpdate={this.updateEmailRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />


          <UpdateModal
          title={"Update Text"}
          fields={UpdateTextFields}
          isVisible={this.state.isTextUpdateModalVisible}
          cbClose={this.setTextUpdateModalVisible}
          cbUpdate={this.updateTextRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={world} title={"Emails & Texts"} />

        {role === "ROLE" ? (
          <React.Fragment>
            <Row>
              <Col span={24}>
                <h3
                  className="text-center font-weight-bold"
                  style={{ marginTop: "30px", marginBottom: "30px" }}
                >
                  Please add this information before sending Emails and Text
                  Messages
                </h3>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Funeral Date">
                  <DatePicker
                    style={{ width: "100%" }}
                    format={dateFormat}
                    size={"large"}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Funeral Location">
                  <Input size={"large"} name="clientEstimatedDeathAge" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Time of Arrival">
                  <Input size={"large"} name="clientEstimatedDeathAge" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Gifts / Flowers">
                  <Input size={"large"} name="clientEstimatedDeathAge" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Charity URL">
                  <WebAddress name="clientSecondaryEmailAddress"></WebAddress>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Passed Away From">
                  <Input size={"large"} name="clientEstimatedDeathAge" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Passed Away On">
                  <DatePicker
                    style={{ width: "100%" }}
                    format={dateFormat}
                    size={"large"}
                  />
                </Form.Item>
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          ""
        )}

        <Add
          title={"Emails"}
          button={"Add New Email"}
          cbAdd={this.setEmailAddModalVisible}
        />

        {/* get email row */}
        {this.state.email_to_send.map((data, index) =>
          this.getEmailRow({ data, index: index + 1 })
        )}

        <Add
          title={"Texts"}
          button={"Add New Text"}
          cbAdd={this.setTextAddModalVisible}
        />

        {/* get text row */}
        {this.state.texts.map((data, index) =>
          this.getTextRow({ data, index: index + 1 })
        )}

        <div style={{ marginTop: "50px" }}>
          <SubFormTable
            title="Email Stats"
            rows={this.state.email_to_send}
            colsFormat={rows}
            addNewButton={false}
          ></SubFormTable>
        </div>

        {role === "ROLE" ? (
          <Footer cbNext={this.props.nextForm} />
        ) : (
          <Footer
            cbPrev={this.props.previousForm}
            cbNext={this.props.nextForm}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EmailToSendForm;
