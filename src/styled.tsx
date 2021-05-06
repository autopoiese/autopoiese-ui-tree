import { animated } from '@react-spring/web'
import styled from '@emotion/styled'

export const StyledContainer = styled.div`
  width: 320px;
  height: 600px;
  overflow-y: scroll;
  overflow-x: scroll;
  margin: 0;
  padding: 0;
  scroll-snap-type: both mandatory;
  scrollbar-width: thin;
  position: relative;
`

export const StyledWrapper = styled(animated.section)`
  overflow: visible;
  height: max-content;
  width: max-content;
  min-width: 320px;
  will-change: height, width;
  counter-reset: item;
  display: flex;
  flex-direction: column;
  float: right;
`

export const StyledItem = styled(animated.div)<{ title?: string }>`
  display: flex;
  min-height: 32px;
  flex-direction: inherit;
  box-sizing: border-box;
  padding-left: 8px;
  & > & {
    margin-left: 24px;
  }
  counter-increment: item;
  scroll-snap-align: start;
  background-color: rgba(0, 0, 255, 0.1);
  &::before {
    content: ${(props) => props.title || "counter(item) ' Item'"};
    height: 32px;
    min-height: 32px;
    display: flex;
    align-items: center;
  }
`
