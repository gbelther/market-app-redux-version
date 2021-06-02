import { all } from "@redux-saga/core/effects";

import cart from "./cart/sagas";

export default function* rootSaga(): any {
  return yield all([cart]);
}
