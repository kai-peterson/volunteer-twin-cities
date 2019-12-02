import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DrawerNav from '../DrawerNav/DrawerNav';
import './Header.css';

class Header extends Component {

    handleClick = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="header-container">
                {/* <div className="header-inner-container"> */}
                    <img className="header-image" src="images/sun-icon.png" alt="sun icon logo" />
                    <h3 onClick={this.handleClick} className="header-title">VOLUNTEER TWIN CITIES</h3>
                    <DrawerNav dispatch={this.props.dispatch} />
                {/* </div> */}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps)(Header));
