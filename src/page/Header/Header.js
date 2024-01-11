import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';
import config from '../../configRoute';
const Header = () => {
    return (
        <div className="containerHeader">
            <div className="topcontainer">
                {/* <div className="topleft"> */}
                {/* <NavLink to={config.routes.home}>
                    <h1>ATQ</h1>
                </NavLink> */}
                <h1>SHOP CÂY CẢNH-ADMIN</h1>

                {/* <button>
                    <img className="imgprofile" src={require('../image/profile (1).png')} alt="profile" />
                </button> */}
                {/* </div> */}
            </div>
        </div>
    );
};
export default Header;