import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categories from "./categories/categoriesSlice";
import auth from "./auth/authSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import Wishlist from "./wishlist/wishlistSlice";
import brands from "./brands/brandsSlice";
import orders from "./orders/ordersSlice"
import payment from "./payment/paymentSlice"

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const authPeristConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPeristConfig, auth),
  categories,
  products,
  cart,
  Wishlist,
  brands,
  orders,
  payment,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
