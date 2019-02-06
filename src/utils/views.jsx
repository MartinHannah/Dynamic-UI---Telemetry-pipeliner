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

export const AddWidgets = Loadable({
    loader: () => import('../components/AddWidgets/AddWidgets'),
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

export const BuildingSummary = Loadable({
    loader: () => import('../components/BuildingSummary/BuildingSummary'),
    loading: LoadingComponent
});

export const DataGrid = Loadable({
    loader: () =>  import('../widgets/DataGrid/DataGrid'),
    loading: LoadingComponent
});

export const FormViewer = Loadable({
    loader: () =>  import('../widgets/FormViewer/FormViewer'),
    loading: LoadingComponent
});

export const InputField = Loadable({
    loader: () =>  import('../components/InputField/InputField'),
    loading: LoadingComponent
});

export const DefaultButton = Loadable({
    loader: () =>  import('../components/DefaultButton/DefaultButton'),
    loading: LoadingComponent
});

export const SwitchGroup = Loadable({
    loader: () =>  import('../components/SwitchGroup/SwitchGroup'),
    loading: LoadingComponent
});

export const ManageRoutes = Loadable({
    loader: () =>  import('../widgets/ManageRoutes/ManageRoutes'),
    loading: LoadingComponent
});

export const ManageWidgets = Loadable({
    loader: () =>  import('../widgets/ManageWidgets/ManageWidgets'),
    loading: LoadingComponent
});