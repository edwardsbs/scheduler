# Use lightweight Nginx image
FROM nginx:alpine

# Copy the built Angular app into Nginx's web folder
COPY ./dist/scheduler /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]