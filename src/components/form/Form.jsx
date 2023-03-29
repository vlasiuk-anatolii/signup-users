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
import { Loader } from '../loader/Loader';
import { REGEX } from '../../consts/const';
import SuccessImg from '../../assets/images/success-image.svg';
import PropTypes from 'prop-types';
import { getToken, signUpUser, getPositions } from '../../api';
import {
  styledTextField,
  themeTypography,
  styledBox,
  styledTextFieldInput,
  styledTextFieldInputPhone,
  styledRadioGroup,
  styledRadio,
  styledFormControlLabel,
  styledBoxModal,
  styledCustomTextField
} from './Form.styled'
import './Form.scss';

function validateValue(value, str) {
  const re = new RegExp(str);
  return re.test(value);
}

export const Form = ({ setIsRegistered, elementRef }) => {
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
  const [positions, setPositions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorPositions, setErrorPositions] = React.useState('');
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
    if (isRegistered.ok) {
      handleOpenModal();
      setPosition('');
      setName('');
      setEmail('');
      setPhone('');
      setFileName('');
      setFile('');
      setIsRegistered(true);
    }
  }

  const theme = createTheme(themeTypography);

  React.useEffect(() => {
    async function fetchPositions() {
      setIsLoading(true);
      const { success, positions, messages } = await getPositions();
      console.log('positions', positions);
      if (success) {
        setPositions(positions);
      } else {
        setErrorPositions(`${messages}`);
      }
      setIsLoading(false);
    }
    fetchPositions();
  }, []);

  return (
    <>
      <form ref={elementRef} className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Working with POST request</h1>
        {isLoading && <Loader />}
        {errorPositions && <div>Error: {errorPositions}</div>}
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
                {!errorPositions && (
                  positions.map(position => {
                    return (
                      <FormControlLabel
                        value={position.id}
                        control={<Radio style={styledRadio} />}
                        label={position.name}
                        sx={styledFormControlLabel} />
                    )
                  }))}
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
                sx={styledCustomTextField}
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
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby='modal-modal-title'
        >
          <Box sx={styledBoxModal}>
            <ThemeProvider theme={theme}>
              <Typography id='modal-modal-title' sx={{ fontSize: '40px', textAlign: 'center' }}>
                User successfully registered
              </Typography>
              <img className='form__success-img' src={SuccessImg} alt='Success' />
            </ThemeProvider>
          </Box>
        </Modal>

      </div>
    </>
  );
};

Form.propTypes = {
  setIsRegistered: PropTypes.func,
  elementRef: PropTypes.shape({
    current: PropTypes.any
  })
};
