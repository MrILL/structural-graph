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
    // const interval = setInterval(() => {
    axios
      .get('http://127.0.0.1:3000/api/event-details/' + (data as any).detailsId)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setEventDetails(data)
      })
      .catch(e => console.log(e))
    // }, 5000)
    // return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0,0,0,85%)',

        zIndex: 9,
      }}
      onClick={() => closeModal()}
    >
      <div
        style={{
          position: 'relative',

          width: 400,
          height: 280,
          backgroundColor: 'white',
          padding: 8,
          // borderRadius: '32px',
        }}
        onClick={event => event.stopPropagation()}
      >
        <div
          style={{
            position: 'absolute',
            // float: 'right',
            top: 8,
            right: 8,
            width: '24px',
          }}
        >
          <ExternalLink />
        </div>
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          {data.title}
        </h3>
      </div>
    </div>
  )
}
