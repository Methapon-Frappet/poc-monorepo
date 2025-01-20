#!/bin/sh

for file in /app/assets/*.js
do
  sed -i 's|ENV_API_URL|'${API_URL}'|g' $file
done

miniserve --spa --index index.html
