import React from "react";
import {
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Icon,
  Button,
} from "antd";
import "../../custom/CustomSubFormTable.css";
import PhoneNumber from "../PhoneNumber";
import Currency from "../Currency";
import TextArea from "antd/lib/input/TextArea";
import WebAddress from "../WebAddress";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      isError: false,
      errorMessage: "",
    };
    this.formRef = React.createRef();
  }

  onSubmit = async () => {
    console.log("on submit");
    try {
      const { cbClose, create, formData } = this.props;

      create({
        formData,
      });
      cbClose();
    } catch (error) {}

    try {
      const { cbCreate, cbClose, onLoad, onConstraints } = this.props;

      if (onConstraints) {
        console.log("ok clicked");
        console.log(this.state.form);
        let cons = onConstraints(this.state.form);
        if (cons) {
          this.setState({ isError: true, errorMessage: cons });
          return null;
        }
      }

      let module = await cbCreate(this.state.form);
      if (module.status === 200) {
        await onLoad();
        this.setState({ isError: false, errorMessage: "", form: {} });
        cbClose();
      }
    } catch (error) {}
  };

  componentDidUpdate() {
    // console.log("in add modal comp did update");
    // console.log(this.props.formData);
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } =
      this.props.form;
    const usernameError = getFieldError("username");
    const {
      setFormData,
      formData,
      title,
      isVisible = false,
      fields = [1],
      cbClose,
      handleCurrencyChange,
      handleSelectChange,
      handleRadioChange,
      handleInputChange,
      handleDatePickerChange,
      handlePhoneChange,
      handleDocumentChange,
      handleWebChange,
      handleRichTextChange,
      currentForm,
    } = this.props;
    return (
      <Modal
        title={<span className="custom-modal-header-title">{title}</span>}
        visible={isVisible}
        centered
        width="50%"
        onCancel={() => {
          this.setState({ isError: false, errorMessage: "" }, () => {
            cbClose();
          });
        }}
        onOk={this.onSubmit}
        // onOk={() => {
        //   console.log("REF ");
        //   this.formRef.dispatchEvent(new Event("submit"));
        // }}
        destroyOnClose={cbClose}
        okButtonProps={{
          style: {
            background: "#39b54a",
            width: "10%",
          },
        }}
      >
        <Form
          ref={(ref) => (this.formRef = ref)}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("PRESSSED ");
          }}
        >
          <Row gutter={16}>
            {fields.map((item) => {
              const {
                title,
                type,
                options = [],
                index = null,
                isRequired = false,
                def = null,
                isDisabled = false,
              } = item;
              switch (type) {
                case "input":
                  return (
                    <Col span={8}>
                      {/* <Form.Item label={title} validateStatus={"error"}> */}
                      <Form.Item label={title}>
                        <Input
                          defaultValue={def}
                          disabled={isDisabled}
                          name={index}
                          onChange={(val) => {
                            if (currentForm) {
                              handleInputChange(val, currentForm);
                              setFormData({
                                [index]: val.target.value,
                              });
                            } else {
                              this.setState({
                                form: {
                                  ...this.state.form,
                                  [index]: val.target.value,
                                },
                              });
                            }
                          }}
                          size="large"
                          placeholder={`Enter ${title}`}
                          // name="client_primaryContactNumber"
                        ></Input>
                      </Form.Item>
                    </Col>
                  );

                case "multiple":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <Input
                          required={isRequired}
                          onChange={(val) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                [index]: val.target.value,
                              },
                            })
                          }
                          size="large"
                          placeholder={`Enter ${title}`}
                          name="client_primaryContactNumber"
                        ></Input>
                      </Form.Item>
                    </Col>
                  );

                case "select":
                  return (
                    <Col span={8}>
                      <Form.Item id={index} label={title}>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          name={title}
                          onChange={(value) => {
                            if (currentForm) {
                              handleSelectChange(index, value, currentForm);
                              setFormData({
                                [index]: value,
                              });
                            } else {
                              this.setState({
                                form: {
                                  ...this.state.form,
                                  [index]: value,
                                },
                              });
                            }
                          }}

                          // onChange={(val) =>
                          //   this.setState({
                          //     form: {
                          //       ...this.state.form,
                          //       [index]: val,
                          //     },
                          //   })
                          // }
                        >
                          {options.length > 0 ? (
                            options.map((item) => {
                              return <Option value={item}>{item}</Option>;
                            })
                          ) : (
                            <React.Fragment>
                              <Option value="Head Stone">Head Stone</Option>
                              <Option value="Casket">Casket</Option>
                              <Option value="Urn">Urn</Option>
                              <Option value="Flowers">Flowers</Option>
                              <Option value="Others">Others</Option>
                            </React.Fragment>
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  );

                case "currency":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <Currency
                          id={index}
                          value={null}
                          placeholder={`Enter ${title}`}
                          name="client_primaryContactCurrency"
                          onChange={(event) => {
                            handleCurrencyChange(
                              index,
                              event.target.value,
                              currentForm
                            );
                            setFormData({
                              [index]: event.target.value,
                            });
                          }}
                        ></Currency>
                      </Form.Item>
                    </Col>
                  );

                case "phone":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <PhoneNumber
                          id={index}
                          // value={null}
                          placeholder={`Enter ${title}`}
                          name="client_primaryContactNumber"
                          onChange={(event) => {
                            // console.log("phone",event.target.name);
                            handlePhoneChange(
                              index,
                              event.target.value,
                              currentForm
                            );
                            setFormData({
                              [index]: event.target.value,
                            });
                          }}
                          disabled={isDisabled}
                        ></PhoneNumber>
                      </Form.Item>
                    </Col>
                  );

                case "date":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <DatePicker
                          size="large"
                          // style={{ width: "100%" }}
                          format={"MM/DD/YYYY"}
                          onChange={(date, dateString) => {
                            handleDatePickerChange(
                              index,
                              date,
                              dateString,
                              currentForm
                            );
                            setFormData({
                              [index]: dateString,
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );

                case "textarea":
                  return (
                    <Col span={24}>
                      <Form.Item label={title}>
                        <TextArea
                          id={index}
                          placeholder="Enter Notes"
                          name={index}
                          onChange={(e) => {
                            handleInputChange(e, currentForm);
                            setFormData({
                              [index]: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );

                case "richtext":
                  return (
                    <Col span={24}>
                      <Form.Item label={title}>
                        <ReactQuill
                          onChange={(e) => {
                           
                            handleRichTextChange(index, e,currentForm);
                            setFormData({
                              [index]: e
                            });
                            console.log('background', e);

                            
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );

                case "radio":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <Radio.Group
                          onChange={(e) => {
                            if (currentForm) {
                              handleRadioChange(
                                index,
                                e.target.value,
                                currentForm
                              );
                              setFormData({
                                [index]: e.target.value,
                              });
                            } else {
                              this.setState({
                                form: {
                                  ...this.state.form,
                                  [index]:
                                    e.target.value === "Yes" ? true : false,
                                },
                              });
                            }
                          }}
                          // onChange={(val) => {
                          //   this.setState({
                          //     form: {
                          //       ...this.state.form,
                          //       [index]:
                          //         val.target.value === "Yes" ? true : false,
                          //     },
                          //   });
                          // }}
                        >
                          {["Yes", "No"].map((value, vindex) => (
                            <Radio.Button key={vindex} value={value}>
                              {value}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  );

                case "web":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <WebAddress 
                        placeholder={`Enter ${title}`} 
                        onChange={(event) => {
                          // console.log("phone",event.target.name);
                          handleWebChange(
                            index,
                            event.target.value,
                            currentForm
                          );
                          setFormData({
                            [index]: event.target.value,
                          });
                        }}
                        disabled={isDisabled}
                        
                        />
                      </Form.Item>
                    </Col>
                  );

                case "document":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <div className="custom-upload-style">
                          <input
                            id="file-input"
                            type="file"
                            onChange={(event) => {
                              console.log("document",event.target.files[0]);
                              if (currentForm) {
                                handleDocumentChange(
                                  index,
                                  event.target.files[0],
                                  currentForm
                                );
                                setFormData({
                                  [index]: event.target.files[0].name,
                                });
                              } else {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    [index]: event.target.files[0],
                                  },
                                });
                              }
                            }}
                          />
                          <label for="file-input">
                            <Icon
                              className="mt-1"
                              style={{
                                fontSize: "23px",
                                background: "#39b54a",
                                padding: "8px",
                                borderRadius: "5px",
                                color: "white",
                              }}
                              type="upload"
                            ></Icon>
                          </label>
                        </div>
                      </Form.Item>
                    </Col>
                  );
              }
            })}
          </Row>
          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button> */}
        </Form>

        {this.state.isError ? (
          <div>
            {/* <p style={{ color: "red" }}>Can't create, constraints Failed</p> */}
            <p style={{ color: "red" }}>{this.state.errorMessage}</p>
          </div>
        ) : null}
      </Modal>
    );
  }
}

export default Form.create({ name: "add_modal" })(AddModal);
