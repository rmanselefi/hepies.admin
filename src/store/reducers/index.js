import { combineReducers } from 'redux';
import auth from './auth';
import users from './users'
import consults from './consults'
import drugs from './drugs'
import guidelines from './guidelines'
import lookup from './lookup'
import patient from './patient'
import pharmacy from './pharmacy'
import points from './points'
import prescriptions from './prescriptions'
import roles from './roles'
import vouchers from './vouchers'

export default combineReducers({
    auth,    
    users,
    consults,
    drugs,
    guidelines,
    lookup,
    patient,
    pharmacy,
    points,
    prescriptions,
    roles,
    vouchers
});