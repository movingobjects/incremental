import { atom } from 'jotai';

import itemsData from 'data/items.json';

export const pts = atom(0);

export const items = atom(itemsData);