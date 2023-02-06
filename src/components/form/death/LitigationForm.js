import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import law from "../../../assets/images/latest/law.png";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
const formName = "litigationForm";

class LitigationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      litigation_list: [
        {LitigationNickname:"Name",Notes:"Notes",Upload:"file.jpeg"}
      ],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.litigationForm &&
      this.props.checklistObject.litigationForm.hasOwnProperty(
        "litigation_list"
      )
    )
      this.setState({
        litigation_list:
          this.props.checklistObject.litigationForm.litigation_list,
      });
    this.props.handleChecklistObject(this.props.currentForm,this.state.litigation_list)

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
const {litigation_list} = this.state

    const updatedRows = litigation_list.filter((row, index) => {
      return index != idx - 1;
    });

   
      this.setState({
        litigation_list: updatedRows,
      },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.litigation_list)

      });

  };


// Function to get selected  array (row)
getSelectedRow = (idx,) => {
  this.setState({
    selectedIndex: idx,
  });

const {litigation_list} = this.state


  // get selected row (this will return array of object)
  let selectedRow = litigation_list.filter((row, index) => {
    return index == idx - 1;
  });

  // get first and only element from list and store it in update object
  this.setState({
    updateObject: { ...this.state.updateObject, ...selectedRow[0] },
  });
};


  //  function to update a litigation row
  updateLitigation = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { litigation_list, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    litigation_list = [...this.state.litigation_list]; // important to create a copy, otherwise you'll modify state outside of setState call
    litigation_list[index] = obj; // replace current updated object in litigation_list based on index
    this.setState({ litigation_list },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.litigation_list)

    });
  };


    // function to create  litigation (data)
createLitigation = (currentFormData) => {

  // checxk if already formData contains some data then initialize it with empty
  if (Object.keys(this.state.formData).length > 0) {
    this.setState({
      formData: {},
    });
  }

  // add current form data in litigation_list list with keeping old data
  this.setState({
    litigation_list: [...this.state.litigation_list, currentFormData.formData],
  },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.litigation_list)

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
              <span className="custom-field-heading-style">Nick Name:</span>
              <span className="custom-field-value-style"> {data.LitigationNickname}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Potential Liability:
              </span>
              <span className="custom-field-value-style"> {data.PotentialLiability}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes:</span>
              <span className="custom-field-value-style">
                {data.Notes}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Potential Win/Loss:</span>
              <span className="custom-field-value-style"> {data.PotentialWinLoss}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">File:</span>
              <span className="custom-field-value-style"> {data.Upload}</span>
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
        title: "Litigation Nickname",
        type: "input",
        index:"LitigationNickname"
      },
      {
        title: "Potential Liability",
        type: "currency",
        index:"PotentialLiability"
      },
      {
        title: "Potential Win/Loss",
        type: "radio",
        index:"PotentialWinLoss"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
      {
        title: "Upload",
        type: "document",
        index:"Upload"
      },
    ];


    const update_fields = [
      {
        title: "Litigation Nickname",
        type: "input",
        index:"LitigationNickname"
      },
      {
        title: "Potential Liability",
        type: "currency",
        index:"PotentialLiability"
      },
      {
        title: "Potential Win/Loss",
        type: "radio",
        index:"PotentialWinLoss"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
      {
        title: "Upload",
        type: "document",
        index:"Upload"
      },
    ];

    const litigation = [
      {
        title: "Pending Litigation Nickname",
        dataIndex: "pending_litigation_name",
        key: "pending_litigation_name",
        fields: [
          {
            type: "Input",
            name: "pending_litigation_name",
          },
        ],
      },
      {
        title: "Potential $ Liability",
        dataIndex: "potential_liability",
        key: "potential_liability",
        fields: [
          {
            type: "Currency",
            name: "potential_liability",
          },
        ],
      },
      {
        title: "Potential Win/Loss",
        dataIndex: "potential_win_loss",
        key: "potential_win_loss",
        fields: [
          {
            type: "Radio",
            name: "potential_win_loss",
            values: ["Win", "Loss"],
          },
        ],
      },
      {
        title: "Litigation Notes",
        dataIndex: "litigation_notes",
        key: "litigation_notes",
        fields: [
          {
            type: "TextArea",
            name: "litigation_notes",
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
      handleRadioChange,
      role
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Litigation"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handleRadioChange={handleRadioChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createLitigation}
        />

        <UpdateModal
          title={"Update Litigation"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateLitigation}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={law} title={"Litigation"} />
        <Add
          title={"Litigation"}
          button={"Add New Litigation"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
        />

        {/* get litigation row */}
        {this.state.litigation_list.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default LitigationForm;
