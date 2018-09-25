import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.bg.default};
`

export const Content = styled.div`
  width: 100%;
  max-width: 560px;
  padding: 0 20px;
  margin: 0 auto;
`

export const Footer = styled.div`
  width: 100%;
  padding: ${props => props.theme.unit.xl} 0 ${props => props.theme.unit.s} 0;
  text-align: center;
  font-size: ${props => props.theme.type.size.small};;
  color: ${props => props.theme.type.color.light};
`

export const FramerBanner = styled.div`
  background: #000;
  color: white;
  text-align: center;
  padding: 16px;
  font-size: 16px;
`