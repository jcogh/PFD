#!/bin/bash

# Load environment variables
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Ensure MONGODB_URI is set
if [ -z "$MONGODB_URI" ]
then
  echo "MONGODB_URI is not set in the .env file"
  exit 1
fi

# Extract host from MONGODB_URI
SERVER_HOST=$(echo $MONGODB_URI | sed -n 's/.*@\(.*\)\/.*$/\1/p')

# Use localhost if SERVER_HOST is empty (local development)
SERVER_HOST=${SERVER_HOST:-localhost:5000}

# Set the protocol (use https if not localhost)
if [[ $SERVER_HOST == *"localhost"* ]]; then
  PROTOCOL="http"
else
  PROTOCOL="https"
fi

SERVER_URL="${PROTOCOL}://${SERVER_HOST}"

echo "Testing API at $SERVER_URL"

# User Registration
echo "Registering user..."
REGISTER_RESPONSE=$(curl -s -X POST $SERVER_URL/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "Test User"}')
echo $REGISTER_RESPONSE

# User Login
echo "Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST $SERVER_URL/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}')
echo $LOGIN_RESPONSE

# Extract token from login response
TOKEN=$(echo $LOGIN_RESPONSE | sed 's/.*"token":"\([^"]*\)".*/\1/')

# Create a Transaction
echo "Creating transaction..."
CREATE_RESPONSE=$(curl -s -X POST $SERVER_URL/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"amount": 50.00, "type": "expense", "description": "Grocery shopping at Walmart"}')
echo $CREATE_RESPONSE

# Extract transaction ID
TRANSACTION_ID=$(echo $CREATE_RESPONSE | sed 's/.*"_id":"\([^"]*\)".*/\1/')

# Get All Transactions
echo "Getting all transactions..."
curl -s -X GET $SERVER_URL/api/transactions \
  -H "Authorization: Bearer $TOKEN"

# Get Specific Transaction
echo "Getting specific transaction..."
curl -s -X GET $SERVER_URL/api/transactions/$TRANSACTION_ID \
  -H "Authorization: Bearer $TOKEN"

# Update Transaction
echo "Updating transaction..."
curl -s -X PUT $SERVER_URL/api/transactions/$TRANSACTION_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"amount": 55.00, "description": "Grocery shopping at Safeway"}'

# Delete Transaction
echo "Deleting transaction..."
curl -s -X DELETE $SERVER_URL/api/transactions/$TRANSACTION_ID \
  -H "Authorization: Bearer $TOKEN"
