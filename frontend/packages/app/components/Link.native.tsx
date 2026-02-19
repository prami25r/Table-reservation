import * as React from "react";
import { Pressable, Text, Linking } from "react-native";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function Link({ href, children }: Props) {
  return (
    <Pressable onPress={() => Linking.openURL(href)} accessibilityRole="link">
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Pressable>
  );
}
