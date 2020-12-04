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

function* postOilChange(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/maintenance/oil', action.payload);
    yield put({
      type: 'GET_MAINTENANCE_DETAILS',
      payload: action.payload.vehicle_id,
    });
    yield put({
      type: 'GET_VEHICLE_DETAILS',
      payload: action.payload.vehicle_id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't save your oil change. Please try again.",
    });
  }
}

function* postTireChange(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/maintenance/tires', action.payload);
    yield put({
      type: 'GET_MAINTENANCE_DETAILS',
      payload: action.payload.vehicle_id,
    });
    yield put({
      type: 'GET_VEHICLE_DETAILS',
      payload: action.payload.vehicle_id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't save your tire change. Please try again.",
    });
  }
}

function* updateOldOil(action) {
  try {
    yield axios.put('/api/maintenance/oil', action.payload);
    yield put({
      type: 'GET_MAINTENANCE_DETAILS',
      payload: action.payload.vehicle_id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't update your old oil. Please try again.",
    });
  }
}
function* updateOldTires(action) {
  try {
    yield axios.put('/api/maintenance/tires', action.payload);
    yield put({
      type: 'GET_MAINTENANCE_DETAILS',
      payload: action.payload.vehicle_id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't update your old tires. Please try again.",
    });
  }
}

function* maintenanceSaga() {
  yield takeLatest('GET_MAINTENANCE_DETAILS', getMaintenanceDetails);
  yield takeLatest('POST_OIL', postOilChange);
  yield takeLatest('POST_TIRES', postTireChange);
  yield takeLatest('UPDATE_OIL', updateOldOil);
  yield takeLatest('UPDATE_TIRES', updateOldTires);
}

export default maintenanceSaga;
