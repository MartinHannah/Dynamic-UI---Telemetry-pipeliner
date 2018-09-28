/*esline-disable */
import React from 'react';
import Loadable from 'react-loadable';


const LoadingComponent = () => (<div>Loading...</div>) ;
  
//DEFAULT CONTAINERS
export const DefaultTopBar = Loadable({
    loader: () => import('../containers/DefaultTopBar/DefaultTopBar'),
    loading: LoadingComponent
});
  
export const DefaultSideBar = Loadable({
    loader: () => import('../containers/DefaultSideBar/DefaultSideBar'),
    loading: LoadingComponent
});
  
export const DefaultComponent = Loadable({
  loader: () => import('../containers/DefaultComponent/DefaultComponent'),
  loading: LoadingComponent
});

//WIDGETS
export const Report = Loadable({
    loader: () => import('../components/Report/Report'),
    loading: LoadingComponent
});

export const Building = Loadable({
    loader: () => import('../components/Building/Building'),
    loading: LoadingComponent
});

export const AddToDashboard = Loadable({
    loader: () => import('../components/AddToDashboard/AddToDashboard'),
    loading: LoadingComponent
});

export const DashboardWidget = Loadable({
    loader: () => import('../components/DashboardWidget/DashboardWidget'),
    loading: LoadingComponent
});

export const AreaBarChart = Loadable({
    loader: () => import('../components/AreaBarChart/AreaBarChart'),
    loading: LoadingComponent
});

export const ChartWrapper = Loadable({ 
    loader: () => import('../components/ChartWrapper/ChartWrapper'),
    loading: LoadingComponent
})

export const AreaOnlyChart = Loadable({
    loader: () => import('../components/AreaOnlyChart/AreaOnlyChart'),
    loading: LoadingComponent
});