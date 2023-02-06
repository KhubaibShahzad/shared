import React, { Component } from 'react';

import { Input, Icon } from 'antd';

class Email extends Component {    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <Input 
                style={this.props.style}
                addonBefore={<Icon type="mail" />} 
                name={this.props.name}
                size={'large'}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
                value={this.props.value}
            />
        );
    }
}

export default Email;