/*esline-disable */
import React from 'react';
import Loadable from 'react-loadable';


const LoadingComponent = () => (<div>Loading...</div>) ;

export const text = Loadable({
    loader: () =>  import('../components/InputField/InputField'),
    loading: LoadingComponent
});

export const range = Loadable({
    loader: () =>  import('../components/RangeInput/RangeInput'),
    loading: LoadingComponent
});


export const button = Loadable({
    loader: () =>  import('../components/DefaultButton/DefaultButton'),
    loading: LoadingComponent
});

export const checkbox = Loadable({
    loader: () =>  import('../components/DefaultSwitch/DefaultSwitch'),
    loading: LoadingComponent
});

export const select = Loadable({
    loader: () =>  import('../components/SelectFilter/SelectFilter'),
    loading: LoadingComponent
});

export const multiSelect = Loadable({
    loader: () =>  import('../components/SwitchGroup/SwitchGroup'),
    loading: LoadingComponent
});

export const message = Loadable({
    loader: () =>  import('../components/IconWithText/IconWithText'),
    loading: LoadingComponent
});
