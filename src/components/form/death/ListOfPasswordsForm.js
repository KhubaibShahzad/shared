import React, { Component } from "react";
import password2 from "../../../assets/images/latest/password2.png";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import "../../custom/CustomSubFormTable.css";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
const formName = "listOfPasswordsForm";

class ListOfPasswordsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_of_passwords: [
        {SiteAppProgram:"site",UserName:"User Name"}
      ],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
    this.fileRef = React.createRef();
  }

  componentDidMount() {
    if (
      this.props.checklistObject.listOfPasswordsForm &&
      this.props.checklistObject.listOfPasswordsForm.hasOwnProperty(
        "list_of_passwords"
      )
    )
      this.setState({
        list_of_passwords:
          this.props.checklistObject.listOfPasswordsForm.list_of_passwords,
      });

    this.props.handleChecklistObject(this.props.currentForm,this.state.list_of_passwords)

  }


  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }



   // to handle hide and show for  add modal
setAddModalVisible = () => {
  if (this.state.isAddModalVisible)
    this.setState({ isAddModalVisible: false });
  else this.setState({ isAddModalVisible: true });
};

// to handle hide and show for update modal
setUpdateModalVisible = () => {
  if (this.state.isUpdateModalVisible)
    this.setState({ isUpdateModalVisible: false });
  else this.setState({ isUpdateModalVisible: true });
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
deleteSelectedRow = (idx) => {
const {list_of_passwords} = this.state

    const updatedRows = list_of_passwords.filter((row, index) => {
      return index != idx - 1;
    });

   
      this.setState({
        list_of_passwords: updatedRows,
      },()=>{
        this.props.handleChecklistObject(this.props.currentForm,this.state.list_of_passwords)

      });

  };


// Function to get selected  array (row)
getSelectedRow = (idx,) => {
  this.setState({
    selectedIndex: idx,
  });

const {list_of_passwords} = this.state


  // get selected row (this will return array of object)
  let selectedRow = list_of_passwords.filter((row, index) => {
    return index == idx - 1;
  });

  // get first and only element from list and store it in update object
  this.setState({
    updateObject: { ...this.state.updateObject, ...selectedRow[0] },
  });
};


  //  function to update a list of passwords row
  updatePasswords = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { list_of_passwords, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    list_of_passwords = [...this.state.list_of_passwords]; // important to create a copy, otherwise you'll modify state outside of setState call
    list_of_passwords[index] = obj; // replace current updated object in list_of_passwords based on index
    this.setState({ list_of_passwords },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.list_of_passwords)
      
    });
  };


    // function to create  list of passwords (data)
