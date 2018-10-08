import styled from 'styled-components'

export const SectionWrapper = styled.div`
    cursor: default;
    margin: 8px -16px 0 -16px;
    padding: 8px 16px 16px 16px;
    border-radius: 6px;
    &:hover {
        cursor: pointer;
    }
`

export const RangeBadge = styled.div`
    float: right;
    position: relative;
    top: 4px;
    left: 4px;
    border-radius: 4px;
    font-family: Inconsolata, Monaco, Consolas, "Courier New";
    font-size: 14px;
    color: #949494;
    line-height: 1.2em;
`
