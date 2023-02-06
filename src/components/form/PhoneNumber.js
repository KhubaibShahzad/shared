import React, { Component } from "react";

import { Input, Select, Icon } from "antd";

const { Option } = Select;

class PhoneNumber extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Input
        addonBefore={
          <Icon
            type="phone"
            style={{ position: "relative", top: "-3px", marginRight: "5px" }}
          />
        }
        style={this.props.style ? this.props.style : { width: "100%" }}
        size={"large"}
        name={this.props.name}
        onChange={this.props.onChange}
        disabled={this.props.disabled}
        // value={this.props.value}
      />
    );
  }
}

export default PhoneNumber;
