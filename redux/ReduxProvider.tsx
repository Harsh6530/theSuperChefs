"use client";

import { Provider } from "react-redux";
import authStore from "../redux/auth/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={authStore}>{children}</Provider>;
}
