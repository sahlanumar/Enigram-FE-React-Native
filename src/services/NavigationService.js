import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

/**
 * Fungsi untuk melakukan navigasi ke layar tertentu.
 * @param {string} name - Nama route (layar) yang dituju.
 * @param {object} params - Parameter yang ingin dikirim ke layar tersebut.
 */
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
