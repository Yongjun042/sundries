
import React from 'react';
import GlobalLayout from './pages\_layout'

const DynamicIndex = React.lazy(() => import('./pages\index'));
const DynamicIndex = React.lazy(() => import('./pages\cart\index'));
const DynamicIndex = React.lazy(() => import('./pages\payment\index'));
const DynamicIndex = React.lazy(() => import('./pages\products\index'));
const DynamicId = React.lazy(() => import('./pages\products\[id]'));


export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: 'C:\', element: <DynamicIndex />, index: true},
      { path: 'C:\cart', element: <DynamicIndex />, index: true},
      { path: 'C:\payment', element: <DynamicIndex />, index: true},
      { path: 'C:\products', element: <DynamicIndex />, index: true},
      { path: 'C:\products\:id', element: <DynamicId />, },
    ]
  }
]

export const pages = [
  { route: 'C:\' },
  { route: 'C:\cart' },
  { route: 'C:\payment' },
  { route: 'C:\products' },
  { route: 'C:\products\:id' },
]
