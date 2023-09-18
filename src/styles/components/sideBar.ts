import { styled } from "..";

export const SideBarContainer = styled('nav', {
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 1,

  width: '30%',
  height: '100vh',
  padding: '1.5rem 3.5rem',
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80);',

  'button.close': {
    backgroundColor: 'transparent',
    border: 'none',
    position: 'absolute',
    right: '1.5rem',
    cursor: 'pointer'
  },

  'button.buy': {
    marginTop: '2rem',
    width: '100%',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    }
  },

  h1: {
    marginTop: '3rem',
  },
  transition: 'all 0.2s ease-in-out',

  '&.disable': {
    transform: 'translateX(110%)',
  },

  '&.enable': {
    transform: 'translateX(0%)',
  }
})

export const SideBarList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  height: '65%',
  marginTop: '3rem',
})

export const CartItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    flex: '1 0 0'
  },

  img: {
    borderRadius: '8px',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)'
  },

  h2: {
    color: '$gray300',
    fontSize: '$md',
    fontWeight: 400,
  },

  span: {
    fontSize: '$md',
    fontWeight: 700,
    lineHeight: '160%',
  },

  button: {
    color: '$green500',
    fontSize: '$md',
    fontWeight: 600,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },

  'button:hover': {
    color: '$green300',
  }
})

export const SideBarTotal = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',

  ':nth-child(1)': {
    fontSize: '1rem'
  },

  ':nth-child(2)': {
    fontSize: '$md',
    textAlign: 'end',
  },

  ':nth-child(3)': {
    fontSize: '$md',
  },

  ':nth-child(4)': {
    fontSize: '$xl',
    textAlign: 'end',
  },
})
