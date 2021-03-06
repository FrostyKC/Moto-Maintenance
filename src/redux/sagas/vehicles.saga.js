import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getVehicles(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    const response = yield axios.get('/api/vehicles');
    console.log(response.data);
    yield put({
      type: 'SET_VEHICLES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: 'There was a problem loading vehicles. Please try again.',
    });
  }
}

function* getVehicleDetails(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    const vehicleDetails = yield axios.get(
      `/api/vehicles/details/${action.payload}`
    );
    yield put({
      type: 'SET_VEHICLE_DETAILS',
      payload: vehicleDetails.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: 'There was a problem loading vehicles. Please try again.',
    });
  }
}

function* postVehicles(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/api/vehicles', action.payload);
    yield put({
      type: 'GET_VEHICLES',
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't save your vehicle. Please try again.",
    });
  }
}

function* putVehicleDetails(action) {
  try {
    yield axios.put('/api/vehicles', action.payload);
    console.log(action.payload.id);
    yield put({
      type: 'GET_VEHICLE_DETAILS',
      payload: action.payload.id,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't update your vehicle. Please try again.",
    });
  }
}

function* deleteVehicle(action) {
  try {
    yield axios.delete(`/api/vehicles/${action.payload}`);
    yield put({
      type: 'GET_VEHICLES',
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't delete your vehicle. Please try again.",
    });
  }
}

function* vehicleSaga() {
  yield takeLatest('GET_VEHICLES', getVehicles);
  yield takeLatest('GET_VEHICLE_DETAILS', getVehicleDetails);
  yield takeLatest('POST_VEHICLES', postVehicles);
  yield takeLatest('PUT_VEHICLE', putVehicleDetails);
  yield takeLatest('DELETE_VEHICLE', deleteVehicle);
}

export default vehicleSaga;
