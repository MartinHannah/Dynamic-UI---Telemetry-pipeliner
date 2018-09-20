/*esline-disable */
import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading...</div>;
  }

//DEFAULT CONTAINERS
export const DefaultTopBar = Loadable({
    loader: () => import('../containers/DefaultTopBar/DefaultTopBar'),
    loading() {
      return Loading
    }
  });

export const DefaultSideBar = Loadable({
    loader: () => import('../containers/DefaultSideBar/DefaultSideBar'),
    loading() {
      return Loading
    }
  });

export const DefaultComponent = Loadable({
  loader: () => import('../containers/DefaultComponent/DefaultComponent'),
  loading() {
    return Loading
  }
});

//CONTAINERS
/*export const Dashboard = Loadable({
    loader: () => import('../views/dashboard/Dashboard'),
    loading: Loading
});

export const Reports = Loadable({
    loader: () => import('../views/reports/Reports'),
    loading: Loading
});

export const Buildings = Loadable({
    loader: () => import('../views/buildings/Buildings'),
    loading: Loading
});*/

//WIDGETS
export const BarGraph = Loadable({
    loader: () => import('../components/BarGraph/BarGraph'),
    loading: Loading
});

export const Report = Loadable({
    loader: () => import('../components/Report/Report'),
    loading: Loading
});

export const Building = Loadable({
    loader: () => import('../components/Building/Building'),
    loading: Loading
})