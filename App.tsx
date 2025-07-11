// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import {TypeAnimation} from 'react-native-type-animation';
// import {useSelector} from 'react-redux';
// import Navigation from './src/components/Navigation';

// const App = () => {
//   const currentUser = useSelector(state => state.currentUser);
//   const [showTitle, setShowTitle] = useState(false);

//   useEffect(() => {
//     if (!currentUser) {
//       const timeout = setTimeout(() => {
//         setShowTitle(true);
//       }, 600);

//       return () => clearTimeout(timeout);
//     } else {
//       setShowTitle(false);
//     }
//   }, [currentUser]);

//   return (
//     <View style={styles.container}>
//       {/* Top SafeArea for status bar */}
//       <SafeAreaView style={styles.safeAreaTop}>
//         <StatusBar
//           translucent={false}
//           backgroundColor="#4B0082"
//           barStyle="light-content"
//         />
//       </SafeAreaView>
//       {showTitle && (
//         <View style={styles.header}>
//           <TypeAnimation
//             cursor={false}
//             sequence={[
//               {text: 'A'},
//               {text: 'AC'},
//               {text: 'ACH'},
//               {text: 'ACHI'},
//               {text: 'ACHIE'},
//               {text: 'ACHIEV'},
//               {text: 'ACHIEVO'},
//               {text: 'ACHIEVO'},
//             ]}
//             style={styles.title}
//           />
//         </View>
//       )}

//       <View style={styles.content}>
//         <Navigation isLoggedIn={currentUser} />
//       </View>
//       {Platform.OS === 'ios' && <SafeAreaView style={styles.safeAreaBottom} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   safeAreaTop: {
//     backgroundColor: '#4B0082',
//   },
//   safeAreaBottom: {
//     backgroundColor: 'white',
//   },
//   header: {
//     backgroundColor: '#4B0082',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: '15%',
//   },
//   title: {
//     color: 'white',
//     fontSize: 70,
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });

// export default App;

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import {TypeAnimation} from 'react-native-type-animation';
import {useSelector} from 'react-redux';
import Navigation from './src/components/Navigation';

const App = () => {
  const currentUser = useSelector(state => state.user.currentUser); // 🔧 updated here
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      const timeout = setTimeout(() => {
        setShowTitle(true);
      }, 600);

      return () => clearTimeout(timeout);
    } else {
      setShowTitle(false);
    }
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaTop}>
        <StatusBar
          translucent={false}
          backgroundColor="#4B0082"
          barStyle="light-content"
        />
      </SafeAreaView>

      {showTitle && (
        <View style={styles.header}>
          <TypeAnimation
            cursor={false}
            sequence={[
              {text: 'A'},
              {text: 'AC'},
              {text: 'ACH'},
              {text: 'ACHI'},
              {text: 'ACHIE'},
              {text: 'ACHIEV'},
              {text: 'ACHIEVO'},
              {text: 'ACHIEVO'},
            ]}
            style={styles.title}
          />
        </View>
      )}

      <View style={styles.content}>
        <Navigation isLoggedIn={currentUser} />
      </View>

      {Platform.OS === 'ios' && <SafeAreaView style={styles.safeAreaBottom} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeAreaTop: {
    backgroundColor: '#4B0082',
  },
  safeAreaBottom: {
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '15%',
  },
  title: {
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
