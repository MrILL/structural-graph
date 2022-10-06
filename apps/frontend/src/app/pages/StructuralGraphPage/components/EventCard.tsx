import styled from 'styled-components'

import { GameEvent } from '@sg/types'
import { Handle, Position } from 'react-flow-renderer'

const DEFAULT_HEIGHT = 150
const DEFAULT_WIDTH = 240

const imagePlaceholder =
  'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc='

export function EventCard({
  data,
  selected,
}: {
  data: GameEvent
  selected: boolean
}) {
  return (
    <Wrapper
      style={
        selected
          ? {
              borderWidth: 6,
              borderRadius: 40,
              borderColor: '#7f54d6',
            }
          : {}
      }
      onClick={() => {
        if (selected) {
          // alert('Clicked eventCard')
        }
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Image src={data.imgUrl ?? imagePlaceholder} alt="new" />
      <EventTypeWrapper>{data.type}</EventTypeWrapper>
      <VersinWrapper>{`v${data.version}`}</VersinWrapper>
      <TitleWrapper>{data.title}</TitleWrapper>
      <Handle type="source" position={Position.Bottom} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
  position: relative;

  box-sizing: border-box;

  border-radius: 32px;
  overflow: hidden;
  font-size: 12px;

  border: 1px solid #db6b6b;
  // border: 1px solid #7f54d6;

  &:hover {
    border: 4px solid #474747;
  }
`

const Image = styled.img`
  width: inherit;
  height: inherit;
  position: absolute;

  object-fit: cover;
  border-radius: 32px;
`

const TextHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  color: #ffffff;
+`

const EventTypeWrapper = styled(TextHolder)`
  position: absolute;
  width: 80px;
  height: 32px;

  background: rgba(109, 177, 120, 0.8);
  border-radius: 32px 0px 28px;
`

const VersinWrapper = styled(TextHolder)`
  position: absolute;
  width: 60px;
  height: 32px;
  top: 0px;
  right: 0px;

  background: rgba(0, 0, 0, 0.25);
  border-radius: 0px 32px 0px 28px;
`

const TitleWrapper = styled(TextHolder)`
  position: absolute;
  width: inherit;
  height: 30px;
  bottom: 0px;

  background: rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 32px 32px;
`
