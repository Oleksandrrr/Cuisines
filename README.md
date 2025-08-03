# 🍽️ RaisinEat - Restaurant Discovery App

A modern React Native mobile application for discovering restaurants by cuisine type. Built with TypeScript, Redux Toolkit, and React Navigation.

## 🚀 Features

### ✅ Completed Features
- **Splash Screen** - Custom animated splash screen with gradient background
- **Authentication System** - Secure login with email/password validation
- **Cuisine List** - Browse restaurants by cuisine type (Chinese, Italian, Indian)
- **Restaurant List** - View restaurants sorted by open/closed status
- **Restaurant Details** - Comprehensive restaurant information display
- **State Management** - Redux Toolkit with persistence
- **Navigation** - Type-safe navigation with React Navigation
- **Error Handling** - Comprehensive error boundaries and validation
- **Testing** - Unit tests with Jest and React Native Testing Library

### 🎨 UI/UX Features
- Modern gradient designs
- Responsive layouts
- Loading states and error handling
- Form validation with visual feedback
- Smooth animations and transitions

## 📱 Screenshots

### Authentication Flow
- **Splash Screen**: Custom gradient design with app branding
- **Login Screen**: Email/password form with real-time validation

### Dashboard
- **Cuisine List**: Browse available cuisines with background images
- **Restaurant List**: View restaurants for selected cuisine
- **Restaurant Detail**: Comprehensive restaurant information

## 🛠️ Technical Stack

### Core Technologies
- **React Native** 0.76.2
- **TypeScript** 5.0.4
- **Redux Toolkit** 2.8.2
- **React Navigation** 7.0.3
- **Redux Persist** 6.0.0

### Key Libraries
- **React Native Linear Gradient** - Beautiful gradient backgrounds
- **React Native Vector Icons** - Icon library
- **React Native Keychain** - Secure token storage
- **React Native Fast Image** - Optimized image loading
- **React Native Simple Toast** - User notifications

### Development Tools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **React Native Testing Library** - Component testing
- **Prettier** - Code formatting

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
├── config/             # App configuration
├── features/           # Feature-based modules
│   ├── authentication/ # Login and auth logic
│   ├── dashboard/      # Main app screens
│   └── splash/         # Splash screen
├── navigators/         # Navigation configuration
├── store/             # Redux store setup
└── utils/             # Utility functions
```

### State Management
- **Redux Toolkit** for global state
- **Redux Persist** for state persistence
- **Typed hooks** (useAppDispatch, useAppSelector)
- **Feature-based slices** (auth, cuisine, restaurant)

### API Integration
- **Base URL**: `https://rc-code-challenge.netlify.app/api/v1`
- **Endpoints**:
  - `POST /login` - User authentication
  - `GET /cuisines` - Fetch available cuisines
  - Restaurant data integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI
- Android Studio / Xcode
- iOS Simulator / Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Oleksandrrr/Cuisines.git
   cd Cuisines
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the development server**
   ```bash
   yarn start
   ```

5. **Run the app**
   ```bash
   # iOS
   yarn ios
   
   # Android
   yarn android
   ```

## 🧪 Testing

### Run Tests
```bash
# All tests
yarn test

# Specific test file
yarn test --testPathPattern="Login"

# Update snapshots
yarn test --updateSnapshot
```

### Test Coverage
- Unit tests for components
- Integration tests for features
- Snapshot tests for UI consistency
- Navigation flow testing

## 📦 Build & Deploy

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace CodingCallenge.xcworkspace -scheme CodingCallenge -configuration Release
```

## 🔧 Configuration

### Environment Variables
- API base URL configuration
- Feature flags
- UI customization options

### App Configuration
- Navigation settings
- API timeouts
- Validation rules
- Storage keys

## 🐛 Known Issues & Solutions

### Android Build Issues
- **CMake Error**: Update NDK version or use legacy toolchain
- **Duplicate Classes**: Resolved with proper packaging options
- **Splash Screen**: Native implementation to avoid conflicts

### iOS Build Issues
- **Signing**: Configure development team in Xcode
- **Pod Dependencies**: Run `pod install` after dependency changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Oleksandr Yurchenko**
- GitHub: [@Oleksandrrr](https://github.com/Oleksandrrr)
- Project: [RaisinEat](https://github.com/Oleksandrrr/Cuisines)

## 🙏 Acknowledgments

- React Native community
- Redux Toolkit team
- React Navigation contributors
- All open source libraries used in this project

---

⭐ **Star this repository if you found it helpful!**
