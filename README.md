# Tokenization Serverless

## Probar herramienta desplegada

Se desplegó en AWS lambda, la herramienta consta de 2 funciones.

1. Crear un nuevo recurso

```bash
curl -X POST \
-H "Authorization: pk_test_1234567891234567" \
-H "Content-Type: application/json" \
-d '{
  "cardNumber": "4906417887846775",
  "cvv": "373",
  "expirationMonth": "05",
  "expirationYear": "2027",
  "email": "test@gmail.com"
}' \
https://562tgnnlq9.execute-api.sa-east-1.amazonaws.com/api/cards
```
Ejemplo de respuesta:
```json
{
  "data": {
    "token": "8XDQrPFboVwwiNfh"
  }
}
```

2. Obtener un recurso

```bash
curl -X GET \
-H "Authorization: 8XDQrPFboVwwiNfh" \
-H "Content-Type: application/json" \
https://562tgnnlq9.execute-api.sa-east-1.amazonaws.com/api/cards
```
Ejemplo de respuesta:
```json
{
  "data": {
    "card_number": "4906417887846775",
    "expiration_month": "10",
    "expiration_year": "2029"
  }
}
```

## Usar en entorno local

### Requisitos previos

- Node.js
- MongoDB (local o en la nube)
- Serverless Framework
- AWS cli (configurar con sus credenciales)

### Configuración de MongoDB

1. Instalar MongoDB localmente o configurar una instancia en la nube.

### Instalación

1. Clona el repositorio de GitHub:

   ```bash
   git clone https://github.com/NilsParedes/tokenization-serverless.git
   ```

2. Navega al directorio del proyecto:

    ```bash
    cd tokenization-serverless
    ```

3. Instala las dependencias del proyecto:

    ```bash
    npm i
    ```

### Configuración del entorno

1. Crea un archivo .env en la raíz del proyecto y establezca la variable de entorno MONGODB_URI, ejemplo:.

      ```plaintext
       MONGODB_URI=mongodb://localhost:27017/tu-base-de-datos
      ```

### Ejecución de tests

1. Establecemos la conexión a la base de datos de prueba en el archivo jest.setup.ts.
   ```bash
    process.env.MONGODB_URI='mongodb://localhost:27017/tu-base-de-datos-de-prueba';
    ```
2. Ejecutamos los tests.
   ```bash
    npx jest
    ```

### Ejecución del proyecto

1. Ejecuta el proyecto localmente.

    ```bash
    serverless offline
    ```

2. Accede a la aplicación en tu navegador:
    ```bash
    http://localhost:3000
    ```

### Despliegue del proyecto en AWS

1. Despliega el proyecto en AWS.
    ```bash
    serverless deploy
    ```

2. Accede a la aplicación utilizando la URL proporcionada por AWS.