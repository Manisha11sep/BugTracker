import React, { Component } from 'react';

import SearchStyle from './../style/SearchStyle.css'

import SearchIcon from 'react-icons/lib/md/search';


export default class Search extends Component {
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search " />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}