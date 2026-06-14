# Latinfo SDK Demo (Mobile)

App de ejemplo en React Native (Expo) que muestra cómo integrar el SDK de Latinfo (`@carrerahaus/latinfo`) en una app móvil. Sirve de referencia para devs que quieran consumir la API de Latinfo desde Android o iOS.

La app tiene cuatro pantallas:

- **Config**: guardas tu API Key (se almacena local con AsyncStorage, nunca va al repo).
- **RUC**: consulta de una empresa por RUC (`client.pe.ruc`).
- **Buscar**: búsqueda por nombre o razón social (`client.pe.search`).
- **Licitaciones**: búsqueda de licitaciones (`client.pe.licitaciones`).

⚠️ **Todas las búsquedas requieren conexión a Internet.** El SDK no soporta búsqueda offline.

## Cómo se usa el SDK

El cliente se crea con tu API Key y queda listo para las consultas:

```ts
import { Latinfo } from '@carrerahaus/latinfo';

const client = new Latinfo(apiKey);
const empresa = await client.pe.ruc('20131312955');
```

En este demo la lógica del cliente vive en `lib/client.ts`, y cada pantalla en `screens/` lo usa para una consulta distinta.

## Requisitos

- Node 18+
- Una API Key de Latinfo (pídela al equipo).
- Expo Go en tu teléfono, o un emulador Android/iOS.

## Instalación

```bash
git clone https://github.com/carrerahaus/latinfo-mobile-demo
cd latinfo-mobile-demo
npm install
```

## Ejecutar en desarrollo

```bash
npx expo start
```

Esto abre el panel de Expo, desde donde puedes correr la app en Expo Go, en un emulador Android o en un simulador iOS (macOS). Al abrir, ve a la pestaña Config y pega tu API Key.

## Generar un build Android (Preview)

Para generar un APK de prueba con EAS:

```bash
eas build --profile preview --platform android
```

La primera vez, EAS te pedirá vincular el proyecto a tu cuenta de Expo y creará el `projectId`. Al terminar, te da un enlace para descargar e instalar el APK.

## Build local (alternativo)

Sin EAS, generando la carpeta nativa:

```bash
npx expo prebuild
cd android
./gradlew assembleRelease   # en Windows: gradlew.bat assembleRelease
```

El APK queda en `android/app/build/outputs/apk/release/app-release.apk`.

## Créditos

Autor original: [@sy11219](https://github.com/sy11219).
