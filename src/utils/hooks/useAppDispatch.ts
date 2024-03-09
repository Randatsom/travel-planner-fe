import { useDispatch } from "react-redux";
import store from "../../core/store";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
