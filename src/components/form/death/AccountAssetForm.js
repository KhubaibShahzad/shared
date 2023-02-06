import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import ReactPlayer from "react-player";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import NetWorth4 from "../../../assets/images/latest/Networth4.png";

const formName = "accountAssetForm";

class AccountAssetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account_asset: [
        {AssetName:"abc",AccountType:"Type",HeldWhere:"Elec",MonetaryValue:"4150"}
      ],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.accountAssetForm &&
      this.props.checklistObject.accountAssetForm.hasOwnProperty(
        "account_asset"
      )
    )
      this.setState({
        account_asset:
          this.props.checklistObject.accountAssetForm.account_asset,
      });
    this.props.handleChecklistObject(this.props.currentForm,this.state.account_asset)

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
  const {account_asset} = this.state

      const updatedRows = account_asset.filter((row, index) => {
        return index != idx - 1;
      });
  
     
        this.setState({
          account_asset: updatedRows,
        },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.account_asset)

        });
 
    };


  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });

  const {account_asset} = this.state


    // get selected row (this will return array of object)
    let selectedRow = account_asset.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


    //  function to update a specific Account Asset row
    updateAccountAsset = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { account_asset, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      account_asset = [...this.state.account_asset]; // important to create a copy, otherwise you'll modify state outside of setState call
      account_asset[index] = obj; // replace current updated object in account_asset based on index
      this.setState({ account_asset },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.account_asset)

      });
    };


      // function to create account Asset (data)
  createAccountAsset = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in account_asset list with keeping old data
    this.setState({
      account_asset: [...this.state.account_asset, currentFormData.formData],
    },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.account_asset)

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
              <span className="custom-field-heading-style">Asset Name:</span>
              <span className="custom-field-value-style"> {data.AssetName}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account type:</span>
              <span className="custom-field-value-style"> {data.AccountType}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Held Where:</span>
              <span className="custom-field-value-style"> {data.HeldWhere}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Monetary Value:
              </span>
              <span className="custom-field-value-style"> {data.MonetaryValue}</span>
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
        title: "Asset Name",
        type: "input",
        index:"AssetName"
      },
      {
        title: "Account Type",
        type: "select",
        options: ["Abc", "Def"],
        index:"AccountType"
      },
      {
        title: "Held Where",
        type: "input",
        index:"HeldWhere"
      },
      {
        title: "Monetary Value",
        type: "currency",
        index:"MonetaryValue"
      },
    ];


    const update_fields = [
      {
        title: "Asset Name",
        type: "input",
        index:"AssetName"
      },
      {
        title: "Account Type",
        type: "select",
        options: ["Abc", "Def"],
        index:"AccountType"
      },
      {
        title: "Held Where",
        type: "input",
        index:"HeldWhere"
      },
      {
        title: "Monetary Value",
        type: "currency",
        index:"MonetaryValue"
      },
    ];


    const account_asset = [
      {
        title: "Name of Asset",
        dataIndex: "asset_name",
        key: "asset_name",
        fields: [
          {
            type: "Input",
            name: "asset_name",
          },
        ],
      },
      {
        title: "Account Type",
        dataIndex: "account_type",
        key: "account_type",
        fields: [
          {
            type: "Select",
            name: "account_type",
            placeholder: "-Select-",
            values: ["Asset 1", "Asset 2"],
          },
        ],
      },
      {
        title: "Held Where",
        dataIndex: "held_where",
        key: "held_where",
        fields: [
          {
            type: "Input",
            name: "held_where",
          },
        ],
      },
      {
        title: "Monetary Value",
        dataIndex: "monetary_value",
        key: "monetary_value",
        fields: [
          {
            type: "Input",
            name: "monetary_value",
          },
        ],
      },
    ];


    const {
      currentForm,
      handleInputChange,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handlePhoneChange,
      role
    } = this.props;

    // const { handleFormInputChange, role } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Account/Asset"}
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
          create={this.createAccountAsset}
        />


        <UpdateModal
          title={"Update Account/Asset"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateAccountAsset}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={NetWorth4} title={"Account and Asset"} />

        {role !== "ROLE" ? (
          <Row style={{ marginBottom: "10%" }}>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20%",
                  marginRight: "6%",
                }}
              >
                <h3 className="text-center font-weight-bold">
                  Import List of Assets where your are the Owner ?
                </h3>
                <div
                  style={{
                    marginLeft: "10%",
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
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
            </Col>
            <Col span={12}>
              <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
            </Col>
          </Row>
        ) : (
          ""
        )}

        <Add
          title={"Accounts & Assets"}
          button={"Add New Account / Asset"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
        />

        {/* get account and asset row */}
        {this.state.account_asset.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default AccountAssetForm;
