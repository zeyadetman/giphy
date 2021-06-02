import { combineReducers } from 'redux';

import search from '@redux/slices/search';
import auth from '@redux/slices/auth';

const rootReducer = combineReducers({ search, auth });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
