import { ComponentClass, FunctionComponent } from 'react';

export type EventPopoverContent = FunctionComponent<any> | ComponentClass<any, any> | undefined;

export default EventPopoverContent;
