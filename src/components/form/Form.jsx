import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { Button } from '../button/Button';
import { 
  styledTextField,
  themeTypography,
  styledBox,
  styledTextFieldInput,
  styledTextFieldInputPhone,
  styledRadioGroup,
  styledRadio,
  styledFormControlLabel,
  styledFormControlLabelQa
} from './Form.styled'
import './Form.scss';

export const Form = () => {
  const [value, setValue] = React.useState('');
  const StyledTextField = styled(TextField)(styledTextField);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickBtnSignUp = () => {
    console.log('Button clicked!');
  };

  const theme = createTheme(themeTypography);

  return (
    <form className='form'>
      <h1 className='form__title'>Working with POST request</h1>
      <ThemeProvider theme={theme}>
        <Box sx={ styledBox }>
          <TextField
            fullWidth
            label='Your name'
            id='your name'
            sx={styledTextFieldInput}
          />
          <TextField
            fullWidth
            label='Email'
            id='email'
            sx={styledTextFieldInput}
          />
          <TextField
            fullWidth
            label='Phone'
            id='phone'
            sx={styledTextFieldInputPhone}
            helperText='+38 (XXX) XXX - XX - XX'
          />
          <div className='form__box-radio'>
            <p className='form__subtitle'>Select your position</p>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              sx={styledRadioGroup}
            >
              <FormControlLabel
                value='frontend developer'
                control={<Radio style={styledRadio} />}
                label='Frontend developer'
                sx={styledFormControlLabel}
              />
              <FormControlLabel
                value='backend developer'
                control={<Radio style={styledRadio} />}
                label='Backend developer'
                sx={styledFormControlLabel}
              />
              <FormControlLabel
                value='designer'
                control={<Radio style={styledRadio} />}
                label='Designer'
                sx={styledFormControlLabel}
              />
              <FormControlLabel
                value='qa'
                control={<Radio style={styledRadio} />}
                label='QA'
                sx={styledFormControlLabelQa}
              />
            </RadioGroup>
          </div>
          <div className='form__box-upload'>
            <div className='form__button-upload'>
              <span className='form__text-button'>Upload</span>
            </div>
            <StyledTextField
              fullWidth
              label='Upload your photo'
              disabled
              id='email'
              sx={styledFormControlLabelQa}
            />
          </div>
          <Button
            type="button"
            onClick={handleClickBtnSignUp}
            name="Sign up"
            disabled={true}
          />
        </Box>
      </ThemeProvider>
    </form>
  );
};


// const [people, setPeople] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// const [error, setError] = useState(null);

// const handleClickBtnShowMore = () => {
//   console.log('Button clicked!');
// };

// useEffect(() => {
//   async function fetchPeople() {
//     setIsLoading(true);
//     const { success, users } = await getPeople();
//     if (success) {
//       setPeople(users);
//     } else {
//       setError('Something went wrong');
//     }
//     setIsLoading(false);
//   }
//   fetchPeople();
// }, []);

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>Error: {error}</div>;
// }
