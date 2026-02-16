# 🥊 Gym Admin UI

Base de proyecto para un panel administrativo de gimnasio, construido con **React Router (Framework mode)** y **TypeScript**.  
Este front-end prioriza una estructura modular con formularios listos para conectarse a **FastAPI** y flujos en tiempo real (WebSocket + Redis).

## 🚀 Stack

- ⚛️ **React + TypeScript**
- 🧭 **React Router (Framework / Data APIs)**
- 🎨 **Tailwind CSS v4**
- 🧪 **Vitest + Testing Library**

## ▶️ Comandos rápidos

```bash
npm install
npm run dev
```

```bash
npm run test
```

## ✅ Qué incluye la UI

- Login administrativo.
- Módulos de administración:
  - Usuarios internos.
  - Roles y permisos.
- Catálogos en tiempo real:
  - Membresías.
  - Productos de inventario.
- Operación de gimnasio:
  - Registro de miembros.
  - Ingresos con QR.
  - Record personal.
  - Ventas.
  - Membresías activas.
  - Planes de desarrollo.

## 🔌 Integración con FastAPI

Los formularios ya envían datos mediante acciones de React Router.  
La capa `services/gymApi.ts` está preparada para reemplazar las simulaciones por llamadas reales a FastAPI.

---

> Copia la estructura base y adapta los módulos según tus necesidades.
