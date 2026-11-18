import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const BG_URL =
  'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80';
const BANNER_URL =
  'https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg';

export default function AddTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setDescription] = useState('');
  const [bannerFailed, setBannerFailed] = useState(false);

  const saveTask = async () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // 1. Fetch existing tasks
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

      // 2. Add the new task
      tasksArray.push({
        id: Date.now().toString(),
        taskName,
        taskDescription,
      });

      // 3. Save back to storage
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));

      // 4. Local notification (never block saving if it fails)
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Task Saved Successfully! 📚',
            body: `Don't forget to complete your ${taskName}.`,
          },
          trigger: null,
        });
      } catch (e) {
        console.warn('Notification failed', e);
      }

      // 5. Back to dashboard
      router.back();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: BG_URL }}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Banner */}
          {bannerFailed ? (
            <View style={[styles.banner, styles.bannerFallback]}>
              <Text style={styles.bannerFallbackText}>Task Manager</Text>
            </View>
          ) : (
            <Image
              source={{ uri: BANNER_URL }}
              style={styles.banner}
              resizeMode="contain"
              onError={() => setBannerFailed(true)}
            />
          )}

          <Text style={styles.label}>Task Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task name"
            placeholderTextColor="#888"
            value={taskName}
            onChangeText={setTaskName}
          />

          <Text style={styles.label}>Task Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter task description"
            placeholderTextColor="#888"
            value={taskDescription}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button} onPress={saveTask}>
            <Text style={styles.buttonText}>Save Task</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#eef2ff' },
  backgroundImage: { opacity: 0.25 },
  container: { flexGrow: 1, padding: 16 },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    backgroundColor: '#fff',
  },
  bannerFallback: { justifyContent: 'center', alignItems: 'center' },
  bannerFallbackText: { fontSize: 20, fontWeight: 'bold', color: '#4f46e5' },
  label: { fontSize: 15, fontWeight: 'bold', marginBottom: 6, color: '#111' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 14,
    color: '#000',
  },
  textArea: { height: 100 },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});