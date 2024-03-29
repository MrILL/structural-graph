import styled from 'styled-components'
import React from 'react'
import axios from 'axios'

import { GameEvent } from '@sg/types'

import { ExternalLink } from 'apps/frontend/src/components/ExternalLink'

export function ModalInfo({
  data,
  closeModal,
}: {
  data: GameEvent
  closeModal: () => void
}) {
  //TODO waiting for responce circle

  const [eventDetails, setEventDetails] = React.useState()

  React.useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/event-details/' + (data as any).detailsId)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setEventDetails(data)
      })
      .catch(e => console.log(e))
  }, [])

  let detailsRender
  if (eventDetails) {
    const { _id, id, __v, ...details } = eventDetails as any

    detailsRender = Object.entries(details).map(([key, value]) => {
      return (
        <>
          <ContentHeader>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </ContentHeader>
          <ContentContainer
            dangerouslySetInnerHTML={{ __html: value as string }}
          />
        </>
      )
    })
  }

  return (
    <Wrapper onClick={() => closeModal()}>
      <ModalContainer onClick={event => event.stopPropagation()}>
        <ExternalLinkContainer>
          <ExternalLink />
        </ExternalLinkContainer>
        <Title>{data.title}</Title>
        <MainContentContainer>
          <PosterContainer>
            <PosterImage src={data.imgUrl} alt="poster" />
            <VersionWrapper>{`v${data.version}`}</VersionWrapper>
            <TypeWrapper>{data.type}</TypeWrapper>
          </PosterContainer>
        </MainContentContainer>
        {detailsRender}
      </ModalContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 85%);
  z-index: 9;
`

const ModalContainer = styled.div`
  position: relative;
  min-width: 50%;
  max-width: 80%;
  min-height: 25%;
  max-height: 80%;
  background-color: white;
  padding: 16px;
  // borderRadius: 32px;
`

const ExternalLinkContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
`

const Title = styled.h3`
  text-align: center;
`

const MainContentContainer = styled.div``

const PosterContainer = styled.div`
  position: relative;
  width: 240px;
  height: 180px;
  float: right;
  border-radius: 32px;
  overflow: hidden;
`

const PosterImage = styled.img`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 32px;
  object-fit: cover;
`

//TODO make abstraction with EventCard TextHolder
const TextHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  color: #ffffff;
`

//TODO make abstration with EventCard TitleWrapper / EventTypeSrapper
const TypeWrapper = styled(TextHolder)`
  position: absolute;
  width: inherit;
  height: 30px;
  bottom: 0px;

  background: rgba(109, 177, 120, 0.8);
`

//TODO make abstraction with EventCard VersionWrapper
const VersionWrapper = styled(TextHolder)`
  position: absolute;
  width: 80px;
  height: 32px;
  top: 0px;
  right: 0px;

  background: rgba(0, 0, 0, 0.25);
  border-radius: 0px 32px 0px 28px;
`

const ContentHeader = styled.h5`
  font-size: 20px;
  margin-top: 16px;
  margin-bottom: 4px;
  margin-left: 16px;
`

const ContentContainer = styled.span``
