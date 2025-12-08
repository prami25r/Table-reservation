import React, { ReactNode } from "react";
import { Platform } from "react-native";

interface WebLayoutProps {
  sidebar?: ReactNode;
  fab?: ReactNode;
  children: ReactNode;
}

export default function WebLayout({ sidebar, fab, children }: WebLayoutProps) {
  const isWeb = Platform.OS === "web";

  if (!isWeb) return <>{children}</>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        minHeight: "100vh",
        position: "relative",
      }}
    >

      <div style={stylesWeb.sidebar}>{sidebar}</div>

      
      
      <div style={stylesWeb.main}>{children}</div>

    
      {fab}
    </div>
  );
}

const stylesWeb: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 300,
    padding: 20,
    borderRight: "1px solid #e5e5e5",
    backgroundColor: "#fafafa",
    position: "sticky",
    top: 20,
    alignSelf: "flex-start",
  },

  main: {
    flex: 1,
    padding: 20,
    maxWidth: 950,
  },

  fabWrapper: {
    position: "sticky",
    top: 120,             
    marginLeft: 20,
    height: 0,
    alignSelf: "flex-start",
    zIndex: 2000,
  },
};
