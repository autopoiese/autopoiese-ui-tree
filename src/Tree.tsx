import * as React from 'react'
import mergeRefs from 'react-merge-refs'
import useMeasure from 'react-use-measure'
import { ShiftContext } from './context'
import { StyledContainer, StyledWrapper } from './styled'

type Container = typeof StyledContainer

export type TreeProps = { children: React.ReactNode } & Pick<
  Parameters<typeof StyledWrapper>[0],
  'style'
>

export const Tree = React.forwardRef<Container, TreeProps>(
  ({ children, ...props }, ref) => {
    const immediate = React.useRef(false)
    const container = React.useRef<Container>()
    const [measureRef, bounds] = useMeasure({ scroll: true })
    const [shift, setShift] = React.useState<null | string | boolean>(null)
    return (
      <StyledContainer
        {...{ ref: mergeRefs([ref, container, measureRef as any]) }}
      >
        <StyledWrapper
          {...{ ...props, style: { height: 'max-content', ...props?.style } }}
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
