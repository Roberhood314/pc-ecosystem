# PC Ecosystem

Secure Pi-authenticated ecosystem hub for P01–P05.

## Architecture
- Hub only: identity, RBAC, app registry, health/status, launch gateway.
- P01–P05 remain independently deployable and keep their own databases and permissions.
- No direct cross-module database access.
- SoloHost runs the optional PC Node Runtime/edge layer, not the entire ecosystem backend.

## Current status
Foundation / security hardening in progress. Production image is not yet released.
