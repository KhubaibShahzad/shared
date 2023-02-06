import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import income_tax from "../../../assets/images/latest/Income-tax-3.png";
import { withRouter } from "react-router-dom";
import UpdateModal from "../components/updatemodal";

const formName = "billsToPayForm";

class BillsToPayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills_to_pay: [
        {Amount:"$400",PayeeName:"name",Notes:"this is note"}
      ],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.billsToPayForm &&
      this.props.checklistObject.billsToPayForm.hasOwnProperty("bills_to_pay")
    )
      this.setState({
        bills_to_pay: this.props.checklistObject.billsToPayForm.bills_to_pay,
      });
    this.props.handleChecklistObject(this.props.currentForm,this.state.bills_to_pay)

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
const {bills_to_pay} = this.state

    const updatedRows = bills_to_pay.filter((row, index) => {
      return index != idx - 1;
    });

   
      this.setState({
        bills_to_pay: updatedRows,
      },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.bills_to_pay)

      });

  };


// Function to get selected  array (row)
getSelectedRow = (idx,) => {
  this.setState({
    selectedIndex: idx,
  });

const {bills_to_pay} = this.state


  // get selected row (this will return array of object)
  let selectedRow = bills_to_pay.filter((row, index) => {
    return index == idx - 1;
  });

  // get first and only element from list and store it in update object
  this.setState({
    updateObject: { ...this.state.updateObject, ...selectedRow[0] },
  });
};


  //  function to update a bills to pay (upcomming bills) row
  updateBills = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { bills_to_pay, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    bills_to_pay = [...this.state.bills_to_pay]; // important to create a copy, otherwise you'll modify state outside of setState call
    bills_to_pay[index] = obj; // replace current updated object in bills_to_pay based on index
    this.setState({ bills_to_pay },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.bills_to_pay)

    });
  };


    // function to create  bills to pay (upcomming bills) (data)
