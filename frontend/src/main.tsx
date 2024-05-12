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
import Home from './components/Home/App.tsx';
import MyBooks from './components/MyBooks/App.tsx';
import Search from './components/Search/App.tsx';
import Requests from './components/Requests/App.tsx';

const router = createBrowserRouter( [
	{
		path: '/',
		element: <App />,
	},
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
	{
		path: ROUTES.myBooks,
		element: <MyBooks />,
	},
	{
		path: ROUTES.search,
		element: <Search />,
	},
	{
		path: ROUTES.requests,
		element: <Requests />,
	},
] );


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
