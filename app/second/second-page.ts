import { Page, EventData } from '@nativescript/core';
import { SecondViewModel } from './second-view-model';

export function navigatingTo(args: EventData) {
	let page = <Page>args.object;
	page.bindingContext = new SecondViewModel();
}