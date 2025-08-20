import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home.jsx'

// import Login from '.components/Login.jsx'
import TransactionSuccess from './components/TransactionSuccess.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageNotFound from './components/PageNotFound.jsx'
import PaymentLoading from './components/PaymentLoading.jsx'

import IMPSTransferForm from './components/IMPSTransferForm.jsx'

import NEFTTransferForm from './components/NEFTTransferForm.jsx'
import RTGSTransferForm from './components/RTGSTransferForm.jsx'
import TransactionStatus from './components/TransactionStatus.jsx'
import TransferHome from './components/TranferHome.jsx'
import UPITransferForm from './components/UPITransferForm.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<PageNotFound/>
    
  }
  
   
  ,
  {
    path:"/payment/success",
    element:<TransactionSuccess/>
  },
  {
    path:"/payment/processing",
    element:<PaymentLoading/>
  }
  ,{
    path:"/type=imps",
    element:<IMPSTransferForm/>
  }
  ,{

    path:"/type=neft",
    element:<NEFTTransferForm/>
  },
  {
    path:"/payment/type=rtgs",
    element:<RTGSTransferForm/>
  },
  {path:"/status",
    element:<TransactionStatus/>
  },
  {path:"/home",
    element:<TransferHome/>
  },
  {
    path:"/payment/type=UPI",
    element:<UPITransferForm/>
  }

])
createRoot(document.getElementById('root')).render(
 
  <RouterProvider router={router}/>
  // <RefHook/>

  
)
