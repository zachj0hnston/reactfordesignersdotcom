import styled from 'styled-components'

export const Container = styled.div`

`

export const CodeContainer = styled.div`
    height: 100vh;
    padding-left: 540px;
    padding-top: 16px;
    overflow: auto;
    background: rgb(29, 31, 33);
    font-size: 14px;
    color: white;
    background: rgb(29, 31, 33);

    & code > span > span {
        cursor: pointer;
    }
`

export const Panel = styled.div`
    position: fixed;
    width: 540px;
    height: 100vh;
    overflow: auto;
    background: #F7F7F7;
`

export const FramerPreviewContainer = styled.a`
    position: relative;
    display: block;
    width: calc(100% + 32px);
    margin-top: 24px;
    margin-left: -16px;
    height: 96px;
    padding-left: 136px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.1);
    /* box-shadow: 0px 5px 15px 0px hsla(0, 0%, 0%, 0.10); */
    text-decoration: none;

    &:hover {
        color: inherit;
        background: white;

    }

    & svg {
        position: absolute;
        top: 50%;
        margin-top: -10px;
        right: 24px;
        width: 16px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.2;
    }
`

export const FramerPreviewArtwork = styled.div`
    position: absolute;
    left: 0;
    width: 120px;
    height: 100%;
    background-image: url(${props => props.imageURL});
    background-size: cover;
    background-position: center;
`

export const FramerPreviewTitle = styled.div`
    margin-top: 18px;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.5em;
`
export const FramerPreviewSubtext = styled.div`
    font-size: 16px;
    line-height: 1.5em;
    opacity: 0.5;
`



export const Story = styled.div`
    padding: 96px 28px;

    & h2 {
        font-weight: 700;
        font-size: 20px;
        line-height: 1.6;
        margin: 4px 0;
    }

    & h3 {
        font-weight: 700;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 8px;
    }

    & p {
        font-size: 16px;
        line-height: 1.6;
    }

    & p + p {
        margin-top: 0.8em;
    }

    & img {
        width: calc(100% + 24px);
        margin: 0.8em -12px;
        height: auto;
    }

    code {
        padding: 2px 5px;
        border-radius: 3px;
        background: rgb(29, 31, 33);
        font-family: Inconsolata, Monaco, Consolas, "Courier New";
        color: #E4E8E5;
        font-size: 14px;
    }
`
