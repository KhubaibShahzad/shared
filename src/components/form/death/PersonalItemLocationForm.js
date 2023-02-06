import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import target from "../../../assets/images/latest/target.png";
import CustomSubFormTable from "../../custom/CustomSubFormTable";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import swal from 'sweetalert';


const formName = "personalItemLocationForm";

class PersonalItemLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal_items: [
        {PersonalItem:"Personal Item",Location:"Location here",PersonalWishes:"Personal Wishes",Notes:"Notes"}
      ],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.personalItemLocationForm &&
      this.props.checklistObject.personalItemLocationForm.hasOwnProperty(
        "personal_items"
      )
    )
      this.setState({
        personal_items:
          this.props.checklistObject.personalItemLocationForm.personal_items,
      });
    this.props.handleChecklistObject(this.props.currentForm,this.state.personal_items)

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
const {personal_items} = this.state

    const updatedRows = personal_items.filter((row, index) => {
      return index != idx - 1;
    });

   
      this.setState({
        personal_items: updatedRows,
      },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.personal_items)

      });

  };


// Function to get selected  array (row)
getSelectedRow = (idx,) => {
  this.setState({
    selectedIndex: idx,
  });

const {personal_items} = this.state


  // get selected row (this will return array of object)
  let selectedRow = personal_items.filter((row, index) => {
    return index == idx - 1;
  });

  // get first and only element from list and store it in update object
  this.setState({
    updateObject: { ...this.state.updateObject, ...selectedRow[0] },
  });
};


  //  function to update a perosnal item row
  updatePersonalItem = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { personal_items, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    personal_items = [...this.state.personal_items]; // important to create a copy, otherwise you'll modify state outside of setState call
    personal_items[index] = obj; // replace current updated object in personal_items based on index
    this.setState({ personal_items },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.personal_items)

    });
  };


    // function to create  personal item (data)
createPersonalItem = (currentFormData) => {

  // checxk if already formData contains some data then initialize it with empty
  if (Object.keys(this.state.formData).length > 0) {
    this.setState({
      formData: {},
    });
  }

  // add current form data in personal_items list with keeping old data
  this.setState({
    personal_items: [...this.state.personal_items, currentFormData.formData],
  },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.personal_items)

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
              <span className="custom-field-heading-style">Personal Item:</span>
              <span className="custom-field-value-style"> {data.PersonalItem}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Personal Wishes:
              </span>
              <span className="custom-field-value-style"> {data.PersonalWishes}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes</span>
              <span className="custom-field-value-style">
                {data.Notes}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Location:</span>
              <span className="custom-field-value-style">
                {data.Location}
              </span>
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
        title: "Personal Item",
        type: "select",
        options: ["Abc", "Def"],
        index:"PersonalItem"
      },
      {
        title: "Location",
        type: "input",
        index:"Location"
      },
      {
        title: "Personal Wishes",
        type: "textarea",
        index:"PersonalWishes"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const update_fields = [
      {
        title: "Personal Item",
        type: "select",
        options: ["Abc", "Def"],
        index:"PersonalItem"
      },
      {
        title: "Location",
        type: "input",
        index:"Location"
      },
      {
        title: "Personal Wishes",
        type: "textarea",
        index:"PersonalWishes"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];

    const personal_items = [
      {
        title: "Personal Item",
        dataIndex: "personal_item",
        key: "personal_item",
        fields: [
          {
            type: "Select",
            name: "personal_item",
            placeholder: "-Select-",
            values: ["Asset 1", "Asset 2"],
          },
        ],
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        fields: [
          {
            type: "TextArea",
            name: "location",
          },
        ],
      },
      {
        title: "Personal Wishes",
        dataIndex: "personal_wishes",
        key: "personal_wishes",
        fields: [
          {
            type: "TextArea",
            name: "personal_wishes",
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
      role
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Personal Item"}
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
          create={this.createPersonalItem}
        />

        <UpdateModal
          title={"Update Bill"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updatePersonalItem}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={target} title={"Personal Items Location"} />
        <Add
          title={"Personal Items"}
          button={"Add New Item Location"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
        />

        {/* get personal item row */}
        {this.state.personal_items.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}


<div className="row justify-content-between">
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
                // console.log("FORM DATA ", this.props.divorceObject);
                swal("Success!", "You data has been saved!", "success").then(()=>
                this.props.navigate("/death")

                )
              }}
            >
              Finish
              <Icon type="right" />
            </Button>
          </div>
        </div>

        {/* <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} /> */}
      </React.Fragment>
    );
  }
}

export default PersonalItemLocationForm;
