import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
    const [tasks, setTasks] = useState([]);

    //Runs every time the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const loadTasks = async () =>  {
        try {
            const storedTasks = await AsyncStorage.getItem ('tasks');
            if (storedTasks !== null) {
                setTasks (JSON.parse(storedTasks));
            }else {
                setTasks([]);
            }
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    };

    return (
        <ImageBackground
        source = {{
            uri: 'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80',
        }}
        style= {styles.background}
        imageStyle={{opacity: 0.3 }}
        >
            <View style = {styles.container}>
                <Text style = {styles.title}>Your Tasks</Text>

                <ScrollView style = {styles.list}>
                    {tasks.length === 0 ? (
                        <Text style = {styles.empty}>No tasks saved yet. Ad one!</Text>
                    ): (
                        tasks.map((task: any)=> (
                            <View key = {task.id} style = {styles.taskCard}>
                                <Text style = {styles.taskTitle}>{task.taskName}</Text>
                                <Text>{task.taskDescription}</Text>
                            </View>
                        ))
                    ) }
                </ScrollView>

                <TouchableOpacity
                 style = {styles.addButton}
                 onPress = {()=> router.push('/add-task')}
                 >
                    <Text style = {styles.addButtonText}> +Add New Task</Text>
                 </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {flex: 1},
    container: {flex: 1, padding: 20},
    title: {fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
    list: {flex:1},
    empty: {fontStyle: 'italic', color: '#666', marginTop: 10},
    taskCard: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb'
    },

    taskTitle: {fontWeight: 'bold', color: 'blue', marginBottom: 4 },
    addButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});