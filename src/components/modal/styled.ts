import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'

export const modalStyles = {
  '& .MuiPaper-root': {
    maxWidth: '616px',
    width: '100%',
    borderRadius: '12px',
  },
  '& .MuiDialogActions-root': {
    padding: '16px 24px',
  },
}

export const StyledModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.grey[50],
  border: 'none',
  boxShadow: '0px 10px 20px rgba(16, 50, 80, 0.12)',
  padding: '24px',

  [theme.breakpoints.up('md')]: {
    width: '616px',
  },

  [theme.breakpoints.down('md')]: {
    width: '312px',
  },
}))

export const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  margin: '5px',
  color: theme.palette.grey[700],
  cursor: 'pointer',
}))
