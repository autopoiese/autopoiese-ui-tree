import * as React from 'react'
import { useSpring } from '@react-spring/web'
import { v4 as uuid } from 'uuid'
import { StyledItem } from './styled'
import { ShiftContext } from './context'

type ItemProps = {
  className?: string
  title?: string
  children?: React.ReactNode
}

export const Item = React.memo<ItemProps>(
  ({ className = '', children, title, ...props }) => {
    const ref = React.useRef<HTMLDivElement>()
    const id = React.useMemo(() => uuid(), [])
    const {
      shift,
      setShift,
      immediate,
      height: containerHeight
    } = React.useContext(ShiftContext)
    const active = shift === id

    const scrollIntoView = () => {
      ref.current?.scrollIntoView()
    }
    const spring = useSpring({
      minHeight: active ? containerHeight : 32,
      minWidth: active ? 320 : 0,
      backgroundColor: `rgba(0, 0, 255, ${active ? 0.4 : 0.1})`,
      immediate: immediate.current,
      position: immediate.current && active ? 'sticky' : 'relative',
      top: 0,
      right: 0,
      onChange: active
        ? () => !immediate?.current && scrollIntoView()
        : undefined,
      onRest: () => {
        if (active) {
          scrollIntoView()
          immediate.current && setTimeout(() => scrollIntoView(), 0)
          immediate.current = false
        }
      }
    })
    return (
      <>
        <StyledItem
          {...{
            ref,
            className: `${active ? 'active' : ''} ${className}`,
            style: spring as Omit<typeof spring, 'position'>,
            onWheel: () => {},
            onClick: (e) => {
              e.preventDefault()
              e.stopPropagation()
              immediate.current = Math.random() > 0.5
              setShift?.(!active ? id : null)
              if (immediate.current) {
              }
            },
            title
          }}
        >
          {children}
        </StyledItem>
      </>
    )
  }
)
