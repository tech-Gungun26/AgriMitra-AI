# AgriMitra AI

AgriMitra AI is a comprehensive agricultural assistance platform built with React Native/Expo for the frontend and ASP.NET Core for the backend. The platform aims to help farmers with various agricultural needs including weather information, AI-powered chat assistance, and more.

## Features

### 1. Authentication System
- Secure JWT-based authentication
- Role-based access control (Admin/User)
- Test credentials for development:
  ```
  Admin Account:
  Email: admin@agrimitra.ai
  Password: Admin@123

  User Account:
  Email: test@example.com
  Password: password123
  ```
- Future improvements planned:
  - SQL Server database integration
  - User registration system
  - Password hashing and security

### 2. AgriMitra Bot
- AI-powered chatbot for agricultural queries
- Embedded Chatbase integration
- Web: iframe implementation
- Mobile: WebView implementation
- Accessible through dedicated tab

### 3. Weather Information
- Real-time weather data integration
- Powered by OpenWeather API
- Secure API key management through backend proxy

### 4. Plant Disease Analysis
- AI-powered plant disease detection using ResNet50
- Real-time analysis with FastAPI backend
- Supports detection of:
  - Early Blight (अर्ली ब्लाइट)
  - Late Blight (लेट ब्लाइट)
  - Healthy Plants (स्वस्थ पौधे)
- Provides disease-specific:
  - Symptoms (लक्षण)
  - Remedies (उपचार)
  - Prevention tips (बचाव)
- Confidence scoring system
- Analysis history tracking
- Hindi language interface

#### AI Model Details
- Architecture: ResNet50 with custom top layers
- Training Data: 
  - 30 synthetic training images (10 per class)
  - 15 synthetic validation images (5 per class)
- Training Parameters:
  - Optimizer: Adam
  - Loss: Categorical Cross-entropy
  - Batch Size: 32
  - Epochs: 10
- Model Performance:
  - Training in progress
  - Base accuracy: ~33% with synthetic data
  - Planned improvements with real dataset

### 5. Chat History
- Persistent chat session storage
- User-specific conversation tracking
- Query and response archival
- Timestamp-based organization


### 5. AgriBot
- chatbase trained AI chatbot
- Replies like a farmer assistant
- multilingual bot. 


## Technical Stack

### Frontend
- React Native/Expo
- TypeScript
- Expo Router for navigation
- Firebase Authentication
- Native device features (Camera, AsyncStorage)
- WebView for native platform integration

### Backend
- ASP.NET Core 8.0 for main services
- FastAPI for AI model serving
- Python ML stack:
  - TensorFlow 2.x
  - ResNet50
  - NumPy
  - Pillow
- JWT Authentication
- Dapper for database operations
- SQL Server database
- RESTful API architecture

### Current Implementation
- Authentication: Firebase Authentication
- Plant Analysis: FastAPI with ResNet50 model
- Mandi Prices: Real-time market data
- Government Schemes: Information repository
- Profile Management: User data handling

### Project Structure
```
project/
├── app/
│   ├── _layout.tsx           # Root layout
│   ├── auth.tsx             # Authentication screen
│   ├── index.tsx            # Entry point
│   └── (tabs)/              # Tab-based navigation
│       ├── index.tsx        # Home screen
│       ├── plant-analysis.tsx # Disease detection
        ├──agri-bot.tsx # chatbot trained 
│       ├── profile.tsx      # User profile
├── assets/
│   └── images/              # App images and icons
├── components/
│   └── FirebaseAuth.tsx     # Firebase authentication
└── hooks/
    └── useFrameworkReady.ts # Framework initialization
```


## Setup Instructions

### Prerequisites
1. Node.js and npm
2. .NET 8.0 SDK
3. SQL Server
4. Visual Studio or VS Code
5. Expo CLI

### Authentication Setup
1. The system uses Firebase Authentication
2. Configure Firebase:
   - Create a Firebase project
   - Add your app to Firebase
   - Enable Email/Password authentication
   - Add your Firebase configuration to the app
3. Authentication features:
   - Email/Password sign in
   - Persistent authentication state
   - Secure token management
4. Frontend integration through FirebaseAuth component

### Backend Setup

#### Main Backend
1. Navigate to the AgriMitra-AI directory
2. Update connection string in appsettings.json if needed
3. Install dependencies:
   ```
   dotnet restore
   ```
4. Run the application:
   ```
   dotnet run
   ```

#### AI Backend (FastAPI)
1. Create and activate Python virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # Linux/Mac
   ```

2. Install AI dependencies:
   ```bash
   pip install tensorflow fastapi uvicorn pillow numpy
   ```

3. Train the model:
   ```bash
   python AgriMitraPlantAPI/train_simple.py
   ```

4. Start the FastAPI server:
   ```bash
   python AgriMitraPlantAPI/app.py
   ```

The AI server will be available at `http://localhost:8000` with the following endpoint:
- POST `/predict/` - Upload plant images for disease detection

### Frontend Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Start the Expo development server:
   ```
   npm start
   ```

## API Keys and Configuration
The following APIs are used and should be configured in appsettings.json:
- OpenWeather API
- chatbase API
- login API
- JWT Configuration

## Environment Variables
Backend (appsettings.json):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=AgriMitraAI;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "your-256-bit-secret-key",
    "Issuer": "agrimitra-ai",
    "Audience": "agrimitra-users",
    "ExpiryInDays": 30
  }
}
```

## Security Measures
1. API keys stored securely in backend
2. JWT authentication for API access
3. SQL injection prevention through parameterized queries
4. CORS policy implementation for development
5. HTTPS enforcement in production

## Development Tools Used
- Visual Studio Code
- SQL Server Management Studio
- Expo Developer Tools
- Postman for API testing

## Current Status
- ✅ Authentication system implemented
- ✅ AgriMitra Bot integration complete
- ✅ Basic user management
- ✅ Weather information system
- 🚧 Additional features in planning
- 🚧 Plant analysis

## Testing
### Test User Credentials
- Email: test@example.com
- Password: password123
(Note: These credentials are for development only)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements
1. Weather alerts system
2. Crop recommendation system
3. Market price predictions
4. Community forum
5. Expert consultation system
6. Plant analysis using picture
