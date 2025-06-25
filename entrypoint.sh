#!/bin/sh

# Create the environment configuration file
echo "Creating runtime environment configuration..."

cat > /app/public/env-config.js << EOF
window.__ENV__ = {
  API_BASE_URL: '${API_BASE_URL:-http://localhost:8000}',
  BASE_URL: '${BASE_URL:-http://localhost}',
  ENVIRONMENT: '${ENVIRONMENT:-production}'
};
EOF

echo "Environment configuration created successfully"
cat /app/public/env-config.js

# Execute the main command
exec "$@"