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
} from "antd";
import moment from 'moment';
import "../../custom/CustomSubFormTable.css";
import PhoneNumber from "../PhoneNumber";
import Currency from "../Currency";
import TextArea from "antd/lib/input/TextArea";
import WebAddress from "../WebAddress";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
      isError: false,
      errorMessage: "",
    };
  }

  onSubmit = async () => {
    try {
      const { cbUpdate, cbClose, onLoad, obj, onConstraints } = this.props;

      if (onConstraints) {
        let cons = onConstraints(obj);
        if (cons) {
          this.setState({ isError: true, errorMessage: cons });
          return null;
        }
      }

      let module = await cbUpdate(obj.id, obj);
      // if (module.status === 200) {
      //   // await onLoad();
      // }
      this.setState({ isError: false, errorMessage: "" });
      cbClose();
    } catch (error) {}
  };

  render() {
    const {
      title,
      isVisible = false,
      fields = [1],
      cbClose,
      obj = {},
      onUpdateChange,
      handleDateChange,

    } = this.props;

    return (
      <Modal
        title={<span className="custom-modal-header-title">{title}</span>}
        visible={isVisible}
        centered
        width="50%"
        onCancel={cbClose}
        onOk={this.onSubmit}
        destroyOnClose={cbClose}
        okButtonProps={{
          style: {
            background: "#39b54a",
            width: "10%",
          },
        }}
      >
        <Form>
          <Row gutter={16}>
            {fields.map((item) => {
              const {
                title,
                type,
                options = [],
                index = null,
                isDisabled,
              } = item;
              // if(obj)  {
              // console.log("in update modal",obj);

              // }
              switch (type) {
                case "input":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <Input
                          value={obj ? obj[index] : ""}
                          disabled={isDisabled}
                          onChange={(val) =>
                            onUpdateChange(val.target.value, index)
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
                          value={obj ? obj[index] : ""}
                          placeholder="-Select-"
                          onChange={
                            (val) => onUpdateChange(val, index)
                            // this.setState({
                            //   form: {
                            //     ...this.state.form,
                            //     [index]: val,
                            //   },
                            // })
                          }
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
                          value={obj ? obj[index] : ""}
                          onChange={(val) =>
                            onUpdateChange(val.target.value, index)
                          }

                          //   value={
                          //     this.state.form[index]
                          //       ? this.state.form[index]
                          //       : null
                          //   }
                          placeholder="#,###,###,##"
                          name="client_primaryContactCurrency"
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
                          placeholder={`Enter ${title}`}
                          name="client_primaryContactNumber"
                          onChange={(val) =>
                            onUpdateChange(val.target.value, index)
                          }
                        ></PhoneNumber>
                      </Form.Item>
                    </Col>
                  );

                case "date":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <DatePicker
                          defaultValue={obj ? moment(obj[index]) : ''}
                          onChange={(date,dateString) =>
                            handleDateChange(date,dateString, index)
                          }
                          size="large"
                          // style={{ width: "100%" }}
                          format={"MM/DD/YYYY"}
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
                        value={obj ? obj[index] : ""}
                        onChange={(val) =>
                          onUpdateChange(val.target.value, index)
                        }
                        
                        />
                      </Form.Item>
                    </Col>
                  );

                case "richtext":
                  return (
                    <Col span={24}>
                      <Form.Item label={title}>
                        <ReactQuill 
                        value={obj ? obj[index] : ""}

                            onChange={(val) =>
                              onUpdateChange(val.target.value, index)
                            }
                        />
                      </Form.Item>
                    </Col>
                  );

                case "radio":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <Radio.Group
                          //   value={
                          //     this.state.form[index]
                          //       ? this.state.form[index]
                          //       : null
                          //   }
                          // onChange={(val) => {
                          //   this.setState({
                          //     form: {
                          //       ...this.state.form,
                          //       [index]:
                          //         val.target.value === "Yes" ? true : false,
                          //     },
                          //   });
                          // }}

                          onChange={(val) =>
                            onUpdateChange(val.target.value, index)
                          }
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
                         onChange={(event) =>
                          onUpdateChange(event.target.value, index)
                        }
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
                          // value={obj ? obj[index] : ""}

                           onChange={(event) =>
                            onUpdateChange(event.target.files[0].name, index)
                          }
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

export default UpdateModal;