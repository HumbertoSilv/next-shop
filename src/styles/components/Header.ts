import { styled } from ".."

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1400,
  margin: '0 auto',
})

export const CartButton = styled('button', {
  position: 'sticky',
  borderRadius: '8px',
  padding: '0.8rem',
  border: 'none',
  cursor: 'pointer',

  variants: {
    color: {
      green: {
        backgroundColor: '$green500',
        color: 'white',
        transition: 'all 0.2s',

        '&:hover': {
          backgroundColor: '$green300',
        },
      },
      gray: {
        backgroundColor: '$gray800',
        color: '$gray500',
        transition: 'all 0.2s',

        '&:hover': {
          color: '$gray300',
        },
      },
    },
  },

  '&:active': {
    transform: 'scale(1.3)'
  }
})

export const Counter = styled('p', {
  position: 'absolute',
  right: '-0.8rem',
  top: '-0.5rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.4rem',
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '50%',
  lineHeight: 0,
  fontWeight: 700,

  color: '$white',
  backgroundColor: '$green300',
})
