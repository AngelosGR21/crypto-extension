import {createRoot} from 'react-dom/client'
import App from './components/App/App'
import { GlobalStyles } from '@mui/material'


const root = createRoot(document.getElementById("root"))
root.render(
    <>
    <GlobalStyles
        styles={{
          body: {
            padding: '0',
            minWidth: '400px',
            height: '500px',
          },
        }}
      />
    <App/>
</>
)