createBills = (currentFormData) => {

  // checxk if already formData contains some data then initialize it with empty
  if (Object.keys(this.state.formData).length > 0) {
    this.setState({
      formData: {},
    });
  }

  // add current form data in bills_to_pay list with keeping old data
  this.setState({
    bills_to_pay: [...this.state.bills_to_pay, currentFormData.formData],
  },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.bills_to_pay)

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
              <span className="custom-field-heading-style">Due Date:</span>
              <span className="custom-field-value-style"> {data.DueDate}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Payee Name:</span>
              <span className="custom-field-value-style"> {data.PayeeName}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Frequency:</span>
              <span className="custom-field-value-style"> {data.Frequency}</span>
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
              <span className="custom-field-heading-style">Amount:</span>
              <span className="custom-field-value-style"> {data.Amount}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Category: </span>
              <span className="custom-field-value-style"> {data.Category}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Source: </span>
              <span className="custom-field-value-style"> {data.Source}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Whose Bill: </span>
              <span className="custom-field-value-style"> {data.WhoseBill}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Receipt: </span>
              <span className="custom-field-value-style"> {data.Receipt}</span>
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
        title: "Amount",
        type: "input",
        index:"Amount"
      },
      {
        title: "Payee Name",
        type: "input",
        index:"PayeeName"
      },
      {
        title: "Category",
        type: "select",
        options: ["Abc", "Def"],
        index:"Category"
      },
      {
        title: "Frequency",
        type: "select",
        options: ["Abc", "Def"],
        index:"Frequency"
      },
      {
        title: "Source",
        type: "select",
        options: ["Abc", "Def"],
        index:"Source"
      },
      {
        title: "Whose Bill",
        type: "select",
        options: ["Abc", "Def"],
        index:"WhoseBill"

      },
      {
        title: "Due Date",
        type: "date",
        index:"DueDate"
      },
      {
        title: "Receipt",
        type: "document",
        index:"Receipt"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const update_fields = [
      {
        title: "Amount",
        type: "input",
        index:"Amount"
      },
      {
        title: "Payee Name",
        type: "input",
        index:"PayeeName"
      },
      {
        title: "Category",
        type: "select",
        options: ["Abc", "Def"],
        index:"Category"
      },
      {
        title: "Frequency",
        type: "select",
        options: ["Abc", "Def"],
        index:"Frequency"
      },
      {
        title: "Source",
        type: "select",
        options: ["Abc", "Def"],
        index:"Source"
      },
      {
        title: "Whose Bill",
        type: "select",
        options: ["Abc", "Def"],
        index:"WhoseBill"

      },
      {
        title: "Due Date",
        type: "date",
        index:"DueDate"
      },
      {
        title: "Receipt",
        type: "document",
        index:"Receipt"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];

    const bills_to_pay = [
      {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        fields: [
          {
            type: "DatePicker",
            name: "due_date",
          },
        ],
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        fields: [
          {
            type: "Currency",
            name: "amount",
          },
        ],
      },
      {
        title: "Payee",
        dataIndex: "payee",
        key: "payee",
        fields: [
          {
            type: "Input",
            name: "payee",
          },
        ],
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        fields: [
          {
            type: "Select",
            name: "category",
            placeholder: "-Select-",
            values: [
              "Charity",
              "Child and Family Care",
              "Debt Payments",
              "Entertainment",
              "Professional Services",
              "Home",
              "Insurance",
              "Personal Care",
              "Pets",
              "Shopping",
              "Transportation",
              "Utilities",
              "Finance",
              "Business",
              "Saving for Goal",
            ],
          },
        ],
      },
      {
        title: "Whose Bill",
        dataIndex: "whose_bill",
        key: "whose_bill",
        fields: [
          {
            type: "Select",
            name: "whose_bill",
            placeholder: "-Select-",
            values: ["Charity", "Debt Payments", "Entertainment"],
          },
        ],
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
        key: "frequency",
        fields: [
          {
            type: "Select",
            name: "frequency",
            placeholder: "-Select-",
            values: [
              "Annually",
              "Bi-Monthly",
              "Bi-Weekly",
              "Monthly",
              "One-Time",
              "Quaterly",
              "Semi-Annually",
              "Weekly",
            ],
          },
        ],
      },
      {
        title: "Source",
        dataIndex: "source",
        key: "source",
        fields: [
          {
            type: "Select",
            name: "source",
            placeholder: "-Select-",
            values: [
              "Bank TFR",
              "Credit Card",
              "Hand Check",
              "Digital Pay (Venmo, Paypal)",
            ],
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
      {
        title: "Receipt",
        dataIndex: "receipt",
        key: "receipt",
        fields: [
          {
            type: "Document",
            name: "receipt",
          },
        ],
      },
    ];

    // const { handleFormInputChange } = this.props;
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      
    } = this.props;


    return (
      <React.Fragment>
        <AddModal
          title={"Add New Bill"}
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
          create={this.createBills}
        />


          <UpdateModal
          title={"Update Bill"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateBills}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={income_tax} title={"Upcoming Bills"} />
        {role !== "ROLE" ? (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10%",
              }}
            >
              <h2 className="text-center font-weight-bold">
                Complete the budget module now ?
              </h2>
              <div
                style={{
                  marginLeft: "10%",
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                }}
              >
                <div style={{ marginRight: "3%" }}>
                  <Button
                    type="primary"
                    size={"large"}
                    style={{
                      background: "#39b54a",
                      borderRadius: "100px",
                      width: "100px",
                    }}
                    onClick={() => {
                      this.props.history.push("/budget");
                    }}
                  >
                    <span className="custom-footer-text">Yes</span>
                  </Button>
                </div>
                <div>
                  {/* <Button
                    type="primary"
                    size={"large"}
                    style={{
                      background: "white",
                      borderRadius: "100px",
                      width: "100px",
                    }}
                  >
                    <span
                      className="custom-footer-text"
                      style={{ color: "black" }}
                    >
                      No
                    </span>
                  </Button> */}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
        <Add
          title={"Bills"}
          button={"Add New Bills"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
        />

        {/* get bills row */}
        {this.state.bills_to_pay.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default withRouter(BillsToPayForm);
