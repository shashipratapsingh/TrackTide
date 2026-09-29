<<<<<<< HEAD
# TrackTide Logistics Frontend

A production-style React/Vite frontend structure designed for a future Spring Boot backend.

## Architecture

The project separates application infrastructure, business modules, reusable components, services, hooks, context, constants, types, utilities and configuration.

```text
src/
├── app/
│   ├── routes/
│   ├── guards/
│   ├── layouts/
│   └── providers/
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── consignments/
│   ├── warehouses/
│   ├── tracking/
│   ├── delivery-partners/
│   ├── deliveries/
│   ├── users/
│   └── customer-tracking/
├── components/
│   ├── common/
│   ├── tables/
│   ├── forms/
│   ├── modals/
│   └── status/
├── services/
│   ├── api/
│   ├── auth/
│   └── storage/
├── hooks/
├── context/
├── constants/
├── types/
├── utils/
└── config/
```

## Run

```bash
npm install
npm run dev
```

Development defaults to mock mode:

```env
VITE_DATA_SOURCE=mock
VITE_API_BASE_URL=http://localhost:8080/api
```

## Backend integration

Set:

```env
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=https://your-backend/api
```

The UI should continue calling module services such as:

```js
consignmentService.list()
trackingService.get(number)
warehouseService.list()
deliveryService.verifyOtp(id, otp)
```

UI components should not call Axios/fetch directly.

## Expected Spring Boot API contract

- `POST /api/auth/login`
- `GET /api/consignments?search=`
- `GET /api/consignments/{idOrNumber}`
- `POST /api/consignments`
- `PUT /api/consignments/{id}`
- `GET /api/tracking/{consignmentNumber}`
- `GET /api/public/tracking/{consignmentNumber}`
- `GET /api/warehouses`
- `POST /api/warehouses`
- `GET /api/delivery-partners`
- `GET /api/users`
- `POST /api/deliveries/{consignmentId}/otp`
- `POST /api/deliveries/{consignmentId}/verify-otp`

Recommended operational endpoints for the backend:

- `POST /api/consignments/{id}/receive`
- `POST /api/consignments/{id}/transfer`
- `POST /api/consignments/{id}/dispatch`
- `POST /api/consignments/{id}/assign-delivery-partner`

## Security boundary

Frontend does not own:
- OTP generation
- OTP expiry/retry rules
- final authorization
- database credentials
- SMS provider secrets
- JWT signing keys

In production, prefer secure HttpOnly cookie-based authentication when supported by the backend architecture. If bearer tokens are used, document the chosen token storage/security model explicitly.

## Important

The mock adapter is only for local development/demo. It must be disabled in staging and production.

Before production release, add:
- backend contract/OpenAPI generated types or DTO mapping
- automated unit/component/e2e tests
- CI checks
- SAST/dependency scanning
- real auth/session strategy
- observability/error reporting
- production deployment configuration
=======
# TrackTide
>>>>>>> e678e48f92e3a91c9ea686f053d18567da10c79c
