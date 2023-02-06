import React, { Component } from "react";
import { Icon } from "antd";
import ChecklistForm from "../../../../components/form/death/Checklist";
import MessageForm from "../../../../components/form/death/MessageForm";
import AudioVideoMessage from "../../../../components/form/death/AudioVideoMessageForm";
import ContactListForm from "../../../../components/form/death/ContactListForm";
import EmailToSendForm from "../../../../components/form/death/EmailToSendForm";
import DocumentsForm from "../../../../components/form/death/DocumentsForm";
import PersonalInstructionsForm from "../../../../components/form/death/PersonalInstructionsForm";
import LargeBillsForm from "../../../../components/form/death/LargeBillsForm";
import LitigationForm from "../../../../components/form/death/LitigationForm";
import ProgrammingStatusForm from "../../../../components/form/death/ProgrammingStatusForm";
import ListOfPasswordsForm from "../../../../components/form/death/ListOfPasswordsForm";
import PrepaidBurialExpenseForm from "../../../../components/form/death/PrepaidBurialExpenseForm";
import PersonalItemLocationForm from "../../../../components/form/death/PersonalItemLocationForm";
import BreadCrumb from "../../../../components/BreadCrumb";
import FormWizardHeader from "../../../../components/FormWizardHeader";
import { FormPagePose } from "../../../../components/Animations";
import DeathSideDisplay from "./DeathSideDisplay";
import AccountAssetForm from "../../../../components/form/death/AccountAssetForm";
import BillsToPayForm from "../../../../components/form/death/BillsToPayForm";

class DeathCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,
      currentRole: "",

      checklistObject: {
        checkList: {},
        messageForm: {},
        accountAssetForm: {},
        audioVideoForm: {},
        contactListForm: {},
        emailToSendForm: {},
        documentsForm: {},
        personalInstructionsForm: {},
        largeBillsForm: {},
        litigationForm: {},
        personalItemLocationForm: {},
        listOfPasswordsForm: {},
        prepaidBurialExpenseForm: {},
        programmingStatusForm: {},
        billsToPayForm: {},
      },

      formSteps: [
        {
          id: "MessageForm ",
          icon: "icon_ex.png",
          title: "Executer/Trustee Start Here ",
          component: MessageForm,
        },
        {
          id: "AudioVideoMessage",
          icon: "icon_ex.png",
          title: "Audio Video Message",
          component: AudioVideoMessage,
        },
        {
          id: "checkList",
          icon: "icon_ex.png",
          title: "CheckList",
          component: ChecklistForm,
        },
        {
          id: "personalInstructionsForm",
          icon: "icon_ex.png",
          title: "Personal Instructions",
          component: PersonalInstructionsForm,
        },
        {
          id: "contactListForm",
          icon: "icon_ex.png",
          title: "Contact List",
          component: ContactListForm,
        },
        {
          id: "emailToSendForm",
          icon: "icon_ex.png",
          title: "Emails & Text to Send",
          component: EmailToSendForm,
        },
        {
          id: "prepaidBurialExpenseForm",
          icon: "icon_ex.png",
          title: "Prepaid Burial Expense",
          component: PrepaidBurialExpenseForm,
        },
        {
          id: "listOfPasswordsForm",
          icon: "icon_ex.png",
          title: "List of Passwords",
          component: ListOfPasswordsForm,
        },
        {
          id: "billsToPayForm",
          icon: "icon_ex.png",
          title: "Bills to Pay",
          component: BillsToPayForm,
        },
        {
          id: "accountAssetForm",
          icon: "icon_ex.png",
          title: "Account and Assets",
          component: AccountAssetForm,
        },
        {
          id: "documentsForm",
          icon: "icon_ex.png",
          title: "Important Documents",
          component: DocumentsForm,
        },
        {
          id: "litigationForm",
          icon: "icon_ex.png",
          title: "Litigation List",
          component: LitigationForm,
        },
        {
          id: "personalItemLocationForm",
          icon: "icon_ex.png",
          title: "Location of Personal Items",
          component: PersonalItemLocationForm,
        },
      ],

      formStepsOther: [
        {
          id: "MessageForm ",
          icon: "icon_ex.png",
          title: "Executer/Trustee Start Here ",
          component: MessageForm,
        },
        {
          id: "AudioVideoMessage",
          icon: "icon_ex.png",
          title: "Audio Video Message",
          component: AudioVideoMessage,
        },
        {
          id: "personalInstructionsForm",
          icon: "icon_ex.png",
          title: "Personal Instructions",
          component: PersonalInstructionsForm,
        },
        {
          id: "checkList",
          icon: "icon_ex.png",
          title: "CheckList",
          component: ChecklistForm,
        },
        {
          id: "emailToSendForm",
          icon: "icon_ex.png",
          title: "Emails & Text to Send",
          component: EmailToSendForm,
        },
        {
          id: "contactListForm",
          icon: "icon_ex.png",
          title: "Contact List",
          component: ContactListForm,
        },
        {
          id: "prepaidBurialExpenseForm",
          icon: "icon_ex.png",
          title: "Prepaid Burial Expense",
          component: PrepaidBurialExpenseForm,
        },
        {
          id: "listOfPasswordsForm",
          icon: "icon_ex.png",
          title: "List of Passwords",
          component: ListOfPasswordsForm,
        },
        {
          id: "billsToPayForm",
          icon: "icon_ex.png",
          title: "Bills to Pay",
          component: BillsToPayForm,
        },
        {
          id: "accountAssetForm",
          icon: "icon_ex.png",
          title: "Account and Assets",
          component: AccountAssetForm,
        },
        {
          id: "documentsForm",
          icon: "icon_ex.png",
          title: "Important Documents",
          component: DocumentsForm,
        },
        {
          id: "litigationForm",
          icon: "icon_ex.png",
          title: "Litigation List",
          component: LitigationForm,
        },
        {
          id: "personalItemLocationForm",
          icon: "icon_ex.png",
          title: "Location of Personal Items",
          component: PersonalItemLocationForm,
        },
      ],
    };
  }

  componentWillMount() {
    this.setState({
      currentForm:
        this.state.currentRole === "ROLE"
          ? this.state.formStepsOther[0]
          : this.state.formSteps[0],
    });
  }
  

  componentDidUpdate(){


  }

  getIndexOfCurrentComponent = (id) => {
    this.state.currentRole === "ROLE"
      ? this.state.formStepsOther.map((step, index) => {
          if (id === step.id) this.setState({ currentFormIndex: index });
        })
      : this.state.formSteps.map((step, index) => {
          if (id === step.id) this.setState({ currentFormIndex: index });
        });
  };

  getHeaderClickedForm = (form) => {
    this.setState({ formVisible: false });
    this.setState({ currentForm: form });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  changeRole = () => {
    if (this.state.currentRole === "") this.setState({ currentRole: "ROLE" });
    else this.setState({ currentRole: "" });
  };
  nextForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm:
        this.state.currentRole === "ROLE"
          ? this.state.formStepsOther[this.state.currentFormIndex + 1]
          : this.state.formSteps[this.state.currentFormIndex + 1],
      currentFormIndex: this.state.currentFormIndex + 1,
    });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  previousForm = () => {
    this.setState({
      currentForm:
        this.state.currentRole === "ROLE"
          ? this.state.formStepsOther[this.state.currentFormIndex - 1]
          : this.state.formSteps[this.state.currentFormIndex - 1],
      currentFormIndex: this.state.currentFormIndex - 1,
    });
  };

  toggleRightSide = () => {
    if (this.state.toggleClass) this.setState({ toggleClass: false });
    else this.setState({ toggleClass: true });
  };
 handleChange = () => {
console.log(this.state.checklistObject);
 }

  handleChecklistObject=(formName,personal_instructions) =>{
    // console.log("in handleChecklistObjecthandleChecklistObjecthandleChecklistObjecthandleChecklistObject",personal_instructions);
    // console.log(personal_instructions);
      
        // console.log("checlistobject",this.state.checklistObject);
        let formData = this.state.checklistObject;

        
        formData[formName.id] = personal_instructions;    
        // console.log("formdata",formData["personalInstructionsForm"]);
        // console.log("form data", formData);
    
        this.setState({ checklistObject: formData },()=>{
          // console.log(this.state.checklistObject);
          this.handleChange()
        });      
        
  }


  // Input Handler Start

  handleFormInputChange = (formName, name, value) => {
    let formData = this.state.checklistObject;

    // console.log("name",name);
    // console.log("value",value);
    // console.log("formname",formName);
    
    formData[formName.id][name] = value;    
    // console.log("formdata",formData);
    // this.setState({ checklistObject: formData });
  };

  handleInputChange = (event, formName) => {



    const { name, value } = event.target;
    this.handleFormInputChange(formName, name, value);

  };

  handleDatePickerChange = (name, date, dateString, formName) => {
    this.handleFormInputChange(formName, name, dateString);
  };

  handleSelectChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  handleRadioChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  handleCurrencyChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  handleToggleCustomChange = (name, value, formName) => {
 
    this.handleFormInputChange(formName, name, value);
  };

  handlePhoneChange = (name, value, formName) => {
 
    this.handleFormInputChange(formName, name, value);
  };


  handleDocumentChange = (name, value, formName) => {
    const val = value.name
 
    this.handleFormInputChange(formName, name, val);
  };

  handleWebChange = (name, value, formName) => {
 
    this.handleFormInputChange(formName, name, value);
  };


  handleChecklistChange = (name, value, formName) => {
   
    this.handleFormInputChange(formName, name, value);
  };

  handleRichTextChange = (name, value, formName) => {
   
    this.handleFormInputChange(formName, name, value);
  };


  // Input Handler End

  naviagte = (path) => {
    this.props.history.push(path);
  };

  genExtra = (id) => <Icon type="form"></Icon>;
  componentDidMount(){
    console.log("in death create did mount");
    console.log(this.state.checklistObject);
  }
  render() {
    const CurrentForm = this.state.currentForm.component;

    return (
      <div
        className={
          this.state.toggleClass
            ? "form-page-container-wrap right-side--opend"
            : "form-page-container-wrap right-side--collapsed"
        }
      >
        <div className="form-page--main-side">
          <FormWizardHeader
            steps={
              this.state.currentRole === "ROLE"
                ? this.state.formStepsOther
                : this.state.formSteps
            }
            getHeaderClickedForm={this.getHeaderClickedForm}
            currentFormIndex={this.state.currentFormIndex}
            getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
          />

          <div className="container">
            {/* <BreadCrumb /> */}
            <div
              style={{
                marginTop: "45px",
              }}
            ></div>

            <div className="form-page-container">
              <div className="form-page--left-side">
                <FormPagePose
                  className="info-form-block"
                  pose={this.state.formVisible ? "visible" : "hidden"}
                >
                  <CurrentForm
                    currentForm={this.state.currentForm}
                    nextForm={this.nextForm}
                    previousForm={this.previousForm}
                    handleInputChange={this.handleInputChange}
                    checklistObject={this.state.checklistObject}
                    handleDatePickerChange={this.handleDatePickerChange}
                    handleSelectChange={this.handleSelectChange}
                    handleFormInputChange={this.handleFormInputChange}
                    handleCurrencyChange={this.handleCurrencyChange}
                    handlePhoneChange={this.handlePhoneChange}
                    handleDocumentChange={this.handleDocumentChange}
                    handleRadioChange={this.handleRadioChange}
                    handleWebChange={this.handleWebChange}
                    handleRichTextChange={this.handleRichTextChange}
                    navigate={this.naviagte}
                    role={this.state.currentRole}
                    changeRole={this.changeRole}
                    handleChecklistObject={this.handleChecklistObject}
                  />
                </FormPagePose>
              </div>
            </div>
          </div>
        </div>
        <div className="form-page--right-side custom">
          <span
            className="right-side-collapse-icon"
            onClick={this.toggleRightSide}
          >
            <i className="fe-menu"></i>
          </span>
          <div className="form-page--right-side-wrap">
            <DeathSideDisplay
              data={this.state.checklistObject}
              steps={
                this.state.currentRole === "ROLE"
                  ? this.state.formStepsOther
                  : this.state.formSteps
              }
              currentFormIndex={this.state.currentFormIndex}
              getHeaderClickedForm={this.getHeaderClickedForm}
              getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
              genExtra={this.genExtra}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DeathCreate;
