# Enviguide - Carbon Footprint Calculator

[![View Demo on Netlify](https://img.shields.io/badge/Live%20Demo-Netlify-brightgreen?style=for-the-badge&logo=netlify)](https://mellow-marigold-694144.netlify.app/)

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)

Enviguide is a comprehensive, cross-platform application designed to calculate the carbon footprint for both individuals and corporate entities. By guiding users through a tailored set of questions, the app provides a detailed emissions summary, promoting environmental awareness and sustainable practices.

## ✨ Key Features

-   **Dual User Journeys:** Separate, customized questionnaires for "Individual" and "Enterprise" users.
-   **Corporate Emissions Scoping:** Calculates corporate footprints based on the GHG Protocol, categorizing emissions into Scope 1, Scope 2, and Scope 3.
-   **Comprehensive Data Collection:** Gathers data across various activities including energy, fuel, travel, employee commute, and waste management.
-   **Centralized State Management:** Utilizes React Context API for seamless data flow across multiple screens.
-   **Backend Integration:** Persists calculation data to a robust backend for storage and analysis.
-   **Cross-Platform:** Built with Expo to support web, iOS, and Android from a single codebase.

## 🛠️ Technology Stack

| Category       | Technology                                         | Purpose                                         |
| :------------- | :------------------------------------------------- | :---------------------------------------------- |
| **Frontend**   | React Native, Expo, TypeScript                     | Core application framework and language         |
| **UI**         | Gluestack UI                                       | Accessible, pre-built component library         |
| **Routing**    | Expo Router                                        | File-based navigation for a structured app flow |
| **State**      | React Context API (`CarbonFootprintContext.tsx`)   | Global state management for user data           |
| **Backend**    | Node.js, Express.js                                | API server for data persistence                 |
| **Database**   | Azure Cosmos DB (or local `footprints.json` file)  | Scalable data storage                           |
| **Hosting**    | Azure App Service                                  | Hosting the backend API                         |

## 📂 Project Structure

The project is a monorepo containing both the frontend application and the backend server.

```
/
├── app/                  # Main React Native/Expo application source code
│   ├── _layout.tsx       # Root layout for Expo Router
│   ├── index.tsx         # Main entry screen
│   ├── CarbonFootprintContext.tsx # Global state provider for all user data
│   ├── coorpCFCalculator.tsx    # Business logic for corporate footprint calculation
│   ├── indiFootprintcalculator.tsx # Business logic for individual footprint calculation
│   └── homeEnterprise.tsx  # Final summary screen for enterprises
│
├── server/               # Backend Express.js application
│   └── server.js         # Main server file with API endpoint definitions
│
└── README.md             # This file
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
-   [Git](https://git-scm.com/)

### 1. Frontend Setup

```bash
# Clone the repository
git clone https://github.com/Enviguide/enviraan-frontend.git

# Navigate to the project directory
cd enviraan-frontend

# Install dependencies
npm install

# IMPORTANT: Configure the backend URL
# Open app/homeEnterprise.tsx and find the fetch() call.
# Replace '<YOUR_LOCAL_IP>' with your computer's local network IP address.
# Example: 'http://192.168.1.5:3001/api/footprint'

# Start the development server
npx expo start
```
This will open the Expo developer tools in your browser. You can then run the app on an Android emulator, iOS simulator, or on your physical device using the Expo Go app.

### 2. Backend Setup

```bash
# Navigate to the server directory from the project root
cd server

# Install dependencies
npm install

# Start the backend server
node server.js
```
The server will start on `http://localhost:3001`. Check the terminal for a confirmation message.

## ⚙️ Configuration

### Backend API URL
The frontend needs to know the address of your running backend. This is configured directly in `app/homeEnterprise.tsx`. For production or deployed environments, this URL should be updated to your Azure App Service URL.

### Environment Variables (for Azure Deployment)
When deploying the `server` to a service like Azure App Service, you must configure the following environment variables in the hosting environment's settings:
-   `COSMOS_ENDPOINT`: The URI for your Azure Cosmos DB instance.
-   `COSMOS_KEY`: The primary key for your Cosmos DB instance.
-   `DATABASE_ID`: The name of the database.
-   `CONTAINER_ID`: The name of the container within the database.

## 📝 API Reference

### `POST /api/footprint`

This endpoint receives the calculated carbon footprint data and saves it.

-   **URL:** `/api/footprint`
-   **Method:** `POST`
-   **Headers:** `Content-Type: application/json`
-   **Request Body:**
    ```json
    {
      "calculatedOn": "2025-08-10T12:00:00.000Z",
      "scope1": 150.5,
      "scope2": 300.2,
      "scope3": 500.0,
      "total": 950.7,
      "fullData": { ... }
    }
    ```
-   **Success Response (201):**
    ```json
    {
      "message": "Data received and saved successfully"
    }
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
