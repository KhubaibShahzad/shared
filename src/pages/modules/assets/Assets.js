import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col } from "antd";
import ROLES from "constants/roles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QL_ASSETS_LIST, QL_ASSETS_DELETE } from "../../../constants/queries";

import Report from "../../../components/Report";
import PageTitle from "components/layout/PageTitle";
import AssetDetails from "pages/reports/ReportAsset/modals/AssetDetails";
import AllAssets from "pages/reports/ReportAsset/modals/AllAssets";
import Income_Tax2 from "../../../assets/images/latest/Income-Tax2.png";
import { float2Currency } from "helpers/Utils";
import { Bar } from "react-chartjs-2";
import "./assets.css";

var fnMutationAssetsDelete = null;
var dataMutationAssetsDelete = null;

function HiddenHook() {
  [fnMutationAssetsDelete, { dataMutationAssetsDelete }] = useMutation(
    QL_ASSETS_DELETE
  );

  return <React.Fragment></React.Fragment>;
}

function LoadDBDataHook(props) {
  const {
    data,
    loading,
    error,
    refetch,
    networkStatus,
  } = useQuery(QL_ASSETS_LIST, { notifyOnNetworkStatusChange: true });

  if (props.dbReload) {
    console.log("reload..");
    refetch();
  }

  props.cbUpdateNetworkStatus(networkStatus);
  console.log("networkStatus:", networkStatus);
  if (data) {
    props.cbLoadDBData(networkStatus, data);
  }

  return <React.Fragment></React.Fragment>;
}

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenDelete: false,
      reload: true,

      total_assets: 0,
      dbLoaded: false,
      dbLoading: true,
      report_rows: [
        {
          asset_name: "Frank and Tracy House",
          account_type: "Individual",
          held_where: "Goldman Sachs Group Inc",
          monetary_value: "$721,000",
          value_date: "03/07/2019",
          liquid_asset: "No",
          taxability: "Taxable",
          taxability_distribution: "Capital Gains",
        },
        {
          asset_name: "Frank and Tracy Rental",
          account_type: "Individual",
          held_where: "Goldman Sachs Group Inc",
          monetary_value: "$721,000",
          value_date: "03/07/2019",
          liquid_asset: "No",
          taxability: "Taxable",
          taxability_distribution: "Capital Gains",
        },
        {
          asset_name: "Tracy's Car",
          account_type: "Joint",
          held_where: "Goldman Sachs Group Inc",
          monetary_value: "$721,000",
          value_date: "03/07/2019",
          liquid_asset: "No",
          taxability: "Taxable",
          taxability_distribution: "Capital Gains",
        },
      ],
      dbReload: false,
      networkStatus: 0,
    };

    this.fnAdd = this.fnAdd.bind(this);
    this.fnEdit = this.fnEdit.bind(this);
    this.fnView = this.fnView.bind(this);

    this.loadDBData = this.loadDBData.bind(this);
    this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
  }

  fnAdd() {
    this.props.history.push("/assets_new");
  }

  fnEdit(record) {
    this.props.history.push("/assets_edit/" + record.id);
  }

  fnView(record) {
    this.props.history.push("/assets_view/" + record.id);
  }

  fnDelete(record) {
    window.localStorage.setItem("assets_delete_id", record.id);
    this.setState({
      isOpenDelete: !this.state.isOpenDelete,
    });
  }

  confirmDelete = (e) => {
    let dbID = window.localStorage.getItem("assets_delete_id");
    if (dbID != null && dbID != "") {
      fnMutationAssetsDelete({ variables: { id: dbID } });
      this.setState({
        dbReload: false,
        isOpenDelete: false,
      });

      var instance = this;
      setTimeout(function () {
        instance.setState({
          dbReload: true,
          dbLoading: true,
        });
      }, 1000);
    } else {
      this.setState({
        isOpenDelete: false,
      });
    }
  };

  handleCancel = (e) => {
    this.setState({
      isOpenDelete: false,
    });
  };

  loadDBData(networkStatus, data) {
    console.log("loadDBData:", data);

    if (this.state.networkStatus == networkStatus) {
      return;
    }

    var report_rows = [];
    var total_assets = 0;

    for (var index = 0; index < data["assets"].length; index++) {
      var monetary_value = 0;
      if (data["assets"][index]["assetPerformance"] != null) {
        monetary_value =
          data["assets"][index]["assetPerformance"]["monetaryValue"] != null
            ? parseFloat(
                data["assets"][index]["assetPerformance"]["monetaryValue"]
              )
            : 0;
      }

      total_assets += monetary_value;
      report_rows.push({
        key: index,
        id: data["assets"][index]["id"],
        owner: data["assets"][index]["owner"],
        asset_name: data["assets"][index]["name"],
        account_type: data["assets"][index]["accountType"],
        held_where: data["assets"][index]["heldWhere"],
        monetary_value: float2Currency(monetary_value),
      });
    }

    var instance = this;
    setTimeout(function () {
      instance.setState({
        report_rows: report_rows,
        total_assets: total_assets,
        dbLoading: false,
        dbLoaded: true,
        dbReload: false,
      });
    }, 500);
  }

  updateNetworkStatus(networkStatus) {
    if (this.state.networkStatus != networkStatus) {
      var instance = this;
      setTimeout(function () {
        instance.setState({
          networkStatus: networkStatus,
        });
      }, 1000);
    }
  }

  render() {
    const navlinks = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: "/modules",
        title: "Modules",
      },
    ];

    var report_actions = [];
    if (this.props.user.role != ROLES.VIEW_ONLY) {
      report_actions = [
        {
          title: "Add",
          fnClick: this.fnAdd,
        },
      ];
    }

    // const report_cols = [
    //     {
    //         title: 'Owner',
    //         dataIndex: 'owner',
    //         key: 'owner'
    //     },
    //     {
    //       title: 'Name of Asset ',
    //       dataIndex: 'asset_name',
    //       key: 'asset_name'
    //     },
    //     {
    //       title: 'Account Type',
    //       dataIndex: 'account_type',
    //       key: 'account_type',
    //     },
    //     {
    //         title: 'Held Where',
    //         dataIndex: 'held_where',
    //         key: 'held_where',
    //       },
    //     {
    //       title: 'Monetary Value',
    //       dataIndex: 'monetary_value',
    //       key: 'monetary_value',
    //     },
    //     {
    //         title: '',
    //         key: 'id',
    //         render: (record) => {
    //             if(true){
    //                 return(
    //                     <span>
    //                         <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
    //                         <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEdit(record)}>Edit</a>
    //                         <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDelete(record)}>Delete</a>
    //                     </span>
    //                 )
    //             }
    //             else{
    //                 return (
    //                     <span>
    //                         <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
    //                     </span>
    //                 )
    //             }
    //         }
    //     },
    // ];

    const report_cols = [
      {
        title: "Name of Asset ",
        dataIndex: "asset_name",
        key: "asset_name",
      },
      {
        title: "Account Type",
        dataIndex: "account_type",
        key: "account_type",
      },
      {
        title: "Held Where",
        dataIndex: "held_where",
        key: "held_where",
      },
      {
        title: "Monetary Value",
        dataIndex: "monetary_value",
        key: "monetary_value",
      },
      {
        title: "Value as of Date",
        dataIndex: "value_date",
        key: "value_date",
      },
      {
        title: "This Asset is Liquid",
        dataIndex: "liquid_asset",
        key: "liquid_asset",
      },
      {
        title: "Taxability",
        dataIndex: "taxability",
        key: "taxability",
      },
      {
        title: "Taxability on distribution",
        dataIndex: "taxability_distribution",
        key: "taxability_distribution",
      },
    ];

    const barData = {
      labels: [
        "1. Testing Multiple dist to income",
        "Dist",
        "Adam's Dist",
        "Brand New Rental",
        "Dist Two",
        "Early WD",
        "Frank's Annuity",
      ],
      datasets: [
        {
          label: "",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [0, 50000, 100000, 150000, 0, 50000, 100000],
        },
      ],
    };

    return (
      <React.Fragment>
        {/* <HiddenHook /> */}
        {/* <LoadDBDataHook 
                    dbLoaded={this.state.dbLoaded}
                    dbReload={this.state.dbReload}
                    cbLoadDBData={this.loadDBData}
                    cbUpdateNetworkStatus={this.updateNetworkStatus}
                /> */}
        <div className="page-nav-history">
          {/* { 
                        navlinks.map((navlink, index) => {
                            return (
                                <span key={index}>
                                    <Link key={index} to={navlink.href} className="page-nav-link">
                                        {navlink.title}
                                    </Link>
                                    {index != (navlinks.length - 1) ? "/" : null}
                                </span>
                                
                            )                            
                        }) 
                    } */}
        </div>
        {this.props.user.role != ROLES.VIEW_ONLY && (
          <div className="top-btn-area">
            <Button type="primary" className="float-right" onClick={this.fnAdd}>
              Add
            </Button>
          </div>
        )}
        <PageTitle title="Asset Report" />

        <Row justify="center">
          <Col className="asset-title" span={24}>
            <div>
              <h4
                style={{ color: "black" }}
                className="text-center font-weight-bold"
              >
                Detailed listing of Assets
              </h4>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col className="asset-title" span={12}>
            <div>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight"
              >
                Client Name: Frank Jones
              </h5>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight"
              >
                Plan Nickname: First Plan
              </h5>
            </div>
          </Col>
          <Col className="asset-title" span={12}>
            <div>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight"
              >
                Spouse Name: Tracy Jones
              </h5>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight"
              >
                Today's Date: 03/24/2021
              </h5>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          {/* <Col span={24}>
            <div className="asset-title">
              <img src={Income_Tax2} height="50px" width="50px" />
            </div>
          </Col> */}
        </Row>

        <AllAssets allAssetsValue={float2Currency(this.state.total_assets)} />
        <Row
          type="flex"
          justify="center"
          style={{
            margin: "12px 0",
            padding: "16px",
            border: "1px solid #ddd",
            backgroundColor: "rgba(237, 237, 237, 0.40)",
          }}
        >
          <Bar
            data={barData}
            height={300}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </Row>
        <div className="fragment-assitance-received" style={{ marginTop: 20 }}>
          <PageTitle title="Asset Details" level={4} />
          <Report
            loading={false}
            cols={report_cols}
            rows={this.state.report_rows}
          ></Report>
        </div>
        <Modal
          title="Alert"
          visible={this.state.isOpenDelete}
          onOk={this.confirmDelete}
          onCancel={this.handleCancel}
        >
          <p>Are you sure to delete?</p>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData

  };
};
export default connect(mapStateToProps, null)(Assets);
