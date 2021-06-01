import { combineReducers } from 'redux';

import search from '@redux/slices/search';

const rootReducer = combineReducers({ search });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
