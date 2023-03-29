import { BORDER_COLOR, SECONDARY_COLOR } from '../../consts/const';

export const styledTextField = {
  borderRadius: '0px 4px 4px 0px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0px 4px 4px 0px',
  },
}

export const themeTypography = {
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: `${BORDER_COLOR}`,
    },
  },
}

export const styledBox = {
  width: '100%',
  maxWidth: 380,
  m: 'auto',
  pb: '100px',
}

export const styledTextFieldInput = {
  mb: '50px',
}

export const styledTextFieldInputPhone = {
  mb: '20px',
}

export const styledRadioGroup = {
  position: 'relative',
  left: '10px',
}

export const styledRadio = {
  color: `${SECONDARY_COLOR}`,
  padding: '0',
  marginRight: '12px',
  width: '20px',
  height: '20px'
}

export const styledFormControlLabel = {
  marginBottom: '10px',
}

export const styledCustomTextField = {
  marginBottom: '50px',
}

export const styledBoxModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};