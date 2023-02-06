import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Form } from "antd";
import { document_types } from "../../../constants/document_types";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import Trust from "../../../assets/images/latest/Trust.png";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
const formName = "documentsForm";

class DocumentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [
        {DocumentName:"Name",DocumentType:"Type",File:"abs.jpeg",Notes:"Notes Here"}
      ],
      addNew: [],
      insurancePolicies: [
        {PolicysNickname:"Nick Name",PolicyNumber:"123",Carrier:"Carrier",InsuranceType:"abc",ContactPhone:"+1-345"
      }
      ],
      fileUploaded: [],
      fileNotUploaded: [],
      formData: {},

      isDocumentAddModalVisible: false,
      isPolicyAddModalVisible: false,
      isDocumentUpdateModalVisible: false,
      isPolicyUpdateModalVisible: false,
      updateObject: null,
      selectedIndex:null
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.documentsForm &&
      this.props.checklistObject.documentsForm.hasOwnProperty("documents") &&
      this.props.checklistObject.documentsForm.hasOwnProperty("addNew") &&
      this.props.checklistObject.documentsForm.hasOwnProperty(
        "insurancePolicies"
      ) &&
      this.props.checklistObject.documentsForm.hasOwnProperty("fileUploaded") &&
      this.props.checklistObject.documentsForm.hasOwnProperty("fileNotUploaded")
    )
      this.setState({
        documents: this.props.checklistObject.documentsForm.documents,
        addNew: this.props.checklistObject.documentsForm.addNew,
        insurancePolicies:
          this.props.checklistObject.documentsForm.insurancePolicies,
        fileUploaded: this.props.checklistObject.documentsForm.fileUploaded,
        fileNotUploaded:
          this.props.checklistObject.documentsForm.fileNotUploaded,
      });

    this.props.handleChecklistObject(this.props.currentForm,this.state.documents)
    this.props.handleChecklistObject(this.props.currentForm,this.state.insurancePolicies)

  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

// to handle hide and show for document add modal
setDocumentAddModalVisible = () => {
  if (this.state.isDocumentAddModalVisible)
    this.setState({ isDocumentAddModalVisible: false });
  else this.setState({ isDocumentAddModalVisible: true });
};

// to handle hide and show for policies  add modal
setPolicyAddModalVisible = () => {
  if (this.state.isPolicyAddModalVisible)
    this.setState({ isPolicyAddModalVisible: false });
  else this.setState({ isPolicyAddModalVisible: true });
};

// to handle hide and show for document update modal
setDocumentUpdateModalVisible = () => {
  if (this.state.isDocumentUpdateModalVisible)
    this.setState({ isDocumentUpdateModalVisible: false });
  else this.setState({ isDocumentUpdateModalVisible: true });
};

