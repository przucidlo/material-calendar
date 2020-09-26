import WhyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';

if (process.env.NODE_ENV === 'development') {
    console.log('test');

    WhyDidYouRender(React, {
        onlyLogs: true,
        trackAllPureComponents: true,
        trackHooks: true,
    });
}
