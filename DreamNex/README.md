# DreamNex - AI-Powered E-Commerce Platform

DreamNex is an innovative e-commerce platform designed for creators and small businesses, leveraging AI technology to enhance user experience and streamline operations. This project is built using React.js for the frontend, Node.js with Express for the backend, and MongoDB with Mongoose for the database. It also integrates with the OpenAI API to provide advanced features.

## Project Structure

```
DreamNex
├── frontend          # Frontend application
│   ├── package.json  # Frontend dependencies and scripts
│   ├── .env.example  # Example environment variables for frontend
│   ├── Dockerfile    # Dockerfile for frontend
│   ├── public        # Public assets
│   │   └── index.html # Main HTML file
│   └── src          # Source files for React application
│       ├── index.jsx # Entry point for React
│       ├── App.jsx   # Main App component
│       ├── pages     # Page components
│       │   ├── Home.jsx
│       │   ├── Store.jsx
│       │   ├── Product.jsx
│       │   └── Dashboard.jsx
│       ├── components # Reusable components
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   ├── ProductCard.jsx
│       │   └── CheckoutForm.jsx
│       ├── services   # API and AI client services
│       │   ├── api.js
│       │   └── aiClient.js
│       ├── hooks      # Custom hooks
│       │   └── useAuth.js
│       ├── context    # Context for state management
│       │   └── AuthContext.jsx
│       ├── styles     # CSS styles
│       │   └── main.css
│       └── utils      # Utility functions
│           └── validators.js
├── backend           # Backend application
│   ├── package.json   # Backend dependencies and scripts
│   ├── .env.example   # Example environment variables for backend
│   ├── Dockerfile     # Dockerfile for backend
│   └── src           # Source files for Node.js application
│       ├── server.js  # Entry point for backend
│       ├── app.js     # Middleware and routes configuration
│       ├── config     # Configuration files
│       │   └── db.js
│       ├── routes     # API routes
│       │   ├── auth.js
│       │   ├── products.js
│       │   ├── orders.js
│       │   └── ai.js
│       ├── controllers # Controller functions
│       │   ├── authController.js
│       │   ├── productController.js
│       │   ├── orderController.js
│       │   └── aiController.js
│       ├── models      # Mongoose models
│       │   ├── User.js
│       │   ├── Product.js
│       │   └── Order.js
│       ├── services    # Service functions
│       │   ├── openaiService.js
│       │   └── paymentService.js
│       ├── middleware   # Middleware functions
│       │   ├── authMiddleware.js
│       │   └── errorHandler.js
│       └── utils       # Utility functions
│           └── logger.js
├── .gitignore         # Git ignore file
├── docker-compose.yml  # Docker Compose configuration
├── nginx              # Nginx configuration
│   └── nginx.conf
├── .github            # GitHub workflows
│   └── workflows
│       └── ci.yml
├── LICENSE            # Licensing information
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/DreamNex.git
   cd DreamNex
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on `.env.example` and configure your environment variables.
   - Start the backend server:
     ```
     npm start
     ```

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on `.env.example` and configure your environment variables.
   - Start the frontend application:
     ```
     npm start
     ```

### Docker

To run the application using Docker, you can use the provided `docker-compose.yml` file. Run the following command in the root directory:

```
docker-compose up
```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

### Acknowledgments

- OpenAI for providing the API that powers the AI features.
- React, Node.js, Express, and MongoDB for the technologies used in this project.