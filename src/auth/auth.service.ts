import { Injectable } from '@nestjs/common';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'firebase-config';

@Injectable()
export class AuthService {
    
    async loginUser(email: string, password: string): Promise<any> {
        console.log("Login intent with:", email, password);
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("Login successful:", userCredential.user);
          return userCredential.user;
        } catch (error) {
          console.error("Error during login:", error);
          throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    }
    async logoutUser(): Promise<void> {
        try {
          await signOut(auth);
          console.log("Sesión cerrada correctamente.");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
          throw new Error('Error al cerrar sesión');
        }
      }  
      async refreshToken(refreshToken: string): Promise<any> {
        try {
          // Aquí se usaría la Firebase Admin SDK si fuera necesario para gestionar el refresh token, pero actualmente no hay una API directa para manejarlo desde la Web SDK en el backend.
          throw new Error('Renovación de token aún no soportada directamente desde Firebase en backend.');
        } catch (error) {
          console.error("Error al renovar el token:", error);
          throw new Error(`Error al renovar el token: ${error.message}`);
        }
      }
}
