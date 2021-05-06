import * as React from 'react'
import mergeRefs from 'react-merge-refs'
import useMeasure from 'react-use-measure'
import { ShiftContext } from './context'
import { StyledContainer, StyledWrapper } from './styled'

type Container = typeof StyledContainer

export const Tree = React.forwardRef<Container, { children: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    //const [{ x, y }, setOffset] = useSpring(() => ({ x: 0, y: 0 }));
    const immediate = React.useRef(false)
    const container = React.useRef<Container>()
    const [measureRef, bounds, forceRefresh] = useMeasure({ scroll: true })
    const [shift, setShift] = React.useState<null | string | boolean>(null)
    /* React.useEffect(() => {
    console.log(
      scroll,
      ref.current.scrollLeft,
      ref.current.scrollTop,
      immediate?.current
    );
    if (immediate?.current && ref.current) {
      ref.current.scrollLeft = scroll.left;
      ref.current.scrollTop = scroll.top;
    }
  }, [scroll]);
  */
    return (
      <StyledContainer
        {...{
          ref: mergeRefs([ref, container, measureRef as any])
        }}
      >
        <StyledWrapper
          {...{
            ...props,
            style: {
              height: 'max-content'
            }
          }}
        >
          <ShiftContext.Provider
            {...{
              value: {
                shift,
                setShift,
                immediate,
                height: bounds.height,
                container: container.current
              },
              children
            }}
          />
        </StyledWrapper>
      </StyledContainer>
    )
  }
)
