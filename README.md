## About the App

TasksHub is a simple task manager built with React Native and Expo. It was created to demonstrate how data can be stored on the device so that it survives app restarts, how local notifications are triggered, and how images are selected from the device gallery. The app consists of two tabs (Dashboard and Profile) and a modal screen for adding tasks.

## Features

Tasks can be added with a name and description. They are saved locally with AsyncStorage and displayed on the Dashboard, which refreshes every time it comes into focus. A local notification is shown when a task is saved successfully. On the Profile screen, a student name, student ID and profile picture can be saved, and the picture is chosen from the device gallery with the image picker. All stored data can be cleared with a single button.

## Concepts Covered

- Component state (`useState`) compared with persistent storage (AsyncStorage)
- Storing and retrieving object arrays using `JSON.stringify()` and `JSON.parse()`
- Hybrid file-based routing with Expo Router (Tabs + Stack modal)
- Local notifications using `expo-notifications`
- Gallery access and permissions using `expo-image-picker`
- Screen refresh using `useFocusEffect`

## Technologies Used

React Native, Expo, Expo Router, TypeScript, `@react-native-async-storage/async-storage`, `expo-notifications`, `expo-image-picker`, `@expo/vector-icons`

## Project Structure

```
app/
├── _layout.tsx          Root stack, notification handler
├── add-task.tsx         Add Task modal screen (writes data)
└── (tabs)/
    ├── _layout.tsx      Bottom tab bar and icons
    ├── index.tsx        Dashboard (reads data)
    └── profile.tsx      Profile, image picker, clear data
```

## Setup and Running

The project was created and the required packages were installed using the following commands:

```bash
npx create-expo-app@latest TasksHub
cd TasksHub
npm run reset-project
npx expo install @react-native-async-storage/async-storage expo-notifications expo-image-picker @expo/vector-icons
```

The app is started with:

```bash
npx expo start
```

It can then be opened on a device with Expo Go or a development build. Notifications are best tested on a real device or a development build, because Expo Go has limited notification support on Android.

## How It Works

When a task is saved, the existing `tasks` array is read from AsyncStorage, the new task is appended, and the updated array is written back as a JSON string. A local notification is then triggered and the user is returned to the Dashboard, where the list is reloaded from storage. On the Profile screen, the name, ID and image URI are saved under the `studentProfile` key and are restored when the screen is opened. The "Clear All Tasks" button wipes everything stored by the app.

## Output Screens

Screenshots of all screens, including the proof of the image picker, are available in the `OutputScreens` folder.

