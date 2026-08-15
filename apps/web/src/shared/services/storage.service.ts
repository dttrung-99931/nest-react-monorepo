import type { LoginResponseDto } from "@panda-chat/types";

export const STORAGE_KEYS = {
  KEY_LOGIN: "login",
  KEY_DEVICE_UUID: "device_uuid",
} as const;

class StorageService {
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getLogin(): LoginResponseDto | null {
    const login = localStorage.getItem(STORAGE_KEYS.KEY_LOGIN);
    return login ? (JSON.parse(login) as LoginResponseDto) : null;
  }

  setLogin(login: LoginResponseDto): void {
    localStorage.setItem(STORAGE_KEYS.KEY_LOGIN, JSON.stringify(login));
  }

  removeLogin() {
    localStorage.removeItem(STORAGE_KEYS.KEY_LOGIN);
  }

  getDeviceUUID(): string {
    let deviceUUID = localStorage.getItem(STORAGE_KEYS.KEY_DEVICE_UUID);
    if (!deviceUUID) {
      deviceUUID = crypto.randomUUID().toString();
    }
    localStorage.setItem(STORAGE_KEYS.KEY_DEVICE_UUID, deviceUUID);
    return deviceUUID;
  }
}

export const storageService = new StorageService();
