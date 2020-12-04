import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTrips(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    const response = yield axios.get(`/api/trips/${action.payload}`);
    console.log(response.data);
    yield put({
      type: 'SET_TRIPS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: 'There was a problem loading trips. Please try again.',
    });
  }
}

function* postTrips(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/trips', action.payload);
    yield put({
      type: 'UPDATE_TRIP_MAINTENANCE',
      payload: action.payload,
    });
    yield put({
      type: 'GET_TRIPS',
      payload: action.payload.vehicle_id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't save your trip. Please try again.",
    });
  }
}

function* updateTripMaintenance(action) {
  try {
    yield axios.put('/api/trips', action.payload);
    console.log(action.payload.id);
    yield put({
      type: 'GET_VEHICLE_DETAILS',
      payload: action.payload.id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload:
        "Sorry we couldn't update your vehicle maintenance. Please try again.",
    });
  }
}

function* tripSaga() {
  yield takeLatest('GET_TRIPS', getTrips);
  yield takeLatest('POST_TRIPS', postTrips);
  yield takeLatest('UPDATE_TRIP_MAINTENANCE', updateTripMaintenance);
}

export default tripSaga;
