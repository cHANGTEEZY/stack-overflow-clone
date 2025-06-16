import React from "react";

interface Props<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: T[] | null | undefined;
  empty: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
}

const DataRenderer = <T,>({ success, error, data, empty }: Props<T>) => {
  return <div>Data Renderer</div>;
};

export default DataRenderer;
