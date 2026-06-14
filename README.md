# Latinfo SDK Demo

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
npm install
```

## Ejecutar en desarrollo

Para iniciar el proyecto con Expo:

```bash
npx expo start
```

Esto abrirá el panel de Expo donde se puede:

- Ejecutar la app en Expo Go.
- Abrirla en un emulador Android.
- Abrirla en un simulador iOS (macOS).

## Generar un build Android (Preview)

Para generar un APK de prueba usando EAS:

```bash
eas build --profile preview --platform android
```

Una vez finalizado el proceso, Expo proporcionará un enlace para descargar e instalar el build.

## Build local (alternativo)

Para generar el APK localmente sin usar EAS:

### 1. Generar la carpeta nativa Android

```bash
npx expo prebuild
```

### 2. Compilar el APK de release

Linux:

```bash
cd android
./gradlew assembleRelease
```

Windows:

```cmd
cd android
gradlew.bat assembleRelease
```

### 3. Ubicar el APK generado

El archivo se encontrará en:

```text
android/app/build/outputs/apk/release/app-release.apk
```
