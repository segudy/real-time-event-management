// backend/core-service/src/auth/roles/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // In einer echten App würden wir das JWT hier dekodieren.
    // Für unseren Platzhalter prüfen wir einen einfachen Header.
    const userRole = request.headers['x-user-role'];
    // Nur Admin hat Zugriff
    return userRole === 'admin';
  }
}
