import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import User_Defined from "../../../assets/images/latest/User-Defined.png";
import UpdateModal from "../components/updatemodal";
const formName = "personalInstructionsForm";

class PersonalInstructionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal_instructions: [
        {PersonalInstructions:"Here",UploadFileHere:"abc.jpeg"}
      ],
      formData: {},

      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
  }

  componentDidMount() {

    console.log("checklistObject",this.props.checklistObject);

    if (
      this.props.checklistObject.personalInstructionsForm &&
      this.props.checklistObject.personalInstructionsForm.hasOwnProperty(
        "personal_instructions"
      )
    )
      this.setState({
        personal_instructions:
          this.props.checklistObject.personalInstructionsForm
            .personal_instructions,
      });

    this.props.handleChecklistObject(this.props.currentForm,this.state.personal_instructions)

  }

  

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

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
  const {personal_instructions} = this.state

      const updatedRows = personal_instructions.filter((row, index) => {
        return index != idx - 1;
      });
  
     
        this.setState({
          personal_instructions: updatedRows,
        },()=>{
          this.props.handleChecklistObject(this.props.currentForm,this.state.personal_instructions)

        });


 
    };


  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });

  const {personal_instructions} = this.state


    // get selected row (this will return array of object)
    let selectedRow = personal_instructions.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


    //  function to update a personal instructions row
    updatePersonalInstructions = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { personal_instructions, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      personal_instructions = [...this.state.personal_instructions]; // important to create a copy, otherwise you'll modify state outside of setState call
      personal_instructions[index] = obj; // replace current updated object in personal_instructions based on index
      this.setState({ personal_instructions },()=>{
        this.props.handleChecklistObject(this.props.currentForm,this.state.personal_instructions)

      });



    };


      // function to create personal instructions (data)
  createPersonalInstructions = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in personal_instructions list with keeping old data
    this.setState({
      personal_instructions: [...this.state.personal_instructions, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.personal_instructions)

    });

    // console.log("in personal instruction sis mount",this.state.personal_instructions);

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


    

  getRow = ({ data,index }) => {
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
              <span className="custom-field-heading-style">Instructions: </span>
              <span className="custom-field-value-style">
                
                {data.PersonalInstructions}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">File:</span>
              <span className="custom-field-value-style"> {data.UploadFileHere}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments"></div>
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

  render() {
    const fields = [
      {
        title: "Personal Instructions",
        type: "textarea",
        index:"PersonalInstructions"
      },
      {
        title: "Upload File Here",
        type: "document",
        index:"UploadFileHere"
      },
    ];


    const update_fields = [
      {
        title: "Personal Instructions",
        type: "textarea",
        index:"PersonalInstructions"
      },
      {
        title: "Upload File Here",
        type: "document",
        index:"UploadFileHere"
      },
    ];
    const largeBills = [
      {
        title: "Personal Instructions",
        dataIndex: "personal_instructions",
        key: "personal_instructions",
        fields: [
          {
            type: "TextArea",
            name: "personal_instructions",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload",
        key: "file_upload",
        fields: [
          {
            type: "Document",
            name: "file_upload",
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
      handleChecklistObject,
      role
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Personal Instruction"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createPersonalInstructions}
        />


        <UpdateModal
          title={"Update Personal Instructions"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updatePersonalInstructions}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={User_Defined} title={"Personal Instructions"} />
        <Add
          title={"Personal Instructions"}
          button={"Add New Instructions"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
        />

        {/* get PERSONAL INSTRUCTIONS row */}
        {this.state.personal_instructions.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default PersonalInstructionsForm;
