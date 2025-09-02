import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RequestsByCustomer = ({ route, navigation }) => {
  const { userID } = route.params || {};
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      if (!userID) {
        setRequests([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${userID}.json`
      );
      const data = await response.json();
      const tempRequests = [];

      if (data) {
        for (const id in data) {
          const request = data[id];
          if (!request.mazdoorID) {
            console.warn(`Skipping request ${id}: missing mazdoorID`);
            continue;
          }

          const workerResponse = await fetch(
            `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${request.mazdoorID}.json`
          );
          const workerData = await workerResponse.json();

          const requestData = {
            id,
            workerName: request.workerName || 'Unknown',
            workerImage: workerData?.image
              ? { uri: workerData.image }
              : require('../../assets/images/carpenter.jpg'),
            skills: workerData?.skills?.map((skill) => skill.skillName) || ['General Work'],
            rating: workerData?.rating || null,
            problemDescription: request.problemDescription || 'No description',
            preferredDate: request.preferredDate
              ? new Date(request.preferredDate).toLocaleDateString('en-US')
              : 'N/A',
            preferredTime: request.preferredTime
              ? new Date(request.preferredTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'N/A',
            status: request.status || 'pending',
            feedback: request.feedback || null,
            mazdoorID: request.mazdoorID,
            userID: request.userID,
          };
          tempRequests.push(requestData);
        }
      }

      setRequests(tempRequests);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setRequests([]);
      setLoading(false);
    }
  }, [userID]);

  useEffect(() => {
    fetchRequests();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRequests();
    });
    return () => unsubscribe();
  }, [userID, navigation, fetchRequests]);

  const handleCancel = async (id, mazdoorID) => {
    try {
      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${userID}/${id}.json`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${id}.json`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setRequests((prev) => prev.filter((request) => request.id !== id));
      Alert.alert('Success', 'Request cancelled successfully!');
    } catch (err) {
      console.error('Cancel error:', err);
      Alert.alert('Error', 'Failed to cancel request.');
    }
  };

  const handleComplete = async (id, mazdoorID) => {
    try {
      
      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${userID}/${id}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'completed' }),
        }
      );

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${id}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'completed' }),
        }
      );

      const workerResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}.json`
      );
      const workerData = await workerResponse.json();
      const currentJobsCompleted = workerData?.jobsCompleted || 0;

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobsCompleted: currentJobsCompleted + 1 }),
        }
      );

      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: 'completed' } : request
        )
      );
      Alert.alert('Success', 'Request marked as completed!', [
        {
          text: 'OK',
         // onPress: () => navigation.navigate('Feedback', { requestId: id, mazdoorID, customerID: userID }),
        },
      ]);
    } catch (err) {
      console.error('Complete error:', err);
      Alert.alert('Error', 'Failed to complete request.');
    }
  };

  const handleFeedback = (id, mazdoorID) => {
    navigation.navigate('Feedback', { requestId: id, mazdoorID, customerID: userID });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainDiv}>
        <Text style={styles.title}>Your Hire Requests</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : requests.length === 0 ? (
          <Text style={styles.noRequestsText}>No hire requests found.</Text>
        ) : (
          requests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.row}>
                <Image source={request.workerImage} style={styles.workerImage} resizeMode="cover" />
                <View style={styles.workerInfo}>
                  <Text style={styles.name}>{request.workerName}</Text>
                  <Text style={styles.rating}>
                    Rating: {request.rating ? request.rating.toFixed(1) : 'N/A'} / 5
                  </Text>
                  <Text style={styles.skills}>Skills: {request.skills.join(', ')}</Text>
                </View>
              </View>
              <Text style={styles.detail}>Problem: {request.problemDescription}</Text>
              <Text style={styles.detail}>Date: {request.preferredDate}</Text>
              <Text style={styles.detail}>Time: {request.preferredTime}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      request.status === 'pending'
                        ? '#FFA500'
                        : request.status === 'In Progress'
                        ? '#4CAF50'
                        : request.status === 'completed'
                        ? '#2196F3'
                        : request.status === 'rejected'
                        ? '#FF0000'
                        : '#333',
                  },
                ]}
              >
                Status: {request.status}
              </Text>

              {request.status === 'pending' && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#FF0000' }]}
                  onPress={() => {
                    Alert.alert(
                      'Cancel Request',
                      'Are you sure you want to cancel this request?',
                      [
                        { text: 'No' },
                        { text: 'Yes', onPress: () => handleCancel(request.id, request.mazdoorID) },
                      ]
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              )}

              {request.status === 'rejected' && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#FF0000' }]}
                  onPress={() => {
                    Alert.alert(
                      'Cancel Request',
                      'Are you sure you want to cancel this rejected request?',
                      [
                        { text: 'No' },
                        { text: 'Yes', onPress: () => handleCancel(request.id, request.mazdoorID) },
                      ]
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              )}

              {request.status === 'In Progress' && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#FFA500' }]}
                  onPress={() => {
                    Alert.alert(
                      'Complete Request',
                      'Are you sure you want to mark this as completed?',
                      [
                        { text: 'No' },
                        { text: 'Yes', onPress: () => handleComplete(request.id, request.mazdoorID) },
                      ]
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Complete</Text>
                </TouchableOpacity>
              )}

              {request.status === 'completed' && !request.feedback && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#00695C' }]}
                  onPress={() => handleFeedback(request.id, request.mazdoorID)}
                >
                  <Text style={styles.buttonText}>Provide Feedback</Text>
                </TouchableOpacity>
              )}

              {request.status === 'completed' && request.feedback && (
                <Text style={styles.feedback}>Feedback: {request.feedback}</Text>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default RequestsByCustomer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
  },
  mainDiv: {
    backgroundColor: '#fff',
    padding: 15,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00695C',
    marginBottom: 20,
    textAlign: 'center',
  },
  requestCard: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  workerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  workerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  skills: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  feedback: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  noRequestsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});