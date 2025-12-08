let webNavigate = null; 


export function registerWebNavigation(fn) {
  webNavigate = fn;
}


export function useNavigation() {
  return {
    navigate: (screen, params) => {
      if (webNavigate) webNavigate(screen, params);
      else console.warn("[WEB] navigate used before registration");
    },

    replace: (screen, params) => {
      if (webNavigate) webNavigate(screen, params);
      else console.warn("[WEB] replace used before registration");
    },

    goBack: () => {
      if (webNavigate) webNavigate("Reservations");
      else console.warn("[WEB] goBack used before registration");
    }
  };
}

export function useRoute() {
  return { params: {} };
}

export function useFocusEffect() {
  console.log("[WEB] focus ignored");
}

export function NavigationContainer({ children }) {
  return children;
}
