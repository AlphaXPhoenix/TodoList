import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Switch,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, addTask, updateTask} from '../redux/actions';

const statuses = ['Todo', 'Pending', 'In Progress', 'Completed'];

const statusColors = {
  Todo: '#FFFACD',
  Pending: '#FFE4B5',
  'In Progress': '#ADD8E6',
  Completed: '#90EE90',
};

const Main = ({navigation}) => {
  const dispatch = useDispatch();
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const currentUser = useSelector(state => state.currentUser);
  const tasks = useSelector(state => state.tasks[currentUser?.email] || []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');

  const showToast = message => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Todo');
    setSelectedTask(null);
    setEditMode(false);
  };

  const openModal = task => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setSelectedTask(task);
      setEditMode(true);
    } else {
      resetForm();
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    resetForm();
    setModalVisible(false);
  };

  const handleSaveTask = () => {
    if (!currentUser) return;

    if (editMode && selectedTask) {
      dispatch(
        updateTask(currentUser, {
          ...selectedTask,
          title,
          description,
          status,
        }),
      );
      showToast('Task updated');
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        status,
      };
      dispatch(addTask(currentUser, newTask));
      showToast('Task added');
    }
    closeModal();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowUserModal(false);
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      {/* Header */}
      <View style={[styles.header, themeStyles.header]}>
        <Text style={[styles.heading, themeStyles.heading]}>Achievo</Text>
        <TouchableOpacity
          style={styles.avatarBtn}
          onPress={() => setShowUserModal(true)}>
          <Icon name="user-circle-o" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Column Titles */}
      <View style={styles.statusRow}>
        {statuses.map(status => (
          <Text
            key={status}
            style={[styles.columnTitle, themeStyles.columnTitle]}>
            {status}
          </Text>
        ))}
      </View>

      {/* Task Columns */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.taskRow}>
          {statuses.map(columnStatus => (
            <View
              key={columnStatus}
              style={[styles.column, themeStyles.column]}>
              {tasks
                .filter(task => task.status === columnStatus)
                .map(task => (
                  <Pressable
                    key={task.id}
                    onPress={() => openModal(task)}
                    style={[
                      styles.taskCard,
                      {backgroundColor: statusColors[task.status]},
                    ]}>
                    <Text
                      style={[styles.taskTitle, themeStyles.taskTitle]}
                      numberOfLines={1}>
                      {task.title}
                    </Text>
                    <Text
                      style={[styles.taskDesc, themeStyles.taskDesc]}
                      numberOfLines={2}>
                      {task.description}
                    </Text>
                  </Pressable>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Task FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Task Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, themeStyles.modalView]}>
            <Text style={[styles.modalTitle, themeStyles.modalTitle]}>
              {editMode ? 'Edit Task' : 'Add Task'}
            </Text>
            <TextInput
              placeholder="Title"
              style={[styles.input, themeStyles.input]}
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            />
            <TextInput
              placeholder="Description"
              style={[styles.input, {height: 80}, themeStyles.input]}
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            />
            <Text style={[styles.statusLabel, themeStyles.statusLabel]}>
              Select Status:
            </Text>
            <View style={styles.statusRowWrap}>
              {statuses.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.statusBtn,
                    {
                      backgroundColor: statusColors[s],
                      borderWidth: status === s ? 2 : 0,
                      borderColor: '#4B0082',
                    },
                  ]}
                  onPress={() => setStatus(s)}>
                  <Text
                    style={{
                      color: '#333',
                      fontWeight: status === s ? 'bold' : 'normal',
                    }}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.cancelBtnFull}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveTask}
                disabled={!(title.trim() && description.trim())}
                style={[
                  styles.saveBtnFull,
                  !(title.trim() && description.trim()) && {opacity: 0.5},
                ]}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Avatar Options Modal */}
      <Modal visible={showUserModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.avatarModal, themeStyles.modalView]}>
            <Text style={[styles.modalTitle, themeStyles.modalTitle]}>
              Hi {currentUser?.username || 'User'}!
            </Text>
            <View style={styles.switchRow}>
              <Text style={themeStyles.statusLabel}>
                {isDarkMode ? 'Dark' : 'Light'} Mode
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                thumbColor={isDarkMode ? '#fff' : '#4B0082'}
                trackColor={{false: '#ccc', true: '#888'}}
              />
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.logoutBtn, {marginTop: 20}]}>
              <Text style={styles.saveText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowUserModal(false)}
              style={[styles.cancelBtnFull, {marginTop: 10}]}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarBtn: {padding: 5},
  scrollContent: {padding: 10},
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    paddingHorizontal: 4,
  },
  columnTitle: {
    flex: 1,
    height: 40,
    paddingVertical: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskCard: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  taskDesc: {
    fontSize: 13,
    color: '#555',
  },
  fab: {
    backgroundColor: '#4B0082',
    height: 60,
    width: 60,
    borderRadius: 25,
    position: 'absolute',
    bottom: '3%',
    right: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {color: '#fff', fontSize: 28, fontWeight: 'bold'},
  modalOverlay: {
    flex: 1,
    backgroundColor: '#0005',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  avatarModal: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  statusLabel: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  statusRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtnFull: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  saveBtnFull: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
});

const lightStyles = StyleSheet.create({
  container: {backgroundColor: '#f9f9f9'},
  header: {backgroundColor: '#4B0082'},
  heading: {color: '#fff'},
  column: {backgroundColor: '#fdfdfd'},
  columnTitle: {color: '#4B0082'},
  taskTitle: {color: '#000'},
  taskDesc: {color: '#333'},
  modalView: {backgroundColor: '#fff'},
  modalTitle: {color: '#4B0082'},
  input: {color: '#000'},
  statusLabel: {color: '#000'},
});

const darkStyles = StyleSheet.create({
  container: {backgroundColor: '#000'},
  header: {backgroundColor: '#222'},
  heading: {color: '#fff'},
  column: {backgroundColor: '#1a1a1a'},
  columnTitle: {color: '#fff'},
  taskTitle: {color: '#000000'},
  taskDesc: {color: '#0f0111'},
  modalView: {backgroundColor: '#111'},
  modalTitle: {color: '#fff'},
  input: {color: '#fff'},
  statusLabel: {color: '#fff'},
});

export default Main;
