# Step 1: Usar una imagen base ligera
FROM nginx:alpine

# Step 2: Copiar todos los archivos de este directorio al servidor de archivos de Nginx
COPY . /usr/share/nginx/html/

# Step 3: El puerto por defecto de Nginx es 80
EXPOSE 80

# Nginx se ejecuta automáticamente, no hace falta un CMD complejo aquí
