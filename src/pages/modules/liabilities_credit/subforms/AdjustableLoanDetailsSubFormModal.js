import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportModal from 'components/ReportModal';
import { Button, Row, Col, Input, Select, Form, Collapse, Icon, DatePicker, Modal } from 'antd';
import Currency from 'components/form/Currency';
import Percent from 'components/form/PercentV2';
import moment from 'moment';
import { ORDER_DISTRIBUTES, FREQUNCIES } from 'constants/types';
import TextArea from 'antd/lib/input/TextArea';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;

class AdjustableLoanDetailsSubFormModalForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            formData: this.props.formData,
            size: 'large'
        }

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount(){
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        this.setState(newState);

        this.props.cbUpdatedForm(formData);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString){
        this.handleFormInputChange(name, dateString);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    render() {
        let size = this.state.size;

        return(
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <h2 className="text-center font-weight-bold mb-4">Add Adjustable Loan Details</h2>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Adjustable Loan Details">
                                <Input value={this.state.formData.adjustableLoanDetails} name="adjustableLoanDetails" size={size} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Date of Rate Change">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    size={size}
                                    onChange={(date, dateString) => this.handleDatePickerChange('dateRateChange', date, dateString)}
                                    value={this.state.formData.dateRateChange == '' ? null : moment(this.state.formData.dateRateChange, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="New Percent">
                                <Percent size={size} value={this.state.formData.newPercent} name="newPercent" size={size} onChange={(value) => this.handleFormInputChange("newPercent", value)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Monthly Payment Changes">
                                <Currency 
                                    size={size} 
                                    value={this.state.formData.monthlyPaymentChanges} 
                                    name="monthlyPaymentChanges" 
                                    size={size} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
class AdjustableLoanDetailsSubFormModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }

        this.updatedForm = this.updatedForm.bind(this);
    }

    componentDidMount(){
        
    }

    renderBody(){
        return (
            <AdjustableLoanDetailsSubFormModalForm
                cbUpdatedForm={this.updatedForm}
                formData={this.props.formData}
            ></AdjustableLoanDetailsSubFormModalForm>
        )
    }

    updatedForm(formData){
        this.setState({
            formData: formData
        })
    }

    renderFooter(){
        return (
            <React.Fragment>
                <Button type="primary" onClick={() => this.props.cbSave(this.state.formData)}>
                    {
                        this.props.formData.hasOwnProperty('id') && 
                        <React.Fragment>Update</React.Fragment>
                    }
                    {
                        !this.props.formData.hasOwnProperty('id') && 
                        <React.Fragment>Add</React.Fragment>
                    }
                </Button>{' '}
                <Button onClick={this.props.cbCancel}>Cancel</Button>
            </React.Fragment>
        )
    }

    render() {
        
        return (
            <Modal 
                width="80vw"
                centered
                visible={this.props.visible}
                footer={this.renderFooter()}
                onCancel={this.props.cbCancel}
            >
                {this.renderBody()}
            </Modal>
        )
    }
}


export default connect()(AdjustableLoanDetailsSubFormModal);