# Plan: CMS de envío de SMS con contactos de Acuity + Brevo

## Objetivo
Crear un pequeño panel administrativo dentro del sitio Next.js existente para que el cliente pueda:
1. Ver la lista de contactos extraídos de las citas de Acuity Scheduling.
2. Seleccionar uno o varios contactos (o enviar a todos).
3. Redactar un mensaje de SMS.
4. Enviar el SMS a través de Brevo (antes Sendinblue).
5. Ver el resultado inmediato del envío (éxito/error), sin persistir historial.

## Decisiones tomadas con el cliente
- **Gateway SMS:** Brevo (Sendinblue) API v3 usando la API key que ya posee.
- **Autenticación del CMS:** Sin protección por ahora (solo uso local/pruebas). Se dejará el placeholder listo para agregar protección más adelante.
- **Persistencia:** Sin historial persistente. Solo resultado inmediato.
- **Formato de teléfono:** Números de EE.UU./Canadá; se normalizarán a E.164 `+1`.

## Consideraciones legales (a comunicar al cliente)
Enviar SMS comerciales en EE.UU. requiere consentimiento previo y por escrito (TCPA) y ofrecer opción de exclusión (opt-out). Acuity no registra explícitamente consentimiento SMS. Antes de usar esto en producción, el cliente debe:
- Confirmar que tiene consentimiento de los contactos para recibir SMS.
- Incluir en cada mensaje una instrucción de opt-out (ej. "Reply STOP to opt out").
- Cumplir las reglas de la FCC/CTIA y A2P 10DLC si aplica.

## Arquitectura

### 1. Variables de entorno (`.env`)
Agregar:
```bash
BREVO_API_KEY=tu_api_key_de_brevo
SMS_SENDER_NAME=VivaLaBeauty   # máximo 11 caracteres alfanuméricos para EE.UU.
```

### 2. Módulo de Acuity: extraer contactos
La API pública de Acuity no expone un endpoint de "contactos", pero las citas (`/appointments`) contienen `firstName`, `lastName`, `phone` y `email`.

- Crear `src/lib/acuity-contacts.ts` con función `getAcuityContacts(options?)`.
- Llamar `GET /appointments` con `minDate`, `maxDate` y `limit` razonable (por defecto últimos 90 días, 500 citas).
- Deduplicar contactos por email o por teléfono normalizado.
- Filtrar contactos sin número de teléfono válido.
- Normalizar teléfono a E.164 (`+1XXXXXXXXXX`) asumiendo US/Canadá.

### 3. Módulo de Brevo: envío de SMS
- Crear `src/lib/brevo-sms.ts`.
- Función `sendBrevoSMS({ to, content })`.
- Usar endpoint `POST https://api.brevo.com/v3/transactionalSMS/sms`.
- Headers: `api-key`, `Content-Type: application/json`.
- Body: `{ sender, recipient: { to }, content }`.
- Manejar errores y devolver estado claro.

### 4. API routes
- `src/app/api/admin/contacts/route.ts` — GET, devuelve lista de contactos deduplicados de Acuity.
- `src/app/api/admin/sms/send/route.ts` — POST, recibe `{ contacts: [...], message: string }`, envía SMS y devuelve resumen (enviados, fallidos, errores).

### 5. UI del CMS
Crear ruta Next.js: `src/app/admin/sms/page.tsx`.
- Layout simple sin Navbar/Footer del sitio principal para no distraer.
- Tabla/checkboxes de contactos con: nombre, teléfono, email, última cita.
- Botón "Seleccionar todos" / "Deseleccionar".
- Campo de texto para el mensaje con contador de caracteres (160 = 1 SMS, 306 = 2, etc.).
- Botón "Enviar SMS" con confirmación.
- Toast/alertas con resumen de envío.
- Opción para recargar contactos desde Acuity.

### 6. Componentes reutilizables
- Crear componentes locales en `src/app/admin/sms/_components/`:
  - `ContactsTable.tsx`
  - `MessageComposer.tsx`
  - `SendSummary.tsx`

### 7. Integración con sistema de diseño existente
Usar los `shadcn/ui` components que ya están instalados: `Button`, `Input`, `Textarea`, `Checkbox`, `Table`, `Card`, `Toast`, `Label`, `Skeleton`, `Alert`.

## Archivos a crear
1. `src/lib/acuity-contacts.ts`
2. `src/lib/brevo-sms.ts`
3. `src/app/api/admin/contacts/route.ts`
4. `src/app/api/admin/sms/send/route.ts`
5. `src/app/admin/sms/page.tsx`
6. `src/app/admin/sms/layout.tsx` (layout limpio, sin header/footer comercial)
7. `src/app/admin/sms/_components/ContactsTable.tsx`
8. `src/app/admin/sms/_components/MessageComposer.tsx`

## Archivos a modificar
1. `.env` — agregar `BREVO_API_KEY` y `SMS_SENDER_NAME`.
2. `next.config.ts` — opcional, agregar dominios si se usa imágenes (no aplica).
3. `src/lib/acuity-helpers.ts` o `src/ai/flows/acuity-booking-flow.ts` — no se modifica el flujo de reservas, solo se agrega nuevo módulo.

## Flujo de usuario
1. Usuario entra a `/admin/sms`.
2. La página llama a `/api/admin/contacts` y muestra la lista cargada desde Acuity.
3. Usuario selecciona contactos y escribe mensaje.
4. Al enviar, el frontend llama a `/api/admin/sms/send`.
5. El backend envía un SMS por contacto vía Brevo y devuelve resumen.
6. Frontend muestra toast con cuántos se enviaron y cuántos fallaron.

## Manejo de errores
- Si Acuity falla: mensaje de error claro en UI.
- Si Brevo falla para un contacto: se registra error individual y se continúa con los demás.
- Si un teléfono no puede normalizarse: se ignora con advertencia.

## Pruebas sugeridas
1. Ejecutar `GET /api/admin/contacts` y verificar que devuelve contactos únicos con teléfono `+1`.
2. Probar `POST /api/admin/sms/send` con un teléfono de prueba propio.
3. Verificar que mensajes >160 chars generan múltiples SMS (contador) pero Brevo cobra por segmento.

## Nota sobre seguridad
El plan actual NO incluye autenticación. Antes de publicar la ruta `/admin/sms` en producción, se recomienda agregar:
- Middleware de autenticación simple (`middleware.ts`) con contraseña en cookie/token, o
- NextAuth / Google OAuth.

Se dejará un comentario claro en la página indicando que debe protegerse antes de producción.
