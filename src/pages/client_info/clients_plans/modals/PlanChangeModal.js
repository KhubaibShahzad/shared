import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Select, Button, Row, Col } from 'antd';

const { Option } = Select;

class PlanChangeModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <div>
                <Row>
                    <Col span={12}>
                    Plan
                    </Col>
                    <Col span={12}>
                        <Select
                            placeholder="-Select-"
                            style={{ width: 120 }} 
                        >
                            <Option value="plan_1">1 - Firt Plan</Option>
                            <Option value="plan_2">2 - Plan 2</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }

    renderFooter(){
        return (
            <div>
                <Button type="primary">Submit</Button>
            </div>
        )
    }

    render() {
        
        return (
            <ReportModal
                isOpen={this.props.isOpen}
                title="Change Client/Plan"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(PlanChangeModal);