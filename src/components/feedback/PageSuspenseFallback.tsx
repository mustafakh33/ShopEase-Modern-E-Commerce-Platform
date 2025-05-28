import React, { Suspense } from "react";
import LottieHandler from "./LottieHandler";

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div style={{ marginTop: "10%" }}>
          <LottieHandler type="loading" message="loading please wait..." />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;
