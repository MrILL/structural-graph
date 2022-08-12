import styled from 'styled-components'

import { GameEvent } from '@sg/types'
import { Handle, Position } from 'react-flow-renderer'

const imagePlaceholder =
  'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc='

export function EventCard({ data }: { data: GameEvent }) {
  // console.log(data)
  return (
    <Wrapper>
      <Handle type="target" position={Position.Top} />
      <Image src={data.imgUrl ?? imagePlaceholder} alt="new" />
      <EventTypeWrapper>{data.type}</EventTypeWrapper>
      <VersinWrapper>{`v${data.version}`}</VersinWrapper>
      <TitleWrapper>{data.title}</TitleWrapper>
      <Handle type="source" position={Position.Bottom} />
    </Wrapper>
  )
}

const height = 150
const width = 240

const Wrapper = styled.div`
  width: ${width}px;
  height: ${height}px;
  position: relative;

  border-radius: 32px;
  overflow: hidden;
  font-size: 12px;
`

const Image = styled.img`
  width: ${width}px;
  height: ${height}px;
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
  width: ${width}px;
  height: 30px;
  bottom: 0px;

  background: rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 32px 32px;
`
