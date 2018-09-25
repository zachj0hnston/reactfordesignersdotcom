import styled from 'styled-components'

export const Container = styled.div`
    padding: 64px;
    background: ${props => props.theme.bg.default};
`

export const GridItem = styled.div`
    display: inline-block;
    width: calc(33.3% - 32px);
    height: 300px;
    background: #000;
    border-radius: 8px;
    margin: 0 32px 32px 32px;
`