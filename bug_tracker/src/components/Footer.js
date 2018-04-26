import React, { Component } from 'react';
import styled from 'styled-components';


/* footer formatting */
const Wrapper = styled.div`
    background-color: #222222;
    position:fixed;
   font-size: 12px;
   font-weight: normal;
   right: 0;
   bottom: 0;
   left: 0;
   background-color: black;
   margin: 0 auto !important;
 text-align: center !important;
 width: 100% !important;
 `
const Title = styled.div`
   padding:5px;
   color:white;
   font-size: 12px;
   font-weight: normal;
   text-align:center;
   
 `

 

export default class Footer
 extends Component {
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