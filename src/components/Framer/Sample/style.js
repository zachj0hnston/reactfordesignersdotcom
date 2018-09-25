import styled from 'styled-components'

export const Container = styled.div`

`

export const Main = styled.div`
    padding-left: 480px;
    overflow: auto;
    background: rgb(29, 31, 33);
    font-size: 14px;
    color: white;
`

export const Panel = styled.div`
    position: fixed;
    width: 480px;
    height: 100%;
    overflow: auto;
    background: #F7F7F7;
`

export const Header = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    width: calc(480px - 24px);
    top: 12px;
    left: 12px;
    border-radius: 8px;
    height: 64px;
    background: white;
    box-shadow: 0px 5px 15px 0px hsla(0, 0%, 0%, 0.10);
`
export const HeaderBack = styled.div`
    width: 32px;
    height: 100%;
`
export const HeaderIcon = styled.div`
    width: 40px;
    height: 40px;
    margin-left: 16px;
    margin-right: 12px;
    border-radius: 20px;
    background: #FFDA61;
`
export const HeaderTitle = styled.div`
    flex: 1 0;
    font-family: "SFUIText-Bold", "SF UI Text", sans-serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
`


export const Story = styled.div`
    padding: 96px 28px;
`

export const TextParagraph = styled.div`
    font-size: 16px;
    line-height: 1.6;
`

export const TextTitle = styled.div`
    font-size: 16px;
    margin-top: 32px;
    font-weight: 700;
    line-height: 1.6;
`