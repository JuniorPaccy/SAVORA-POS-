// import { createTheme } from '@mui/material/styles';
// export const theme=createTheme({palette:{mode:'dark',primary:{main:'#ffb454',light:'#ffd08a',dark:'#c77c18'},secondary:{main:'#35d0ba'},background:{default:'#080b10',paper:'#111722'},success:{main:'#36d399'},error:{main:'#ff6b6b'},warning:{main:'#ffc857'},info:{main:'#61a8ff'}},typography:{fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',h1:{fontWeight:800},h2:{fontWeight:800},h3:{fontWeight:800},button:{fontWeight:700,textTransform:'none'}},shape:{borderRadius:16},components:{MuiCard:{styleOverrides:{root:{backgroundImage:'linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.015))',border:'1px solid rgba(255,255,255,.08)',boxShadow:'0 20px 60px rgba(0,0,0,.22)'}}},MuiButton:{defaultProps:{disableElevation:true}},MuiTextField:{defaultProps:{size:'small'}},MuiDialog:{styleOverrides:{paper:{backgroundImage:'linear-gradient(145deg,#151c29,#0e131b)',border:'1px solid rgba(255,255,255,.1)'}}}}});

import { createTheme } from '@mui/material/styles';

export const getTheme = mode =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: '#ffb454',
        light: '#ffd08a',
        dark: '#c77c18'
      },

      secondary: {
        main: '#35d0ba'
      },

      background:
        mode === 'dark'
          ? {
              default: '#080b10',
              paper: '#111722'
            }
          : {
              default: '#f5f7fa',
              paper: '#ffffff'
            },

      success: {
        main: '#36d399'
      },

      error: {
        main: '#ff6b6b'
      },

      warning: {
        main: '#ffc857'
      },

      info: {
        main: '#61a8ff'
      }
    },

    typography: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      h1: {
        fontWeight: 800
      },

      h2: {
        fontWeight: 800
      },

      h3: {
        fontWeight: 800
      },

      button: {
        fontWeight: 700,
        textTransform: 'none'
      }
    },

    shape: {
      borderRadius: 16
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage:
              mode === 'dark'
                ? 'linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.015))'
                : 'linear-gradient(145deg, #ffffff, #f8fafc)',

            border:
              mode === 'dark'
                ? '1px solid rgba(255,255,255,.08)'
                : '1px solid rgba(15,23,42,.08)',

            boxShadow:
              mode === 'dark'
                ? '0 20px 60px rgba(0,0,0,.22)'
                : '0 12px 35px rgba(15,23,42,.08)'
          }
        }
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true
        }
      },

      MuiTextField: {
        defaultProps: {
          size: 'small'
        }
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage:
              mode === 'dark'
                ? 'linear-gradient(145deg,#151c29,#0e131b)'
                : 'linear-gradient(145deg,#ffffff,#f8fafc)',

            border:
              mode === 'dark'
                ? '1px solid rgba(255,255,255,.1)'
                : '1px solid rgba(15,23,42,.08)'
          }
        }
      }
    }
  });