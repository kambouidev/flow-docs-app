# Quick Start - Flow Docs App 🔧  

## 📋 **Prerequisites**  
1. **Node.js v20 or higher**  
   - Download: [nodejs.org](https://nodejs.org/)  
   - Verify version:  
     ```bash
     node --version
     ```  

2. **Git**  
   - Install: [git-scm.com](https://git-scm.com/)  

3. **Expo CLI (optional, recommended)**  
   ```bash
   npm install -g expo-cli
   ```  

---

## 🛠 **Initial Setup**  

1. **Clone the app repository**  
2. **Install dependencies**  
   ```bash
     npm install
   ```  

3. **`.env` File**  
   - Create a `.env` file in the project root.  
   - Add the variable:  
     ```env
     EXPO_PUBLIC_SERVER_ADDR="YOUR_LOCAL_IP:PORT"
     ```  
   - **Example**:  
     ```env
     EXPO_PUBLIC_SERVER_ADDR="192.168.1.50:9090"
     ```  
   - **⚠️ Important**:  
     - **`YOUR_LOCAL_IP`**: Your computer's IP on the local network.  
       - **Windows**: `ipconfig` in CMD → Look for *IPv4*.  
       - **Mac/Linux**: `ifconfig` in terminal → Look for *inet*.  
     - **Port**: Must match the server port (recommended `9090`).  

---

## 🖥 **Go Server**  
1. **Clone and install**  
   ```bash
   git clone https://github.com/kambouidev/flow-docs-server.git
   cd flow-docs-server
   # Follow instructions from server's README.md
   ```  

2. **Run the server**  
   ```bash
   go run server.go -addr :9090
   ```  
   - Ensure the port matches the `.env` configuration.  

---

## 📱 **Run the App**  

1. **Start Metro Bundler**  
   ```bash
   npm start
   # or
   npx expo start
   ```  

2. **Testing options**:  
   - **📲 Expo Go (physical device)**:  
     - Scan the QR code from terminal or [expo.dev](https://expo.dev/).  
     - **Requirements**:  
       - Phone and PC on same network.  
       - Firewall/antivirus allows port 9090 connections.  

   - **🤖 Android Studio Emulator**:  
     - Requires configured emulator.  
     - Press `a` in terminal after starting `npm start`.  

   - **🍎 iOS Simulator (macOS only)**:  
     - Requires Xcode installed.  
     - Press `i` in terminal after starting `npm start`.  
---
# Technical Documentation

## 📑 Table of Contents
- [Overview](#overview)
- [Technical Stack](#technical-stack)
- [Architecture](#architecture)
- [Features](#features)
- [State Management](#state-management)
- [Notifications System](#notifications-system)
- [Testing](#testing)

## Overview
Flow Documents App is a mobile application developed with React Native, TypeScript, and Expo for document management. While it appears to be a fully functional document upload and visualization system, it currently operates with mock data as the backend is simulated. This approach allows for rapid development and testing of the user interface and interactions without the complexity of a real backend implementation.

## Technical Stack

### Core Technologies
- **React Native**: Cross-platform mobile development framework
- **TypeScript**: Static typing for better maintainability
- **Expo**: Simplifies React Native development and deployment

### Testing
- **Jest**: Default testing framework
- **@testing-library/react-native**: Component testing library
  - Chosen over Enzyme for behavior-based testing approach

### UI Components
- **@expo/vector-icons**: Optimized icon system
- **@react-native-picker/picker**: Native selection component
- **react-native-toast-message**: Toast notifications system

### Data Management
- **@tanstack/react-query**: Server state management and caching
- **jotai**: Local state management (chosen for atomic approach)
- **axios**: HTTP client with enhanced error handling

### Media & Files
- **expo-av**: Audio playback functionality
- **expo-document-picker**: File selection capabilities

## Architecture

### Application Structure
The application is built using React Native with TypeScript and leverages Expo's framework. We chose to maintain Expo's default file-based routing structure within the `app` directory, as it provides a clean and intuitive way to organize the application's routes and views.

### Real-time Communication
The application implements a real-time notification system using WebSocket technology. When a user launches the application, it establishes a WebSocket connection to `ws://${process.env.EXPO_PUBLIC_SERVER_ADDR}/notifications`. This connection enables:

- Instant updates about new documents
- Real-time system changes
- Immediate user notifications

The WebSocket implementation is handled through a custom `useWebSocket` hook that manages:
- Connection establishment
- Automatic reconnection (every 5 seconds if connection is lost)
- Message processing and distribution

## Features

### Document Management
Although the document management system appears to handle actual file uploads and storage, it currently operates with mock data. This design decision allows us to:
- Prototype and test the UI/UX without backend dependencies
- Demonstrate the intended functionality
- Easily transition to a real backend in the future

### Notification System
Our notification system is a comprehensive solution that combines visual, auditory, and interactive elements to provide a rich user experience.

#### Real-time Notifications Architecture
The notification system is built on three main pillars:

1. **WebSocket Integration**
   - Maintains persistent connection for real-time updates
   - Processes incoming notification data
   - Handles connection lifecycle and recovery

2. **Toast Notification System**
   The application uses a customized implementation of react-native-toast-message that includes:
   - Custom-designed UI with vector icons
   - Interactive navigation buttons
   - Multiple notification types (success, error, info)
   - Consistent styling with the app's theme

3. **Audio Feedback System**
   Using expo-av, we've implemented a sophisticated audio feedback system that:
   - Preloads notification sounds for better performance
   - Manages sound resources efficiently
   - Provides automatic resource cleanup
   - Handles playback timing and interruptions

## State Management

### Global State Architecture
The application employs Jotai for state management, chosen specifically for its atomic approach and lightweight nature. This decision was made based on recent experience and the need for efficient state management without the overhead of larger solutions like Redux.

#### State Organization
The global state is primarily divided into two main domains:
1. **Document Management**
   - Centralized document list storage
   - Real-time document status updates
   - Cached document data

2. **Notification System**
   - Unread notification counter
   - Notification history
   - User interaction states

### Data Flow Implementation
The state management system follows these principles:
- Atomic updates for better performance
- Cross-component state sharing
- Centralized data consistency
- Efficient subscription model

## Advanced Features

### Notification Hook System
The `useToastNotification` hook serves as a central coordinator for the notification system:
- Manages audio playback
- Controls toast display timing
- Handles navigation events
- Updates notification counters
- Manages animation states

### Visual Feedback System
We've implemented a sophisticated visual feedback system that includes:
- Blink animations for unread notifications
- Configurable animation parameters
- Smooth state transitions
- Platform-specific optimizations

## Best Practices and Considerations
- Audio resources are preloaded to prevent playback delays
- WebSocket connections include automatic recovery mechanisms
- State updates are batched for better performance
- Resources are properly cleaned up to prevent memory leaks
- Error boundaries and fallbacks are implemented throughout

## Testing

### Unit Testing
Currently, only unit tests have been implemented to ensure the core functionalities of the application work as expected. 

### Running Tests
To execute the test suite, run the following command:
```bash
npm run test
```
This will trigger Jest to run all available test files and output the results in the terminal.

---


