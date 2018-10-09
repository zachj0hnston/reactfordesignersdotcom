import styled from 'styled-components'

export const Container = styled.div`

`

export const CodeContainer = styled.div`
    height: 100vh;
    padding-left: 540px;
    padding-top: 16px;
    overflow: auto;
    background: #18171C;
    font-size: 14px;
    color: white;

    & pre {
        background: #18171c !important;
    }

    & code > span > span {
        cursor: pointer;
    }
`

export const Panel = styled.div`
    position: fixed;
    width: 540px;
    height: 100vh;
    overflow: auto;
    background: ${props => props.theme.bg.default};
`

export const FramerPreviewContainer = styled.a`
    position: relative;
    display: block;
    margin: 32px 0;
    height: 96px;
    padding-left: 136px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.1);
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
    font-size: 18px;
    line-height: 1.5em;
    opacity: 0.5;
`


export const Story = styled.div`
    padding: 80px 28px;
    line-height: 1.6;

    & h2 {
        font-weight: 700;
        font-size: 18px;
    }

    & h3 {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 8px;
    }

    & p {
        font-size: 18px;
    }

    & p + p {
        margin-top: 0.8em;
    }

    & img {
        margin: 0.8em 0;
        height: auto;
        border-radius: 8px;
    }

    code {
        padding: 2px 5px;
        border-radius: 3px;
        background: ${props => props.theme.bg.light};
        font-family: Inconsolata, Monaco, Consolas, "Courier New";
        font-size: 14px;
    }
`
