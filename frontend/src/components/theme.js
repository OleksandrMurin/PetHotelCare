import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b5998', // основной цвет (синий)
    },
    secondary: {
      main: '#ff5c5c', // вторичный цвет (красный)
    },
    customBlack: {
      main: '#4a4a4a', // оттенок черного
    },
    background: {
      default: '#f9f9f9', // фоновый цвет
    },
    text: {
      primary: '#333', // цвет текста
    },
  },
  typography: {
    fontFamily: 'Fira Sans, sans-serif', // Укажите здесь ваш шрифт
    h1: {
      fontFamily: 'Fira Sans, sans-serif',
    },
    h2: {
      fontFamily: 'Fira Sans, sans-serif',
    },
    h3: {
      fontFamily: 'Fira Sans, sans-serif',
    },
    h4: {
      fontFamily: 'Fira Sans, sans-serif',
    },
    h5: {
      fontFamily: 'Fira Sans, sans-serif',
    },
    h6: {
      fontFamily: 'Fira Sans, sans-serif',
    },
    body2:{
      fontFamily: 'Fira Sans, sans-serif',
      fontSize: '17px',
    },
    body3:{
      fontFamily: 'Fira Sans, sans-serif',
      fontSize: '15px'
    }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined', size: 'small', color: 'primary' },
          style: {
            borderColor: '#3b5998',
            color: '#3b5998',
            '&:hover': {
              backgroundColor: '#3b5998',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlined', size: 'small', color: 'secondary' },
          style: {
            borderColor: '#DE4141',
            color: '#DE4141',
            '&:hover': {
              backgroundColor: '#DE4141',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlined', size: 'big', color: 'primary' },
          style: {
            borderColor: '#3b5998',
            color: '#3b5998',
            '&:hover': {
              backgroundColor: '#3b5998',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlined', size: 'big', color: 'secondary' },
          style: {
            borderColor: '#DE4141',
            color: '#DE4141',
            '&:hover': {
              backgroundColor: '#DE4141',
              color: '#fff',
            },
          },
        },
      ],
    },
  },
});

export default theme;