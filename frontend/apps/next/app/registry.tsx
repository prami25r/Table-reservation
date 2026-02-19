"use client";
import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleSheet } from "react-native";

let isInserted = false;

export default function Registry({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    if (isInserted) return null;
    isInserted = true;
    const sheet = (StyleSheet as any).getSheet?.();
    if (sheet?.textContent) {
      return (
        <style
          id="react-native-web-styles"
          dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        />
      );
    }
    return null;
  });
  return <>{children}</>;
}
