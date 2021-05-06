import * as React from 'react'
import { useSpring } from '@react-spring/web'
import { v4 as uuid } from 'uuid'
import { StyledItem } from './styled'
import { ShiftContext } from './context'

// function usePrevious<T = any>(value: T): T | undefined {
//   const ref = React.useRef<T>()
//   React.useEffect(() => {
//     ref.current = value
//   })
//   return ref.current
// }

type ItemProps = {
  column?: number
  className?: string
  title?: string
  children?: React.ReactNode
}

export const Item = React.memo<ItemProps>(
  ({ column = 1, className = '', children, title, ...props }) => {
    const ref = React.useRef<HTMLDivElement>()
    const id = React.useMemo(() => uuid(), [])
    const {
      shift,
      setShift,
      immediate,
      height: containerHeight
    } = React.useContext(ShiftContext)
    const active = shift === id
    // const prevActive = usePrevious(active)
    const scrollIntoView = () => {
      /*
    const top = ref.current?.offsetTop;
    const left = ref.current?.offsetLeft;
    const container = ref.current?.parentElement?.parentElement;
    if (container && left && top) {
      container.scrollLeft = left;
      container.scrollTop = top;
    } else {
      */
      ref.current?.scrollIntoView()
      //}
    }
    const spring = useSpring({
      minHeight: active ? containerHeight : 32,
      minWidth: active ? 320 : 0,
      backgroundColor: `rgba(0, 0, 255, ${active ? 0.4 : 0.1})`,
      immediate: immediate.current,
      position: immediate.current && active ? 'sticky' : 'relative',
      //zIndex: shift && !active ? -1 : 1,
      top: 0,
      right: 0,
      onChange: active
        ? () => !immediate?.current && scrollIntoView()
        : undefined,
      /*onStart: () => {
      if (prevActive && !active) {
        scrollIntoView();
      }
    },*/
      onRest: () => {
        //const top: number = ref.current?.offsetTop || 0;
        //const left = ref.current?.offsetLeft;
        //setScroll?.({ top: top + containerHeight, left });
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
            column,
            className: `${active ? 'active' : ''} ${className}`,
            style: spring as Omit<typeof spring, 'position'>,
            onWheel: () => {
              //immediate.current = false;
              //active && setShift?.(null);
            },
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
