/*esline-disable */
import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading...</div>;
  }

export const Dashboard = Loadable({
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
});