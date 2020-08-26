import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MaterialCalendar from './lib/core/MaterialCalendar';

ReactDOM.render(
    <MaterialCalendar onDataRequest={() => Promise.resolve([])} lazyLoading={true} />,
    document.getElementById('root'),
);
