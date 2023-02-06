import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Row, Col } from 'antd';
import {
  LIABILITY_CREDIT_TYPES,
  LIABILITY_TYPES,
  CREDIT_TYPES,
  LIABILITY_TYPES_IMAGES,
  CREDIT_TYPES_IMAGES,
} from 'constants/types';
import { MobileView, BrowserView } from 'react-device-detect';

const formID = 'LiabilityCreditTypeSubForm';
class LiabilityCreditTypeSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Liabilities and Credit',
      fields: [
        {
          id: 'liabilityCreditType',
          title: '',
          value: data['value'],
        },
      ],
    };

    return formData;
  }
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        liabilityCreditType: '',
      },
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    console.log('updateformdata:', newFormData);
    if (newFormData.hasOwnProperty('fields')) {
      this.setState({
        formData: {
          liabilityCreditType: newFormData['fields'][0]['value'],
        },
      });
    }
  }

  handleFormInputChange(name, value) {
    this.setState({
      formData: {
        liabilityCreditType: value,
      },
    });

    let formData = LiabilityCreditTypeSubForm.FnCreateFormData({
      value: value,
    });

    this.props.cbUpdateSubForm(formID, formData);

    // this.props.cbGoSubForm('MainSubForm');
    this.props.cbGoNext(formID);
  }

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <BrowserView>
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Select the Type of Liability</h2>
                        </Col>
                    </Row>
            <Row gutter={16} type='flex' justify='center'>
              <Col span={12}>
                <h2 className='text-center font-weight-bold mb-4'>
                  Liabilities
                </h2>
                <div className='buttons-container'>
                  {LIABILITY_TYPES.map((liabilityCreditType, index) => {
                    let className = 'button-wrap';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      liabilityCreditType
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            liabilityCreditType
                          )
                        }
                      >
                        <div style={{ flexDirection: 'column' }}>
                          <div className='col-12 mt-2'>
                            <img
                              src={LIABILITY_TYPES_IMAGES[index]}
                              height='40px'
                              width='40px'
                            />
                          </div>
                          <div className='col-12 mb-2 mt-2'>
                            {liabilityCreditType}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col span={12}>
                <h2 className='text-center font-weight-bold mb-4'>Credit</h2>
                <div className='buttons-container'>
                  {CREDIT_TYPES.map((liabilityCreditType, index) => {
                    let className = 'button-wrap-liability';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      liabilityCreditType
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            liabilityCreditType
                          )
                        }
                      >
                        <div style={{ flexDirection: 'column' }}>
                          <div className='col-12 mt-2'>
                            <img
                              src={CREDIT_TYPES_IMAGES[index]}
                              height='40px'
                              width='40px'
                            />
                          </div>
                          <div className='col-12 mb-2 mt-2'>
                            {liabilityCreditType}
                          </div>
                        </div>
                      </div>
                    );
                  })}


                </div>
              </Col>
            </Row>
          </BrowserView>
          <MobileView>
            <Row gutter={16} type='flex' justify='center'>
              <Col span={16}>
                <h2 className='text-center font-weight-bold mb-4'>
                  Liabilities
                </h2>
                <div className='buttons-container'>
                  {LIABILITY_TYPES.map((liabilityCreditType, index) => {
                    let className = 'button-wrap';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      liabilityCreditType
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            liabilityCreditType
                          )
                        }
                      >
                        {liabilityCreditType}
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col span={16}>
                <h2 className='text-center font-weight-bold mb-4'>Credit</h2>
                <div className='buttons-container'>
                  {CREDIT_TYPES.map((liabilityCreditType, index) => {
                    let className = 'button-wrap';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      liabilityCreditType
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            liabilityCreditType
                          )
                        }
                      >
                        {liabilityCreditType}
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </MobileView>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(LiabilityCreditTypeSubForm);