createPasswords = (currentFormData) => {

  // checxk if already formData contains some data then initialize it with empty
  if (Object.keys(this.state.formData).length > 0) {
    this.setState({
      formData: {},
    });
  }

  // add current form data in list_of_passwords list with keeping old data
  this.setState({
    list_of_passwords: [...this.state.list_of_passwords, currentFormData.formData],
  },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.list_of_passwords)

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




  
  getRow = ({data, index }) => {
    const { role } = this.props;
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
              <span className="custom-field-heading-style">Site/App:</span>
              <span className="custom-field-value-style"> {data.SiteAppProgram}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Who's Password:
              </span>
              <span className="custom-field-value-style"> {data.WhosPassword}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Website URL:</span>
              <span className="custom-field-value-style"> {data.WebsiteURL}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Security Question: What is your pet maiden name ?
              </span>
              <span className="custom-field-value-style"> {data.SecurityQuestion}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Username:</span>
              <span className="custom-field-value-style"> {data.UserName}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Password Hint:{" "}
              </span>
              <span className="custom-field-value-style"> {data.PasswordHint}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> 2FA: </span>
              <span className="custom-field-value-style"> {data.TwoFA}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Pin: </span>
              <span className="custom-field-value-style"> {data.Pin}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Notes: </span>
              <span className="custom-field-value-style"> {data.Notes}</span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          {role !== "ROLE" ? (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="edit"
                onClick={() => {

                  this.getSelectedRow(index);
  
                  this.setUpdateModalVisible();
                }}
              ></Button>
            </div>
          ) : (
            ""
          )}
        </Col>
        <Col span={1}>
          {role !== "ROLE" ? (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="delete"
                onClick={() => {
                  this.deleteSelectedRow(index);
                }}
              ></Button>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    );
  };

  openFileRef = () => {
    this.fileRef.current.click();
  };

  render() {
    const fields = [
      {
        title: "Site / App / Program",
        type: "input",
        index:"SiteAppProgram"
      },
      {
        title: "User Name",
        type: "input",
        index:"UserName"
      },
      {
        title: "Who's Password",
        type: "input",
        index:"WhosPassword"
      },
      {
        title: "Password Hint",
        type: "input",
        index:"PasswordHint"
      },
      {
        title: "Website URL",
        type: "web",
        index:"WebsiteURL"
      },
      {
        title: "2FA",
        type: "input",
        index:"TwoFA"
      },
      {
        title: "Pin",
        type: "input",
        index:"Pin"
      },
      {
        title: "Security Question",
        type: "select",
        options: ["Abc", "Def"],
        index:"SecurityQuestion"
      },
      {
        title: "Answer",
        type: "input",
        index:"Answer"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const update_fields = [
      {
        title: "Site / App / Program",
        type: "input",
        index:"SiteAppProgram"
      },
      {
        title: "User Name",
        type: "input",
        index:"UserName"
      },
      {
        title: "Who's Password",
        type: "input",
        index:"WhosPassword"
      },
      {
        title: "Password Hint",
        type: "input",
        index:"PasswordHint"
      },
      {
        title: "Website URL",
        type: "web",
        index:"WebsiteURL"
      },
      {
        title: "2FA",
        type: "input",
        index:"TwoFA"
      },
      {
        title: "Pin",
        type: "input",
        index:"Pin"
      },
      {
        title: "Security Question",
        type: "select",
        options: ["Abc", "Def"],
        index:"SecurityQuestion"
      },
      {
        title: "Answer",
        type: "input",
        index:"Answer"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];
    const largeBills = [
      {
        title: "Site/App/Program",
        dataIndex: "site",
        key: "site",
        fields: [
          {
            type: "Input",
            name: "site",
          },
        ],
      },
      {
        title: "Who's Password",
        dataIndex: "whos_password",
        key: "whos_password",
        fields: [
          {
            type: "Select",
            name: "whos_password",
            placeholder: "-Select-",
            values: ["Digital", "Physical"],
          },
        ],
      },
      {
        title: "Website URL",
        dataIndex: "website_url",
        key: "website_url",
        fields: [
          {
            type: "WebAddress",
            name: "website_url",
          },
        ],
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        fields: [
          {
            type: "Input",
            name: "username",
          },
        ],
      },
      {
        title: "Password Hint",
        dataIndex: "password_hint",
        key: "password_hint",
        fields: [
          {
            type: "Input",
            name: "password_hint",
          },
        ],
      },
      {
        title: "2FA",
        dataIndex: "fa",
        key: "fa",
        fields: [
          {
            type: "Select",
            name: "fa",
            placeholder: "-Select-",
            values: [
              "SMS",
              "Phone",
              "Email",
              "Authenticator App",
              "Physical Token",
            ],
          },
        ],
      },
      {
        title: "Security Question Answers",
        dataIndex: "security_question",
        key: "security_question",
        fields: [
          {
            type: "Input",
            name: "security_question",
          },
        ],
      },
      {
        title: "Pin",
        dataIndex: "pin",
        key: "pin",
        fields: [
          {
            type: "Input",
            name: "pin",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "TextArea",
            name: "notes",
          },
        ],
      },
    ];

    // const { handleFormInputChange, role } = this.props;
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      handleWebChange,
      role
    } = this.props;

    return (
      <React.Fragment>
        <input
          type="file"
          id="file"
          ref={this.fileRef}
          style={{ display: "none" }}
        />

        <AddModal
          title={"Add New Password"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handleWebChange={handleWebChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createPasswords}
        />

          <UpdateModal
          title={"Update Password"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updatePasswords}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={password2} title={"List of Passwords"} />
        <Add
          title={"Passwords"}
          button={"Add Passwords"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
          list={[
            {
              option: "Upload Password Sheet",
              cb: this.openFileRef,
            },
            {
              option: "Download Password Sheet",
            },
          ]}
        />

       {/* get list of passwords row */}
       {this.state.list_of_passwords.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default ListOfPasswordsForm;
