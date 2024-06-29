import { useContext } from 'react'
import Header from './Header'
import styled from '@emotion/styled'

const LayoutWrapper = styled.div`
  &.overlay {
    overflow: hidden;
    :before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vw;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
  }
`

const LayoutContainer = styled.section`
  display: flex;
  justify-content: center;
  .content {
    position: relative;
    margin-top: -60px;
    background: white;
    width: 90vw;
    max-width: 1200px;
    min-height: 650px;
    border-radius: 7px;
    margin-bottom: 32px;
    padding: 16px;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.04), 0px 2px 2px rgba(0, 0, 0, 0.06),
      0px 4px 8px rgba(0, 0, 0, 0.04);
    .notification {
      position: absolute;
      bottom: -35px;
      width: 100%;
      left: 0;
      padding: 8px;
      &:has(.success) {
        background: #ccebd6;
      }
      &:has(.error) {
        background: #ffdede;
      }
      > span {
        font-family: monospace;
        line-height: 1.4;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        button {
          font-size: 12px;
          color: #666;
          &.confirm {
            color: #e72c2c;
          }
        }
      }
      .success {
        color: #00a032;
      }

      .error {
        color: #e72c2c;
      }
    }
  }
`

const Layout = ({ children }) => {

  return (
    <LayoutWrapper className={`layout ${''}`}>
      <Header />
      <LayoutContainer>
        <div className='content'>{children}</div>
      </LayoutContainer>
    </LayoutWrapper>
  )
}

export default Layout
