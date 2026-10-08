// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import { BrowserRouter } from 'react-router-dom';
// // import { CssBaseline, ThemeProvider } from '@mui/material';
// // import App from './App';
// // import { theme } from './theme';
// // import './styles.css';

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode><ThemeProvider theme={theme}><CssBaseline/><BrowserRouter><App/></BrowserRouter></ThemeProvider></React.StrictMode>
// // );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import App from './App';
// import { theme } from './theme';
// import './styles.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ThemeProvider>
//   </React.StrictMode>
// );

import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { getTheme } from './theme';
import './styles.css';

function Root() {
  const [mode, setMode] = useState(
    localStorage.getItem('savora_theme') || 'dark'
  );

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <App
          themeMode={mode}
          setThemeMode={setMode}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);