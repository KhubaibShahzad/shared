import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col } from "antd";
import ROLES from "constants/roles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  QL_INSURANCE_PRODUCT_LIST,
  QL_INSURANCE_PRODUCT_DELETE,
} from "../../../constants/queries";

import Report from "../../../components/Report";

import PageTitle from "components/layout/PageTitle";
import SubTitle from "components/layout/SubTitle";
import ReportInfoRow from "components/shared/ReportInfo";
import Synopsis from "components/layout/Synopsis/Synopsis";
import TableReport from "components/layout/TableReport";
import { Pie, Doughnut } from "react-chartjs-2";

import { float2Currency } from "helpers/Utils";

var fnMutationInsuranceProductDelete = null;
var dataMutationInsuranceProductDelete = null;

function HiddenHook() {
  [
    fnMutationInsuranceProductDelete,
    { dataMutationInsuranceProductDelete },
  ] = useMutation(QL_INSURANCE_PRODUCT_DELETE);

  return <React.Fragment></React.Fragment>;
}

function LoadDBDataHook(props) {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    QL_INSURANCE_PRODUCT_LIST,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

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

const dataDonught = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

class Insurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpenDelete: false,
      reload: true,
      rows_overall: [
        {
          key: "1",
          title: "Investments",
          policies: "",
          annual_premium: "",
          cash_value: "",
        },
        {
          key: "2",
          title: "Protection",
          policies: "",
          annual_premium: "",
          cash_value: "",
        },
        {
          key: "3",
          title: "Total",
          policies: "",
          annual_premium: "",
          cash_value: "",
        },
      ],
      dbLoaded: false,
      dbLoading: false,
      rows_investments: [],
      rows_risk: [],
      dbReload: false,
      networkStatus: 0,
    };

    this.fnAdd = this.fnAdd.bind(this);
    this.fnEdit = this.fnEdit.bind(this);
    this.fnView = this.fnView.bind(this);
    this.loadDBData = this.loadDBData.bind(this);
    this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
  }

  componentDidMount() {}

  fnAdd() {
    this.props.history.push("/insurance_new");
  }

  fnEdit(record) {
    this.props.history.push("/insurance_edit/" + record.id);
  }

  fnView(record) {
    this.props.history.push("/insurance_view/" + record.id);
  }

  fnDelete(record) {
    window.localStorage.setItem("insurance_product_delete_id", record.id);
    this.setState({
      isOpenDelete: !this.state.isOpenDelete,
    });
  }

  confirmDelete = (e) => {
    let dbID = window.localStorage.getItem("insurance_product_delete_id");
    if (dbID != null && dbID != "") {
      fnMutationInsuranceProductDelete({ variables: { id: dbID } });
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

    var insuranceProducts = data["insuranceProducts"];

    var investments_policies = 0;
    var investments_annual_premium = 0;
    var investments_cash_value = 0;

    var risk_policies = 0;
    var risk_annual_premium = 0;
    var risk_cash_value = 0;

    var total_policies = 0;
    var total_annual_premium = 0;
    var total_cash_value = 0;

    var rows_investments = [];
    var rows_risk = [];
    for (var index = 0; index < insuranceProducts.length; index++) {
      switch (insuranceProducts[index]["productInformation"]["insuranceType"]) {
        case "Annuity - Fixed":
        case "Annuity - Fixed Indexed":
        case "Final Expense":
        case "Term - 5 Year":
        case "Annuity - Defered":
        case "Annuity - Immediate":
        case "Annuity - Variable":
        case "Term - 10 Year":
        case "Term -  30 Year":
        case "Variable Life":
        case "Whole Life":
        case "Term - 20 year":
        case "Universal Life":
        case "Variable Universal Life":
        case "Term - 25 Year":
        case "Term - 15 Year":
          investments_policies++;
          var annual_premium = 0;

          if (
            insuranceProducts[index]["financialInformation"][
              "monthlyPremium"
            ] != null
          ) {
            annual_premium =
              parseFloat(
                insuranceProducts[index]["financialInformation"][
                  "monthlyPremium"
                ]
              ) * 12;
          }
          if (
            insuranceProducts[index]["financialInformation"]["annualPremium"] !=
            null
          ) {
            annual_premium = parseFloat(
              insuranceProducts[index]["financialInformation"]["annualPremium"]
            );
          }

          investments_annual_premium += annual_premium;

          var face_value = 0;
          face_value =
            insuranceProducts[index]["financialInformation"]["faceValue"] !=
            null
              ? parseFloat(
                  insuranceProducts[index]["financialInformation"]["faceValue"]
                )
              : 0;
          total_cash_value += face_value;

          rows_investments.push({
            key: index,
            id: insuranceProducts[index]["id"],
            insurance_products:
              insuranceProducts[index]["productInformation"]["insuranceType"],
            insured: insuranceProducts[index]["productInformation"]["insured"],
            carrier: insuranceProducts[index]["productInformation"]["carrier"],
            end_date:
              insuranceProducts[index]["productInformation"]["policyEndDate"],
            annual_premium: float2Currency(annual_premium),
            cash_value: float2Currency(
              insuranceProducts[index]["financialInformation"]["cashValue"]
            ),
            monthly_income: float2Currency(
              insuranceProducts[index]["financialInformation"]["monthlyPremium"]
            ),
            death_benefit: float2Currency(face_value),
          });

          break;
        case "Guaranteed Issue":
        case "Other":
        case "Dental":
        case "No Medical Exam":
        case "Speciality and Misc":
        case "Renters":
        case "Flood":
        case "Automobile":
        case "Fire":
        case "Earthquake":
        case "Umbrella":
        case "Homeowners":
        case "Long Term Care":
        case "Long Term Disability":
        case "Long Term Care - Hybrid":
          risk_policies++;

          var annual_premium = 0;

          if (
            insuranceProducts[index]["financialInformation"][
              "monthlyPremium"
            ] != null
          ) {
            annual_premium =
              parseFloat(
                insuranceProducts[index]["financialInformation"][
                  "monthlyPremium"
                ]
              ) * 12;
          }
          if (
            insuranceProducts[index]["financialInformation"]["annualPremium"] !=
            null
          ) {
            annual_premium = parseFloat(
              insuranceProducts[index]["financialInformation"]["annualPremium"]
            );
          }

          risk_annual_premium += annual_premium;

          var face_value = 0;
          face_value =
            insuranceProducts[index]["financialInformation"]["faceValue"] !=
            null
              ? parseFloat(
                  insuranceProducts[index]["financialInformation"]["faceValue"]
                )
              : 0;
          total_cash_value += face_value;

          rows_risk.push({
            key: index,
            id: insuranceProducts[index]["id"],
            insurance_products:
              insuranceProducts[index]["productInformation"]["insuranceType"],
            insured: insuranceProducts[index]["productInformation"]["insured"],
            carrier: insuranceProducts[index]["productInformation"]["carrier"],
            end_date:
              insuranceProducts[index]["productInformation"]["policyEndDate"],
            deductible:
              insuranceProducts[index]["financialInformation"]["deductible"],
            annual_premium: float2Currency(annual_premium),
            liability_coverage: float2Currency(face_value),
          });
          break;
        default:
          break;
      }
    }

    total_policies = investments_policies + risk_policies;
    total_annual_premium = investments_annual_premium + risk_annual_premium;
    total_cash_value = investments_cash_value + risk_cash_value;

    var rows_overall = this.state.rows_overall;
    rows_overall[0]["policies"] = investments_policies;
    rows_overall[0]["annual_premium"] = float2Currency(
      investments_annual_premium
    );
    rows_overall[0]["cash_value"] = float2Currency(investments_cash_value);

    rows_overall[1]["policies"] = risk_policies;
    rows_overall[1]["annual_premium"] = float2Currency(risk_annual_premium);
    rows_overall[1]["cash_value"] = float2Currency(risk_cash_value);

    rows_overall[2]["policies"] = total_policies;
    rows_overall[2]["annual_premium"] = float2Currency(total_annual_premium);
    rows_overall[2]["cash_value"] = float2Currency(total_cash_value);

    var instance = this;
    setTimeout(function () {
      instance.setState({
        rows_overall: rows_overall,
        rows_investments: rows_investments,
        rows_risk: rows_risk,
        // dbLoading: false,
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
        // {
        //     title: 'Add',
        //     fnClick: this.fnAdd
        // }
      ];
    }

    const cols_overall = [
      {
        title: "",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Policies",
        dataIndex: "policies",
        key: "policies",
      },
      {
        title: "Annual Premium",
        dataIndex: "annual_premium",
        key: "annual_premium",
      },
      {
        title: "Cash Value",
        dataIndex: "cash_value",
        key: "cash_value",
      },
    ];

    const cols_investments = [
      {
        title: "Insurance Products",
        dataIndex: "insurance_products",
        key: "insurance_products",
      },
      {
        title: "Insured",
        dataIndex: "insured",
        key: "insured",
      },
      {
        title: "Carrier",
        dataIndex: "carrier",
        key: "carrier",
      },
      {
        title: "Policy #",
        dataIndex: "policy",
        key: "policy",
      },
      {
        title: "End Date",
        dataIndex: "end_date",
        key: "end_date",
      },
      {
        title: "Year Premium",
        dataIndex: "year_premium",
        key: "year_premium",
      },
      {
        title: "Cash Value",
        dataIndex: "cash_value",
        key: "cash_value",
      },
      {
        title: "Monthly Income",
        dataIndex: "monthly_income",
        key: "monthly_income",
      },
      {
        title: "Death Benefit",
        dataIndex: "death_benefit",
        key: "death_benefit",
      },
      {
        title: "",
        key: "id",
        render: (record) => {
          if (this.props.user.role != ROLES.VIEW_ONLY) {
            return (
              <span>
                <a
                  className="report-action-btn report-action-btn--view"
                  onClick={() => this.fnView(record)}
                >
                  View
                </a>
                <a
                  className="report-action-btn report-action-btn--edit"
                  onClick={() => this.fnEdit(record)}
                >
                  Edit
                </a>
                <a
                  className="report-action-btn report-action-btn--delete"
                  onClick={() => this.fnDelete(record)}
                >
                  Delete
                </a>
              </span>
            );
          } else {
            return (
              <span>
                <a
                  className="report-action-btn report-action-btn--view"
                  onClick={() => this.fnView(record)}
                >
                  View
                </a>
              </span>
            );
          }
        },
      },
    ];

    const cols_contact_info = [
      {
        title: "Insurance Products",
        dataIndex: "insurance_products",
        key: "insurance_products",
      },
      {
        title: "Agent Name",
        dataIndex: "agent_name",
        key: "agent_name",
      },
      {
        title: "Company Name",
        dataIndex: "company_name",
        key: "company_name",
      },
      {
        title: "Policy #",
        dataIndex: "policy",
        key: "policy",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
    ];

    const cols_risk = [
      {
        title: "Insurance Products",
        dataIndex: "insurance_products",
        key: "insurance_products",
      },
      {
        title: "Insured",
        dataIndex: "insured",
        key: "insured",
      },
      {
        title: "Company Name",
        dataIndex: "company_name",
        key: "company_name",
      },
      {
        title: "Policy #",
        dataIndex: "policy",
        key: "policy",
      },
      {
        title: "End Date",
        dataIndex: "end_date",
        key: "end_date",
      },
      {
        title: "Deductible",
        dataIndex: "deductible",
        key: "deductible",
      },
      {
        title: "Year Premium",
        dataIndex: "Year_premium",
        key: "Year_premium",
      },
      {
        title: "Liability Coverage",
        dataIndex: "liability_coverage",
        key: "liability_coverage",
      },
      {
        title: "",
        key: "id",
        render: (record) => {
          if (this.props.user.role != ROLES.VIEW_ONLY) {
            return (
              <span>
                <a
                  className="report-action-btn report-action-btn--view"
                  onClick={() => this.fnView(record)}
                >
                  View
                </a>
                <a
                  className="report-action-btn report-action-btn--edit"
                  onClick={() => this.fnEdit(record)}
                >
                  Edit
                </a>
                <a
                  className="report-action-btn report-action-btn--delete"
                  onClick={() => this.fnDelete(record)}
                >
                  Delete
                </a>
              </span>
            );
          } else {
            return (
              <span>
                <a
                  className="report-action-btn report-action-btn--view"
                  onClick={() => this.fnView(record)}
                >
                  View
                </a>
              </span>
            );
          }
        },
      },
    ];

    const investmentsData = {
      labels: ["Whole Life"],
      datasets: [
        {
          data: [300],
          backgroundColor: ["#FF6384"],
          hoverBackgroundColor: ["#FF6384"],
        },
      ],
    };

    const protectionData = {
      labels: ["Term 25 Year"],
      datasets: [
        {
          data: [300],
          backgroundColor: ["#FF6384"],
          hoverBackgroundColor: ["#FF6384"],
        },
      ],
    };

    return (
      <React.Fragment>
        <HiddenHook />
        <LoadDBDataHook
          dbLoaded={this.state.dbLoaded}
          dbReload={this.state.dbReload}
          cbLoadDBData={this.loadDBData}
          cbUpdateNetworkStatus={this.updateNetworkStatus}
        />
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
        <PageTitle title="Insurance Report" />

        <Row justify="center">
          <div>
            <h5
              style={{ color: "black" }}
              className="text-center font-weight-bold"
            >
              Synopsis: Analysis of scenarios for optimum time for each person
              to take their benefits
            </h5>
          </div>
        </Row>

        <Row justify="center">
          <Col className="asset-title" span={12}>
            <div>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight mb-3 mt-2"
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
                className="text-center font-weight mb-3 mt-2"
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

        <Row type="flex" gutter={[20, 0]} style={{ margin: "30px 0 40px" }}>
          <Col span={10}>
            <PageTitle title="Monthly Insurance Premium" level={4} />
            {this.state.dbLoading && <p>Loading...</p>}
            {!this.state.dbLoading && (
              //   <Pie data={investmentsData} height={200} />
              <Doughnut data={dataDonught} />
            )}
          </Col>
          <Col span={14}>
            {this.state.dbLoading && <p>Loading...</p>}
            {!this.state.dbLoading && (
              <TableReport rows={this.state.rows_overall} cols={cols_overall} />
            )}
          </Col>
          {/* <Col span={7}>
                        <PageTitle title="Protection" level={4} />
                        {
                            this.state.dbLoading && <p>Loading...</p>
                        }
                        {
                            !this.state.dbLoading &&
                            <Pie data={protectionData} height={200} />
                        }
                        
                    </Col> */}
        </Row>

        <div className="fragment-assitance-received">
          <PageTitle title={"Insurance Policies as Investments"} level={4} />
          <SubTitle
            subTitle={
              "Annuity, Final Expense, Guaranted Issue, Long Term Care Hybrid, Universal Life, Variable, Whole Life"
            }
          />
          <Report
            loading={this.state.dbLoading}
            cols={cols_investments}
            rows={this.state.rows_investments}
          ></Report>
          <PageTitle title={"Insurance Policies - Risk Only"} level={4} />
          <SubTitle
            subTitle={
              "Automobile, Long Term Care, Long Term Disability, Term, Umbrella, Homeowners, Fire, Flood, Earthquake"
            }
          />
          <Report
            loading={this.state.dbLoading}
            cols={cols_risk}
            rows={this.state.rows_risk}
          ></Report>
          <PageTitle title={"Insurance Contact Info"} level={4} />
          {/* <SubTitle
            subTitle={
              "Final Expense, Guaranteed Issue, Automobile, Long Term Care, Long Term Disability, Term, Umbrella, Homeowners, Fire, Flood, Earthquake"
            }
          /> */}
          <Report
            loading={this.state.dbLoading}
            cols={cols_contact_info}
            rows={this.state.rows_risk}
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
export default connect(mapStateToProps, null)(Insurance);