// to handle hide and show for policies update modal
setPolicyUpdateModalVisible = () => {
  if (this.state.isPolicyUpdateModalVisible)
    this.setState({ isPolicyUpdateModalVisible: false });
  else this.setState({ isPolicyUpdateModalVisible: true });
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
      
          if (name == "document") {
            this.setState({
              documents: updatedRows,
            },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.documents)

            });
          } else {
            this.setState({
              insurancePolicies: updatedRows,
            },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.insurancePolicies)

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
    
        // get first and only element from list and store it in update object
        this.setState({
          updateObject: { ...this.state.updateObject, ...selectedRow[0] },
        });
      };
  
  
  //  function to update a specific document row
  updateDocumentRow = () => {
    let obj = {
      ...this.state.updateObject,
    };
  
    let { documents, selectedIndex } = this.state;
    let index = selectedIndex - 1;
  
    documents = [...this.state.documents]; // important to create a copy, otherwise you'll modify state outside of setState call
    documents[index] = obj; // replace current updated object in documents based on index
    this.setState({ documents },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.documents)

    });
  };
  
  
    //  function to update a specific Policy row
    updatePolicyRow = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { insurancePolicies, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      insurancePolicies = [...this.state.insurancePolicies]; // important to create a copy, otherwise you'll modify state outside of setState call
      insurancePolicies[index] = obj; // replace current updated object in insurancePolicies based on index
      this.setState({ insurancePolicies },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.insurancePolicies)

      });
    };
  
  
  // function to create document row (data)
  createDocumentRow = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in documents list with keeping old data
    this.setState({
      documents: [...this.state.documents, currentFormData.formData],
    },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.documents)

    });
  };
  
  // function to create teapolicym row(data)
  createPolicyRow = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in insurancePolicies list with keeping old data
    this.setState({
      insurancePolicies: [...this.state.insurancePolicies, currentFormData.formData],
    },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.insurancePolicies)

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
 


  getDocumentRow = ({ data,index }) => {
    const { role } = this.props;
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Document Name:</span>
              <span className="custom-field-value-style"> {data.DocumentName}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Document type:</span>
              <span className="custom-field-value-style"> {data.DocumentType}</span>
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
              <span className="custom-field-heading-style">
                Death Certificate:
              </span>
              <span className="custom-field-value-style">
                {data.DeathCertificate}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Certificate Needed:
              </span>
              <span className="custom-field-value-style"> {data.CertificateNeeded}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Recipt:</span>
              <span className="custom-field-value-style"> {data.File}</span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          {role !== "ROLE" ? (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon={"upload"}
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
                icon="edit"
                onClick={() => {
                  const { documents } = this.state;
                  this.getSelectedRow(index, documents);
  
                  this.setDocumentUpdateModalVisible();
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
                  const { documents } = this.state;
                  const name = "document";
                  this.deleteSelectedRow(index, documents, name);
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

  getInsuranceRow = ({data, index }) => {
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
              <span className="custom-field-heading-style">
                Type of Insurance:
              </span>
              <span className="custom-field-value-style"> {data.InsuranceType}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Carrier:</span>
              <span className="custom-field-value-style"> {data.Carrier}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Nick:</span>
              <span className="custom-field-value-style">{data.PolicysNickname}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Contact Name:</span>
              <span className="custom-field-value-style">{data.ContactName}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Contact Phone:
              </span>
              <span className="custom-field-value-style"> {data.ContactPhone}</span>
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
                  const { insurancePolicies } = this.state;
                  this.getSelectedRow(index, insurancePolicies);
  
                  this.setPolicyUpdateModalVisible();
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
                  const { insurancePolicies } = this.state;
                  const name = "policy";
                  this.deleteSelectedRow(index, insurancePolicies, name);
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
    const largeBills = [
      {
        title: "Death Certificate URL",
        dataIndex: "certificate_url",
        key: "certificate_url",
        fields: [
          {
            type: "WebAddress",
            name: "certificate_url",
          },
        ],
      },
      {
        title: "Want To Fetch Insurance Policies ?",
        dataIndex: "policy_qna",
        key: "policy_qna",
        fields: [
          {
            type: "Radio",
            name: "policy_qna",
            values: ["Yes", "No"],
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name",
        key: "document_name",
        fields: [
          {
            type: "Input",
            name: "document_name",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type",
        key: "document_type",
        fields: [
          {
            type: "Select",
            name: "document_type",
            placeholder: "-Select-",
            values: document_types,
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
      {
        title: "Storage/Location of Documents",
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

    const New_Document = [
      {
        title: "Document Icon",
        dataIndex: "doc_icon_new_doc",
        key: "doc_icon_new_doc",
        fields: [
          {
            type: "Input",
            name: "doc_icon_new_doc",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type_new_doc",
        key: "document_type_new_doc",
        fields: [
          {
            type: "Select",
            name: "document_type_new_doc",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name_new_doc",
        key: "document_name_new_doc",
        fields: [
          {
            type: "Input",
            name: "document_name_new_doc",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload_new_doc",
        key: "file_upload_new_doc",
        fields: [
          {
            type: "Document",
            name: "file_upload_new_doc",
          },
        ],
      },
      {
        title: "Storage/Location of Documents",
        dataIndex: "location_new_doc",
        key: "location_new_doc",
        fields: [
          {
            type: "TextArea",
            name: "location_new_doc",
          },
        ],
      },
      {
        title: "Date Created",
        dataIndex: "date_created_new_doc",
        key: "date_created_new_doc",
        fields: [
          {
            type: "DatePicker",
            name: "date_created_new_doc",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes_new_doc",
        key: "notes_new_doc",
        fields: [
          {
            type: "TextArea",
            name: "notes_new_doc",
          },
        ],
      },
    ];

    const Insurance_Policies = [
      {
        title: "Insurance Type",
        dataIndex: "insurance_type_policies",
        key: "insurance_type_policies",
        fields: [
          {
            type: "Select",
            name: "insurance_type_policies",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Nickname of Policy",
        dataIndex: "nickname_policy",
        key: "nickname_policy",
        fields: [
          {
            type: "Input",
            name: "nickname_policy",
          },
        ],
      },
      {
        title: "Policy Number",
        dataIndex: "policy_number",
        key: "policy_number",
        fields: [
          {
            type: "Input",
            name: "policy_number",
          },
        ],
      },
      {
        title: "Carrier",
        dataIndex: "carrier_policy",
        key: "carrier_policy",
        fields: [
          {
            type: "TextArea",
            name: "carrier_policy",
          },
        ],
      },
      {
        title: "Contact Name",
        dataIndex: "contact_name_policy",
        key: "contact_name_policy",
        fields: [
          {
            type: "Input",
            name: "contact_name_policy",
          },
        ],
      },
      {
        title: "View Policy in Insurance Module",
        dataIndex: "view_policy_module",
        key: "view_policy_module",
        fields: [
          {
            type: "Radio",
            name: "view_policy_module",
            values: ["Yes", "No"],
          },
        ],
      },
    ];

    const File_Uploaded = [
      {
        title: "Document Icon",
        dataIndex: "doc_icon_upload",
        key: "doc_icon_upload",
        fields: [
          {
            type: "Input",
            name: "doc_icon_upload",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type_upload",
        key: "document_type_upload",
        fields: [
          {
            type: "Select",
            name: "document_type_upload",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name_upload",
        key: "document_name_upload",
        fields: [
          {
            type: "Input",
            name: "document_name_upload",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload_upload",
        key: "file_upload_upload",
        fields: [
          {
            type: "Document",
            name: "file_upload_upload",
          },
        ],
      },
      {
        title: "Storage/Location of Documents",
        dataIndex: "location_upload",
        key: "location_upload",
        fields: [
          {
            type: "TextArea",
            name: "location_upload",
          },
        ],
      },
      {
        title: "Date Created",
        dataIndex: "date_created_upload",
        key: "date_created_upload",
        fields: [
          {
            type: "DatePicker",
            name: "date_created_upload",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes_new_doc",
        key: "notes_new_doc",
        fields: [
          {
            type: "TextArea",
            name: "notes_new_doc",
          },
        ],
      },
      {
        title: "Phone Number/Fax Number to Send File",
        dataIndex: "send_file_upload",
        key: "send_file_upload",
        fields: [
          {
            type: "Input",
            name: "send_file_upload",
          },
        ],
      },
    ];

    const File_Not_Uploaded = [
      {
        title: "Document Icon",
        dataIndex: "doc_icon_not_upload",
        key: "doc_icon_not_upload",
        fields: [
          {
            type: "Input",
            name: "doc_icon_not_upload",
          },
        ],
      },
      {
        title: "Document Type",
        dataIndex: "document_type_not_upload",
        key: "document_type_not_upload",
        fields: [
          {
            type: "Select",
            name: "document_type_not_upload",
            placeholder: "-Select-",
            values: document_types,
          },
        ],
      },
      {
        title: "Document Name",
        dataIndex: "document_name_not_upload",
        key: "document_name_not_upload",
        fields: [
          {
            type: "Input",
            name: "document_name_not_upload",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload_not_upload",
        key: "file_upload_not_upload",
        fields: [
          {
            type: "Document",
            name: "file_upload_not_upload",
          },
        ],
      },
      {
        title: "Storage/Location of Documents",
        dataIndex: "location_not_upload",
        key: "location_not_upload",
        fields: [
          {
            type: "TextArea",
            name: "location_not_upload",
          },
        ],
      },
      {
        title: "Date Created",
        dataIndex: "date_created_not_upload",
        key: "date_created_not_upload",
        fields: [
          {
            type: "DatePicker",
            name: "date_created_not_upload",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes_new_not_doc",
        key: "notes_new_not_doc",
        fields: [
          {
            type: "TextArea",
            name: "notes_new_not_doc",
          },
        ],
      },
      {
        title: "Phone Number/Fax Number to Send File",
        dataIndex: "send_file_not_upload",
        key: "send_file_not_upload",
        fields: [
          {
            type: "Input",
            name: "send_file_not_upload",
          },
        ],
      },
    ];

    const documentFields = [
      {
        title: "Document Name",
        type: "input",
        index:"DocumentName"
      },
      {
        title: "Document Type",
        type: "select",
        options: ["Abc", "Def"],
        index:"DocumentType"
      },
      // {
      //   title: "Death Certificate URL",
      //   type: "web",
      // },
      // {
      //   title: "Certificated Needed",
      //   type: "input",
      // },
      {
        title: "Storage Location Of Document",
        type: "input",
        index:"StorageLocationOfDocument"
      },
      {
        title: "File",
        type: "document",
        index:"File"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const UpdateDocumentFields = [
      {
        title: "Document Name",
        type: "input",
        index:"DocumentName"
      },
      {
        title: "Document Type",
        type: "select",
        options: ["Abc", "Def"],
        index:"DocumentType"
      },
      // {
      //   title: "Death Certificate URL",
      //   type: "web",
      // },
      // {
      //   title: "Certificated Needed",
      //   type: "input",
      // },
      {
        title: "Storage Location Of Document",
        type: "input",
        index:"StorageLocationOfDocument"
      },
      {
        title: "File",
        type: "document",
        index:"File"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const policiesFields = [
      {
        title: "Policy's Nickname",
        type: "input",
        index:"PolicysNickname"
      },
      {
        title: "Policy Number",
        type: "input",
        index:"PolicyNumber"
      },
      {
        title: "Carrier",
        type: "input",
        index:"Carrier"
      },
      {
        title: "Contact Name",
        type: "input",
        index:"ContactName"
      },
      {
        title: "Insurance Type",
        type: "select",
        options: ["Abc", "Def"],
        index:"InsuranceType"
      },
      {
        title: "Contact Phone",
        type: "phone",
        index:"ContactPhone"
      },
    ];


    const UpdatePoliciesFields = [
      {
        title: "Policy's Nickname",
        type: "input",
        index:"PolicysNickname"
      },
      {
        title: "Policy Number",
        type: "input",
        index:"PolicyNumber"
      },
      {
        title: "Carrier",
        type: "input",
        index:"Carrier"
      },
      {
        title: "Contact Name",
        type: "input",
        index:"ContactName"
      },
      {
        title: "Insurance Type",
        type: "select",
        options: ["Abc", "Def"],
        index:"InsuranceType"
      },
      {
        title: "Contact Phone",
        type: "phone",
        index:"ContactPhone"
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
    role
  } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Document"}
          fields={documentFields}
          isVisible={this.state.isDocumentAddModalVisible}
          cbClose={this.setDocumentAddModalVisible}
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
          create={this.createDocumentRow}
        />

        <AddModal
          title={"Add New Policy"}
          fields={policiesFields}
          isVisible={this.state.isPolicyAddModalVisible}
          cbClose={this.setPolicyAddModalVisible}
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
          create={this.createPolicyRow}
        />



        <UpdateModal
          title={"Update Document"}
          fields={UpdateDocumentFields}
          isVisible={this.state.isDocumentUpdateModalVisible}
          cbClose={this.setDocumentUpdateModalVisible}
          cbUpdate={this.updateDocumentRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />


          <UpdateModal
          title={"Update Policies"}
          fields={UpdatePoliciesFields}
          isVisible={this.state.isPolicyUpdateModalVisible}
          cbClose={this.setPolicyUpdateModalVisible}
          cbUpdate={this.updatePolicyRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={Trust} title={"Important Documents"} />

        <Row className="mb-4">
          <Col span={7}></Col>
          <Col span={11}>
            <Form.Item label={""}>
              <div className="custom-upload-style">
                <input
                  id="file-input"
                  type="input"
                  placeholder="Enter Url Here"
                  style={{ border: "none", outline: "none", width: "60.5%" }}
                />
                {/* <label for="file-input"> */}
                <div
                  style={{
                    fontSize: "20px",
                    background: "#39b54a",
                    padding: "8px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  Death Certificate Url
                </div>
                {/* </label> */}
              </div>
            </Form.Item>
          </Col>
          <Col span={6}></Col>
        </Row>

        <Add
          title={"Important Documents"}
          button={"Add New Document"}
          cbAdd={this.setDocumentAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
          list={[
            {
              option: "Fax Document",
            },
            {
              option: "Email Document",
            },
          ]}
        />

        {/* get document row */}
        {this.state.documents.map((data, index) =>
          this.getDocumentRow({ data, index: index + 1 })
        )}

        <Add
          title={"Insurance Policies"}
          button={"Add New Policy"}
          cbAdd={this.setPolicyAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
          list={[
            {
              option: "Fax Document",
            },
            {
              option: "Email Document",
            },
          ]}
        />


        {/* get policy row */}
        {this.state.insurancePolicies.map((data, index) =>
          this.getInsuranceRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default DocumentsForm;
