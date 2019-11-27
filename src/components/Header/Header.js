import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerNav from '../DrawerNav/DrawerNav';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
            <img className="header-image" src="images/sun-icon.png"/>
            <h2 className="header-title">Volunteer Twin Cities</h2>
            <DrawerNav dispatch={this.props.dispatch}/>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Header);
