# Personal Finance Dashboard

## Overview

Personal Finance Dashboard is a web application designed to help users track and manage their personal finances securely. It provides a clear visualization of expenses by category and a detailed list of recent transactions, with encryption to protect sensitive financial data.

## Features

- User authentication and authorization
- Dashboard with financial overview
- Expense tracking by category
- Transaction listing and management
- Data visualization with interactive charts
- CSV import for bulk transaction upload
- Encryption of sensitive data

## Technology Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- State Management: Redux
- Charts: Recharts
- Encryption: AES-256

## Security Features

- End-to-end encryption of sensitive transaction data
- Encrypted storage of transaction descriptions in the database
- Secure handling of encryption keys
- HTTPS for all client-server communication
- JWT for secure authentication

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
```
git clone https://github.com/jcogh/pfd.git
cd personal-finance-dashboard
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```
REACT_APP_API_URL=http://localhost:5000/api
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_secure_encryption_key
```

Note: Ensure that your ENCRYPTION_KEY is sufficiently long and complex for security purposes.

4. Start the development server:
```
npm start
```

## Usage

After starting the development server, open your browser and navigate to `http://localhost:3000`. You can register a new account or log in with existing credentials to access the dashboard. All sensitive data entered will be automatically encrypted before being sent to the server or stored in the database.

## Security Considerations

- The encryption key is stored in the server's environment variables and is never exposed to the client.
- Transaction descriptions are encrypted before being stored in the database and decrypted when retrieved.
- Ensure that your `.env` file is never committed to version control.
- Regularly rotate encryption keys and JWT secrets in a production environment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
