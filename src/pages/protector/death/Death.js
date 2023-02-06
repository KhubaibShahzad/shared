import React, { Component } from 'react';
import { Button } from 'antd';
import BreadCrumb from '../../../components/BreadCrumb';

class Death extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div style={{
          marginTop: '40px'
        }}></div>
        {/* <BreadCrumb /> */}
        <div className='top-btns-container'>
          <Button
            type='primary'
            onClick={() => this.props.history.push('/death/create')}
          >
            Add Death
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Death;
