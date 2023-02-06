import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Modal, Form, Input } from "antd";
import Casket from "../../../assets/images/latest/Casket.png";
import "../../custom/CustomSubFormTable.css";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
const formName = "prepaidBurialExpenseForm";

class PrepaidBurialExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prepaid_burial: [
        {NameOfBill:"bill",Location:"LHR",Director:"Director"}
      ],
      formData: {},
      isVisible: false,
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.prepaidBurialExpenseForm &&
      this.props.checklistObject.prepaidBurialExpenseForm.hasOwnProperty(
        "prepaid_burial"
      )
    )
      this.setState({
        prepaid_burial:
          this.props.checklistObject.prepaidBurialExpenseForm.prepaid_burial,
      });

    this.props.handleChecklistObject(this.props.currentForm,this.state.prepaid_burial)

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
  const {prepaid_burial} = this.state

      const updatedRows = prepaid_burial.filter((row, index) => {
        return index != idx - 1;
      });
  
     
        this.setState({
          prepaid_burial: updatedRows,
        },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.prepaid_burial)

        });
 
    };


  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });

  const {prepaid_burial} = this.state


    // get selected row (this will return array of object)
    let selectedRow = prepaid_burial.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


    //  function to update a specific Prepaid Burial Expense row
    updateBurialExpense = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { prepaid_burial, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      prepaid_burial = [...this.state.prepaid_burial]; // important to create a copy, otherwise you'll modify state outside of setState call
      prepaid_burial[index] = obj; // replace current updated object in prepaid_burial based on index
      this.setState({ prepaid_burial },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.prepaid_burial)

      });
    };


      // function to create prepaid burial expense row (data)
  createBurialExpense = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in prepaid_burial list with keeping old data
    this.setState({
      prepaid_burial: [...this.state.prepaid_burial, currentFormData.formData],
    },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.prepaid_burial)

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
              <span className="custom-field-heading-style">Name of Place:</span>
              <span className="custom-field-value-style"> {data.NameOfPlace}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Location/Plot:</span>
              <span className="custom-field-value-style"> {data.Location}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Date Paid:</span>
              <span className="custom-field-value-style"> {data.DatePaid}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Items Paid for:
              </span>
              <span className="custom-field-value-style"> {data.ItemsPaidFor}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Amount Paid: </span>
              <span className="custom-field-value-style"> {data.AmountPaid}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Phone: </span>
              <span className="custom-field-value-style"> {data.PhoneNumber}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Address: </span>
              <span className="custom-field-value-style"> {data.Address}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Director: </span>
              <span className="custom-field-value-style"> {data.Director}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Notes: </span>
              <span className="custom-field-value-style">
               {data.Notes}
              </span>
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

  render() {
    const { role } = this.props;

    const fields = [
      {
        title: "Name Of Place",
        type: "input",
        index:"NameOfPlace"
      },
      {
        title: "Location",
        type: "input",
        index:"Location"
      },
      {
        title: "Address",
        type: "input",
        index:"Address"
      },
      {
        title: "Items Paid For",
        type: "select",
        options: ["Abc", "Def"],
        index:"ItemsPaidFor"
      },
      {
        title: "Director",
        type: "input",
        index:"Director"
      },
      {
        title: "Phone Number",
        type: "phone",
        index:"PhoneNumber"
      },
      {
        title: "Amount Paid",
        type: "currency",
        index:"AmountPaid"
      },
      {
        title: "Date Paid",
        type: "date",
        index:"DatePaid"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const update_fields = [
      {
        title: "Name Of Place",
        type: "input",
        index:"NameOfPlace"
      },
      {
        title: "Location",
        type: "input",
        index:"Location"
      },
      {
        title: "Address",
        type: "input",
        index:"Address"
      },
      {
        title: "Items Paid For",
        type: "select",
        options: ["Abc", "Def"],
        index:"ItemsPaidFor"
      },
      {
        title: "Director",
        type: "input",
        index:"Director"
      },
      {
        title: "Phone Number",
        type: "phone",
        index:"PhoneNumber"
      },
      {
        title: "Amount Paid",
        type: "currency",
        index:"AmountPaid"
      },
      {
        title: "Date Paid",
        type: "date",
        index:"DatePaid"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];

    const largeBills = [
      {
        title: "Name of Place",
        dataIndex: "name_of_place",
        key: "name_of_place",
        fields: [
          {
            type: "Input",
            name: "name_of_place",
          },
        ],
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        fields: [
          {
            type: "Input",
            name: "street",
            placeholder: "street",
          },
          // {
          //   type: "Input",
          //   name: "city",
          //   placeholder: "city",
          // },
          // {
          //   type: "Input",
          //   name: "state",
          //   placeholder: "state",
          // },
        ],
      },
      {
        title: "Location/Plot",
        dataIndex: "location_plot",
        key: "location_plot",
        fields: [
          {
            type: "Input",
            name: "location_plot",
          },
        ],
      },
      {
        title: "Items Paid For",
        dataIndex: "item_paid_for",
        key: "item_paid_for",
        fields: [
          {
            type: "Select",
            name: "item_paid_for",
            placeholder: "-Select-",
            values: ["Headstone", "Casket", "Urn", "Flowers", "Other"],
          },
        ],
      },
      {
        title: "Director",
        dataIndex: "director",
        key: "director",
        fields: [
          {
            type: "Input",
            name: "director",
          },
        ],
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
        fields: [
          {
            type: "PhoneNumber",
            name: "phone_number",
          },
        ],
      },
      {
        title: "When Paid",
        dataIndex: "paid_date",
        key: "paid_date",
        fields: [
          {
            type: "DatePicker",
            name: "paid_date",
          },
        ],
      },
      {
        title: "How Much Paid",
        dataIndex: "how_much_paid",
        key: "how_much_paid",
        fields: [
          {
            type: "Currency",
            name: "how_much_paid",
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


    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handlePhoneChange,
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Expense"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createBurialExpense}
        />


        <UpdateModal
          title={"Update Expense"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateBurialExpense}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={Casket} title={"Prepaid Burial Expense"} />
        <Add
          title={"Prepaid Burial Expense"}
          button={"Add New Expense"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
        />

      {this.state.prepaid_burial.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default PrepaidBurialExpenseForm;
