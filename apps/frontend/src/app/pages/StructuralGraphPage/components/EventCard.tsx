import styled from 'styled-components'
import { GameEvent } from '../../../../types'

export function EventCard({ data }: { data: GameEvent }) {
  return (
    <Wrapper>
      <Image src={data.imgUrl} alt="new" />
      <EventTypeWrapper>{data.type}</EventTypeWrapper>
      <VersinWrapper>{`v${data.version}`}</VersinWrapper>
      <TitleWrapper>{data.title}</TitleWrapper>
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
