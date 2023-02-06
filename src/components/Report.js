import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Table, Divider, Tag, Button } from 'antd';

import './Report.css';
const arr = [{owner: 'abc', asset_name: 'def'}, {owner: 'abc', asset_name: 'def'}];

var instance = null;
class Report extends Component {

    constructor(props) {
        super(props);

        instance = this;

    }

    render() {
        const {rows} = this.props;
        return (
            <div>
                <div className="clearfix">
                    <h2 className="text-success float-left">{this.props.title}</h2>
                    {
                        typeof this.props.actions != 'undefined' ? this.props.actions.map( (action, aindex) => <Button key={aindex} type="primary" className="float-right" onClick={action.fnClick}>{action.title}</Button>) : null
                    }
                </div>
                <Table rowClassName={(rows, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} loading={false} dataSource={this.props.rows} columns={this.props.cols}  rowSelection={this.props.rowSelect} scroll={{x: this.props.scroll}}/>
            </div>
        )
    }
}



export default connect()(Report);

