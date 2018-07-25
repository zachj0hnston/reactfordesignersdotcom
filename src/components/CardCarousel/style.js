import styled from 'styled-components'

export const Outer = styled.div`
  position: relative;
  width: 130%;
  margin: ${props => props.theme.unit.l} 0;
  margin-left: -15%;

  @media all and (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`

export const Inner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 -${props => props.theme.unit.default};

  & > div {
    margin: 0 ${props => props.theme.unit.default};

    @media all and (max-width: 600px) {
      margin: 0;
      margin-bottom: ${props => props.theme.unit.default};
    }
  }

  @media all and (max-width: 600px) {
    display: block;
    margin: 0;
  }
`
