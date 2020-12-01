import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getMaintenanceDetails(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    const maintenanceDetails = yield axios.get(
      `/api/maintenance/${action.payload}`
    );
    yield put({
      type: 'SET_MAINTENANCE_DETAILS',
      payload: maintenanceDetails.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload:
        'There was a problem loading maintenance history. Please try again.',
    });
  }
}

function* maintenanceSaga() {
  yield takeLatest('GET_MAINTENANCE_DETAILS', getMaintenanceDetails);
}

export default maintenanceSaga;
