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
  padding: 16px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`

export const NewBadge = styled.div`
  display:inline-block;
  position: relative;
  top: -2px;
  margin-right: 8px;
  padding: 5px;
  line-height: 1em;
  border-radius: 4px;
  background: red;
  color: white;
  font-size: 10px;
  font-weight: 500;
`