import { atom } from 'jotai';

import itemsData from 'data/items';

export const pts = atom(0);
export const items = atom(itemsData);