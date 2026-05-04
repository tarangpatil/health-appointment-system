"use client"; // only needed in App Router components

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    /// @ts-expect-error
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}
