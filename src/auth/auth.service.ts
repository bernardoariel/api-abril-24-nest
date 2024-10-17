import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'firebase-config';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios, 'sqlserverConnection')
    private readonly usuariosRepository: Repository<Usuarios>,
    ) {}
    async loginUser(email: string, password: string): Promise<any> {
      try {
          // Paso 1: Validar en SQL Server
          const usuario = await this.usuariosRepository.findOne({
              where: { email },  // Cambia "email" por el nombre del campo correspondiente
          });

          if (!usuario || usuario.PassEmail !== password) {
              // Si el usuario no existe o la contraseña no coincide, arrojar un error genérico
              throw new HttpException(
                  'El usuario o la contraseña son incorrectos.',
                  HttpStatus.UNAUTHORIZED
              );
          }

          // Verificar que el estado sea 'A'
          if (usuario.Estado !== 'A') {
              throw new HttpException(
                  'El usuario no está activo en el sistema.',
                  HttpStatus.FORBIDDEN
              );
          }

          console.log("Usuario validado exitosamente en SQL Server.");

          // Paso 2: Verificar en Firebase
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const firebaseUser = userCredential.user;
          console.log("Login exitoso en Firebase:", firebaseUser);

          // Devolver la información del usuario de Firebase y SQL Server
          return {
              message: "Login exitoso en ambas plataformas.",
              user: firebaseUser,
              usuarioSQL: usuario,
          };

      } catch (error) {
          if (error instanceof HttpException) {
              // Si es una excepción de HTTP, la re-lanzamos con el mensaje adecuado
              throw error;
          }

          // Capturar cualquier otro error y lanzarlo como error de servidor
          console.error("Error durante el login:", error);
          throw new HttpException(
              'Error interno del servidor. Por favor, intenta nuevamente más tarde.',
              HttpStatus.INTERNAL_SERVER_ERROR
          );
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
