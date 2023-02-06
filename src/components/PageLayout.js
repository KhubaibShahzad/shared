import React, { Component, Suspense } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { Icon, Row, Col } from "antd";

import { Link, withRouter } from "react-router-dom";
import { isUserAuthenticated } from "../helpers/authUtils";
import profilePic from "../assets/images/users/user-1.jpg";
import logo from "../assets/images/asset-planet-background.png";
import dashboard from "../assets/images/dashboard.png";
import modules from "../assets/images/modules.png";
import goals from "../assets/images/goals-question.png";
import client from "../assets/images/client.png";
import menu from "../assets/images/menu-icon3.png";
import reports from "../assets/images/reports.png";
import dead from "../assets/images/dead.png";
import performace from "../assets/images/performance.png";
import schedule from "../assets/images/schedule.png";
import organizer from "../assets/images/organized-Bliss.png";
import form from "../assets/images/form.png";
import insurance from "../assets/images/insurance.png";
import { isMobile } from "react-device-detect";
import { MODULE_API } from "../apis";
import { setCollection } from "../redux/inventory/actions";

import ROLES from "constants/roles";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("./Topbar"));
const Navbar = React.lazy(() => import("./Navbar"));
const RightSidebar = React.lazy(() => import("./RightSidebar"));
const Footer = React.lazy(() => import("./Footer"));
const loading = () => <div className="text-center"></div>;

const RightSidebarContent = (props) => {
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          src={profilePic}
          alt="user-img"
          title="Nik Patel"
          className="rounded-circle img-fluid"
        />
        <a href="/" className="user-edit">
          <i className="mdi mdi-pencil"></i>
        </a>
      </div>

      <h5>{props.user && <a href="/">{props.user.username}</a>}</h5>
      <p className="text-muted mb-0">
        <small>Founder</small>
      </p>
    </div>
  );
};

