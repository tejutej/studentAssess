import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.header`
  height: 150px;
  background: #daecff;
  padding: 0 24px;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #cbdff4;
  .content {
    height: 66px;
    width: 100%;
    max-width: 1400px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dymensions-logo {
      width: 180px;
    }
    h1 {
      font-size: 18px;
      font-weight: normal;
      color: #495b6d;
      margin-left: 80px;
      cursor: pointer;
      position: relative;
      &.demo::before {
        content: 'demo';
        position: relative;
        top: -8px;
        left: 2px;
        font-size: 10px;
        color: #495b6d;
        background: #fff;
        padding: 0 4px;
        border-radius: 50px;
        border: 1px solid #495b6d;
        margin-right: 6px;
        text-transform: uppercase;
        line-height: 1;
        vertical-align: middle;
      }
    }
  }
`

const Header = () => {
  return (
    <StyledHeader className='app-header'>
      <div className='content'>
          <span>Teacher Screen</span>
      </div>
    </StyledHeader>
  )
}

export default Header
