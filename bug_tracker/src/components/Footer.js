import React, { Component } from "react";
import styled from "styled-components";

/* footer formatting */
const Wrapper = styled.div`
position: fixed;
left: 0;
bottom: 0;
width: 100%;
    background-color: #222222;
   font-size: 12px;
   font-weight: normal;
   background-color: black;
   background-blend-mode: screen;
  //  margin: 0 auto !important;
   text-align: center !important;
   width: 100% !important;
    @media (min-width: 765px) {
    // height:70px;
 `;
const Title = styled.div`
   padding:5px;
   color:white;
   font-size: 12px;
   font-weight: normal;
   text-align:center;
   @media (min-width: 765px) {
    font-size:15px;
    padding:5px;
  
   
 `;

export default class Footer extends Component {
  render() {
    return (
      <Wrapper>
        <Title>
          Bug Tracker Created by Manisha Chhibber. All rights reserved.
        </Title>
      </Wrapper>
    );
  }
}
