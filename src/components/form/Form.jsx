import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { Button } from '../button/Button';
import { REGEX } from '../../consts/const';
import { getToken, signUpUser } from '../../api';
import {
  styledTextField,
  themeTypography,
  styledBox,
  styledTextFieldInput,
  styledTextFieldInputPhone,
  styledRadioGroup,
  styledRadio,
  styledFormControlLabel,
  styledFormControlLabelQa,
  styledBoxModal
} from './Form.styled'
import './Form.scss';

function validateValue(value, str) {
  const re = new RegExp(str);
  return re.test(value);
}

export const Form = () => {
  const [position, setPosition] = React.useState('');
  const [name, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [fileError, setFileError] = React.useState(false);
  const [file, setFile] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const StyledTextField = styled(TextField)(styledTextField);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width < 70 || img.height < 70) {
          setFileError(true);
        } else {
          setFileError(false);
        }
      };
      img.src = URL.createObjectURL(file);
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      if (
        !(fileType === 'image/jpeg' || fileType === 'image/jpg') ||
        fileSize > 5
      ) {
        setFileName('');
        setFileError(true);
      } else {
        setFileName(file.name);
        setFile(file);
        setFileError(false);
      }
    } else {
      setFileName('');
      setFileError(false);
    }
  };

  const handleClickChooseFile = () => {
    document.getElementById('file-input').click();
  };

  function handleChangeName(event) {
    const inputName = event.target.value;
    setName(inputName);
    if (!validateValue(inputName, REGEX.NAME)) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  }

  function handleChangeEmail(event) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    if (!validateValue(inputEmail, `${REGEX.EMAIL}`)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  }

  function handleChangePhone(event) {
    const inputPhone = event.target.value;
    setPhone(inputPhone);
    if (!validateValue(inputPhone, `${REGEX.PHONE}`)) {
      setErrorPhone(true);
    } else {
      setErrorPhone(false);
    }
  }
  const allValuesAreValid = email !== '' && name !== '' && phone !== '' && fileName !== '' && position !== '';
  const handleChangePosition = (event) => {
    setPosition(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const token = await getToken();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', +position);
    formData.append('photo', file);
    
    const isRegistered = await signUpUser(formData, token);
    console.log('isRegistered', isRegistered);
    if (isRegistered.ok) {
      handleOpenModal();
      setPosition('');
      setName('');
      setEmail('');
      setPhone('');
      setFileName('');
      setFile('');
    }
  }

  const theme = createTheme(themeTypography);

  return (
    <><form className='form' onSubmit={handleSubmit}>
      <h1 className='form__title'>Working with POST request</h1>
      <ThemeProvider theme={theme}>
        <Box sx={styledBox}>
          <TextField
            error={errorName}
            fullWidth
            label='Your name'
            id='your name'
            value={name}
            helperText={errorName && 'Please enter a valid name'}
            sx={styledTextFieldInput}
            onChange={handleChangeName} />
          <TextField
            error={errorEmail}
            fullWidth
            label='Email'
            id='email'
            value={email}
            sx={styledTextFieldInput}
            helperText={errorEmail && 'Please enter a valid email'}
            onChange={handleChangeEmail} />
          <TextField
            error={errorPhone}
            fullWidth
            label='Phone'
            id='phone'
            value={phone}
            sx={styledTextFieldInputPhone}
            onChange={handleChangePhone}
            helperText={errorPhone ? 'Please enter a valid phone' : '+38 (XXX) XXX - XX - XX'} />
          <div className='form__box-radio'>
            <p className='form__subtitle'>Select your position</p>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={position}
              onChange={handleChangePosition}
              sx={styledRadioGroup}
            >
              <FormControlLabel
                value='1'
                control={<Radio style={styledRadio} />}
                label='Frontend developer'
                sx={styledFormControlLabel} />
              <FormControlLabel
                value='2'
                control={<Radio style={styledRadio} />}
                label='Backend developer'
                sx={styledFormControlLabel} />
              <FormControlLabel
                value='4'
                control={<Radio style={styledRadio} />}
                label='Designer'
                sx={styledFormControlLabel} />
              <FormControlLabel
                value='3'
                control={<Radio style={styledRadio} />}
                label='QA'
                sx={styledFormControlLabelQa} />
              <p className='form__error-radio'>{!position && 'Should choose a position!'}</p>
            </RadioGroup>
          </div>
          <div className='form__box-upload'>
            <div
              id='file-upload'
              className='form__button-upload'
              onClick={handleClickChooseFile}
            >
              <span className='form__text-button'>Upload</span>
              <input
                id='file-input'
                type='file'
                accept=".jpg,.jpeg"
                style={{ display: 'none' }}
                onChange={handleFileInputChange} />
            </div>
            <StyledTextField
              error={fileError}
              fullWidth
              label='Upload your photo'
              disabled
              value={fileName}
              id='email'
              sx={styledFormControlLabelQa}
              helperText={fileError && 'Minimum 70x70px.Format must be jpeg/jpg. Size must not be greater than 5 Mb.'} />
          </div>
          <Button
            type="submit"
            name="Sign up"
            disabled={!allValuesAreValid} />
        </Box>
      </ThemeProvider>
    </form>
      <div>
        {/* <Button onClick={handleOpenModal}>Open modal</Button> */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styledBoxModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};