class PageLayout extends Component {
  constructor(props) {
    super(props);

    this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      isMenuOpened: true,
      modules: [],
    };
  }

  componentDidMount() {
    let isAuthTokenValid = true;
    switch (this.props.route.name) {
      case "Login":
      case "Logout":
      case "Forget Password":
      case "Register":
      case "Confirm":
        break;
      default:
        isAuthTokenValid = isUserAuthenticated();
    }

    if (!isAuthTokenValid) {
      window.location.href = "/login";
    }

    if (isMobile) {
      this.setState({ isMenuOpened: !this.state.isMenuOpened });
    }
  }

  get = async (name) => {
    try {
      const { dispatch } = this.props;
      let attributes = await MODULE_API.fetchAttributes(`${name}_item`);
      if (attributes) {
        dispatch(setCollection(attributes));
      }
    } catch (error) {
      console.log("e ", error);
    }
  };

  signOut(e) {
    // e.preventDefault();
    localStorage.removeItem("userLoginToken")
  }

  /**
   * toggle Menu
   */
  toggleMenu = (e) => {
    e.preventDefault();
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };

  /**
   * Toggle right side bar
   */
  toggleRightSidebar = () => {
    document.body.classList.toggle("right-bar-enabled");
  };

  render() {
    const { inventory } = this.props;

    // get the child view which we would like to render
    const children = this.props.children || null;
    let wrapperClassName = "";

    if (this.state.isMenuOpened) {
      wrapperClassName = "left-sidebar--opened";
    } else {
      wrapperClassName = "left-sidebar--collapsed";
    }

    let isAuthTokenValid = true;
    if (
      this.props.route.name == "Login" ||
      this.props.route.name == "Logout" ||
      this.props.route.name == "Forget Password" ||
      this.props.route.name == "Register" ||
      this.props.route.name == "Confirm"
    ) {
      wrapperClassName = wrapperClassName + " left-side--hidden";
    } else {
      isAuthTokenValid = isUserAuthenticated();
    }

    return (
      <React.Fragment>
        {isAuthTokenValid && (
          <React.Fragment>
            <div id="wrapper" className={wrapperClassName}>
              <div
                style={{
                  height: "70px",
                  background: "#F9F9F9",
                }}
              >
                <Row
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Col
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      width: "33%",
                    }}
                  ></Col>
                  <Col
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      width: "33%",
                    }}
                  >
                    <img src={logo} height="45px" />
                  </Col>
                  <Col
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent:"center",
                      flexDirection: "row-reverse",
                      paddingRight:"15px",
                      width: "33%",
                    }}
                  >
                    <div style={{ marginRight: "20px" }}>
                      <Icon
                        type="check-circle"
                        style={{
                          padding: "5px",
                          fontSize: "22px",
                          color: "green",
                        }}
                      />
                      <Icon
                        type="bell"
                        style={{ padding: "5px", fontSize: "22px" }}
                      />
                      <Icon
                        type="user"
                        style={{ padding: "5px", fontSize: "22px" }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="left-side-menu">
                <div
                  style={{
                    
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <span
                    className="left-side-collapse-icon-custom"
                    onClick={this.toggleMenu}
                  >
                    <i className="fe-menu"></i>
                    {/* <img src={logo} className="bg-logo" /> */}
                  </span>
                  {/* <div className="crumb-left-side-menu">
                    <div onClick={this.toggleMenu}>
                      <img src={menu} height="20px" width="25px" />
                    </div> */}
                  {/* <span
                      className="left-side-collapse-icon"
                      onClick={this.toggleMenu}
                    >
                      <img src={menu} height="20px" width="25px" />
                    </span> */}
                  {/* </div> */}
                </div>
                <div id="sidebar-menu" className="active">
                  <div
                    style={{
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "center",
                    }}
                  >
                    <Icon
                      type="user"
                      style={{
                        paddingLeft: "25px",
                        fontSize: "24px",
                        color: "black",
                      }}
                    />
                    <span className="side-menu-title ml-2">USERNAME</span>
                  </div>
                  {/* <div className="text-center">
                    <span
                      className="left-side-collapse-icon"
                      onClick={this.toggleMenu}
                    >
                      <img src={logo} className="img-logo" />
                    </span>
                  </div> */}
                  <ul className="metismenu in nav" id="side-menu">
                    <li>
                      <Link
                        to="/dashboard"
                        className="side-nav-link-re nav-link"
                      >
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={dashboard} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Dashboard
                          </span>
                        </div>
                      </Link>

                      <Link to="/client_info" className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={client} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Client Information
                          </span>
                        </div>
                      </Link>

                      <Link to="/organizer" className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={organizer} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Organizer
                          </span>
                        </div>
                      </Link>

                      <Link to="/planner" className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={form} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">Planner</span>
                        </div>
                      </Link>

                      <Link to="/protector" className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={insurance} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Protector
                          </span>
                        </div>
                      </Link>

                      <Link to="/schedules" className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={reports} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Reports / Schedules
                          </span>
                        </div>
                      </Link>

                      <Link to="/inventory" className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={dashboard} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Inventory
                          </span>
                        </div>
                      </Link>

                      {/* <Link to="/faq" className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={dashboard} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            FAQ's
                          </span>
                        </div>
                      </Link> */}

                      {/* {inventory.map((module, index) => {
                        if (module.enable)
                          return (
                            <Link
                              onClick={() => {
                                this.get(module.name);
                              }}
                              to={`/collection/${module.name}`}
                              className="side-nav-link-ref"
                              key={index}
                            >
                              <div className="side-menu-block">
                                <div className="side-menu-image-background">
                                  <img src={form} className="img-icon" />
                                </div>
                                <span className="side-menu-title ml-2">
                                  {module.name}
                                </span>
                              </div>
                            </Link>
                          );
                      })} */}

                      <Link onClick={this.signOut} to="/login"  className="side-nav-link-ref">
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={dashboard} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Logout
                          </span>
                        </div>
                      </Link>

                      {/* <Link to="/login" className="side-nav-link-ref">
                        <span className="side-menu-title ml-2">Logout</span>
                      </Link>  */}

                      {/* <Link to="/friends-family" className="side-nav-link-ref">
                        <span className="side-menu-title ml-2">Test Mods</span>
                      </Link> */}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-page">
             <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom justify-content-between d-none">
                  <span
                    className="left-side-collapse-icon"
                    onClick={this.toggleMenu}
                  >
                    <i className="fe-menu"></i>
                    {/* <img src={logo} className="bg-logo" /> */}
                  </span>
                </nav>
                <div className="content">
                  {/* <Container fluid> */}
                  <Suspense fallback={loading()}>{children}</Suspense>
                  {/* </Container> */}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData,
    inventory: state.rootReducer.inventory.inventories

    // inventory: state.Inventory.inventories,
  };
};
export default connect(mapStateToProps, null)(PageLayout);
