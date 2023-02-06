import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { BlockLink } from '../../components/Animations';
import assets from '../../assets/images/asset.png';
import liabilities from '../../assets/images/debt.png';
import insurance from '../../assets/images/insurance.png';
import income from '../../assets/images/contributions.png';
import assistance from '../../assets/images/savings.png';
import budget from '../../assets/images/calculator.png';
import PageTitle from 'components/layout/PageTitle';

class Modules extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const block_links = [
      {
        href: '/assets',
        title: 'Assets',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: assets,
      },
      {
        href: '/liabilities_credit',
        title: 'Liabilities and Credit',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: liabilities,
      },

      {
        href: '/insurance',
        title: 'Insurance Products',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: insurance,
      },
      {
        href: '/income',
        title: 'Income',
        visible: true,
        img: income,
      },
      {
        href: '/assistance/create',
        title: 'Assistance',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: assistance,
      },
      {
        // href: '/budget',
        href: '/budget',
        title: 'Budget',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: budget,
      },
      //            {
      //                href: '/social_security',
      //                title: 'Social Security',
      //                visible: (this.props.user.role == ROLES.FREE_APP_SUITE) ? false : true
      //            }
    ];

    return (
      <React.Fragment>
        <div className='page-title'>
          <div style={{ marginBottom: '5em' }}>
            <PageTitle title='Organizer' />
          </div>
        </div>
        <div className='module-blocks'>
          {block_links.map((blocklink, bindex) => {
            if (blocklink.visible) {
              return (
                <BlockLink
                  key={bindex}
                  img={blocklink.img}
                  className='module-block-link'
                  link={blocklink.href}
                  title={blocklink.title}
                />
              );
            } else {
              return <React.Fragment></React.Fragment>;
            }
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData

  };
};
export default connect(mapStateToProps, null)(Modules);
