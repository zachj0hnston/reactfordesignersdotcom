import styled from 'styled-components'

export const Container = styled.div`
    z-index: 100;
    position: fixed;
    overflow: hidden;
    top: 12px;
    left: 12px;
    width: calc(540px - 24px);
    border-radius: 8px;
    background: white;
    box-shadow: 0px 5px 15px 0px hsla(0, 0%, 0%, 0.10);
    padding-top: ${props => props.home ? '0' : '64px'};
    height: ${props => props.open ? 'auto' : '64px'};

    svg {
      position: absolute;
      top: ${props => props.open ? '25px' : '27px'};
      right: 27px;
      z-index: 20;
      fill: rgba(0,0,0,0.2);
      transform: ${props => props.open ? 'rotate(180deg)' : ''};
      opacity: ${props => props.home ? '0' : '1'};
    }
`

export const NavItem = styled.a`
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    text-decoration: none;
    border-bottom: 0.5px solid rgba(0,0,0,0.1);

    &:hover {
      color: inherit;
    }

    &.active {
      position: absolute;
      top: 0;
      background: white;
      z-index: 10;
    }
`

export const NavItemIcon = styled.div`
    width: 40px;
    height: 40px;
    margin-left: 16px;
    margin-right: 12px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset;
    background-image: url(${props => props.imageURL});
    background-size: 100% auto;
`

export const NavItemTitle = styled.div`
    flex: 1 0;
    font-family: "SFUIText-Bold", "SF UI Text", sans-serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
`

export const HeaderStoreLink = styled.a`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.2;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
`