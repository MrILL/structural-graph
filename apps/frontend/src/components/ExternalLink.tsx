import styled from 'styled-components'

const DEFAULT_HEIGHT = 24
const DEFAULT_WIDTH = 24

const imgSrc = 'https://img.icons8.com/material-outlined/452/external-link.png'

export function ExternalLink({ url }: { url?: string }) {
  if (!url) {
    return (
      <Image
        style={{
          opacity: '50%',
        }}
        src={imgSrc}
        alt="external image"
      />
    )
  }

  return (
    <a href={url}>
      <Image src={imgSrc} alt="external image" />
    </a>
  )
}

const Image = styled.img`
  width: ${DEFAULT_HEIGHT}px;
  height: ${DEFAULT_WIDTH}px;
  position: absolute;

  object-fit: cover;
  border-radius: 32px;
`
