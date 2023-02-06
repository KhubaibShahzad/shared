import React from 'react';

/* *** Antd Components *** */
import { Row, Col, Typography } from 'antd';

/* *** Custom Components *** */

/* *** Styles *** */
import './AllAssets.css';

/* *** Images *** */
import allAssetLogo from '../../../../assets/images/asset.png';

const { Text, Title } = Typography;

const AllAssets = ({ allAssetsValue }) => {
    return (
        <div style={{ margin: '20px 0'}}>
            <Row type="flex" justify="center">
                <Col span={10} className="all-assets-block">
                    <img src={allAssetLogo} alt="" style={{ height: '130px' }} /> 
                    <Row type="flex" justify="center" align="middle" style={{ flexDirection: 'column' }}>
                        <Text>All Assets</Text>
                        <Title level={4}>{allAssetsValue}</Title>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AllAssets;
