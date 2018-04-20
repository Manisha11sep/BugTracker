import React, { Component } from 'react';
import CompanyIcon from 'react-icons/lib/md/filter-hdr';
import ProfileIcon from 'react-icons/lib/md/person-outline';

import HeaderStyle from './../style/HeaderStyle.css';

import Search from './Search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Header extends Component {
  render() {
    return (
      <section className="Header__parent">
        <section className="Header__content">


          {/* Displays the search bar */}
          <div className="Header__right">
            <Search />

            {/* Displays the profile icon */}
            <div className="Header__profile">
              <ProfileIcon />
            </div>
          </div>

        </section>
      </section>
    )
  }
}