import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";
import SignUpPage from './components/SignUp/SignUp.tsx'
import { ROUTES } from './constants/routes.ts';
import Home from './components/Home/Home.tsx';

const router = createBrowserRouter( [
	{
		path: ROUTES.login,
		element: <App />,
	},
	{
		path: ROUTES.register,
		element: <SignUpPage />,
	},
	{
		path: ROUTES.home,
		element: <Home />,
	},
] );


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
