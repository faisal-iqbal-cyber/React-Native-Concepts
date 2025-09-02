import React, { useCallback, useEffect, useState } from 'react';
import {Alert,  FlatList,Image, Modal,ScrollView,StyleSheet,Switch,Text,TouchableOpacity,View } from 'react-native';

const DashboardScreen = ({ route, navigation }) => {
  const { mazdoorID } = route.params || {};
  const [isAvailable, setIsAvailable] = useState(true);
  const [hireRequests, setHireRequests] = useState([]);
  const [workerData, setWorkerData] = useState(null);
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSkillsModalVisible, setIsSkillsModalVisible] = useState(false);
  const [isToggling, setIsToggling] = useState(false); 

  const toggleSkillsModal = () => setIsSkillsModalVisible(prev => !prev);

  const fetchWorkerData = useCallback(async () => {
    if (!mazdoorID) {
      setWorkerData(null);
      setJobsCompleted(0);
      setIsAvailable(true);
      return;
    }

    try {
      const response = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}.json`
      );
      if (response.ok) {
        const data = await response.json();
        setWorkerData(data || null);
        setJobsCompleted(data?.jobsCompleted || 0);
        setIsAvailable(data?.isAvailable ?? true);
      } else {
        setWorkerData(null);
        setJobsCompleted(0);
        setIsAvailable(true);
      }
    } catch (error) {
      console.error('Fetch worker data error:', error);
      setWorkerData(null);
      setJobsCompleted(0);
      setIsAvailable(true);
    }
  }, [mazdoorID]);

  const toggleAvailability = async () => {
    if (isToggling) return; 
    setIsToggling(true);

    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);

    if (!mazdoorID) {
      setIsToggling(false);
      return;
    }

    try {
      const response = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isAvailable: newAvailability }),
        }
      );
      if (!response.ok) throw new Error('Failed to update availability');
    } catch (error) {
      console.error('Update availability error:', error);
      setIsAvailable(!newAvailability);
      Alert.alert('Error', 'Failed to update availability. Please try again.');
    } finally {
      setIsToggling(false);
    }
  };

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      if (!mazdoorID) {
        setHireRequests([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}.json`
      );
      const data = await response.json();
      const tempRequests = [];

      if (data) {
        for (const requestId in data) {
          const request = data[requestId];
          const customerID = request?.userID;

          if (!customerID) {
            console.warn(`Missing customerID for request ${requestId}`);
            continue;
          }

          const customerResponse = await fetch(
            `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/${customerID}.json`
          );
          const customerData = await customerResponse.json();

          const requestData = {
            id: requestId,
            customerName: customerData?.name || 'Unknown',
            location: customerData?.location || 'Not specified',
            job: request?.problemDescription || 'No description provided',
            purpose: request?.preferredDate && request?.preferredTime
              ? `Scheduled for ${new Date(request.preferredDate).toLocaleDateString('en-US')} at ${new Date(
                  request.preferredTime
                ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Schedule not specified',
            image: customerData?.image
              ? { uri: customerData.image }
              : require('../../assets/images/man.png'),
            status: request?.status || 'pending',
            userID: customerID,
          };
          tempRequests.push(requestData);
        }
      }

      setHireRequests(tempRequests);
      setLoading(false);
    } catch (err) {
      console.error('Fetch requests error:', err);
      setHireRequests([]);
      setLoading(false);
    }
  }, [mazdoorID]);

  useEffect(() => {
    fetchWorkerData();
    fetchRequests();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchWorkerData();
      fetchRequests();
    });
    return () => unsubscribe();
  }, [mazdoorID, navigation, fetchWorkerData, fetchRequests]);

  const handleReject = async (requestId, customerID) => {
    try {
      if (!customerID || !mazdoorID) return;

      const workerRequestResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${requestId}.json`
      );
      const workerRequestData = await workerRequestResponse.json();
      if (!workerRequestData || workerRequestData.userID !== customerID) return;

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${requestId}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected' }),
        }
      );

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${customerID}/${requestId}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected' }),
        }
      );

      setHireRequests(prev =>
        prev.map(request =>
          request.id === requestId ? { ...request, status: 'rejected' } : request
        )
      );
      Alert.alert('Success', 'Request rejected successfully!');
    } catch (err) {
      console.error('Reject error:', err);
      Alert.alert('Error', 'Failed to reject request.');
    }
  };

  const handleAccept = async (requestId, customerID) => {
    try {
      if (!customerID || !mazdoorID) return;

      const workerRequestResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${requestId}.json`
      );
      const workerRequestData = await workerRequestResponse.json();
      if (!workerRequestData || workerRequestData.userID !== customerID) return;

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${requestId}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'In Progress' }),
        }
      );

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${customerID}/${requestId}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'In Progress' }),
        }
      );

      setHireRequests(prev =>
        prev.map(request =>
          request.id === requestId ? { ...request, status: 'In Progress' } : request
        )
      );
      Alert.alert('Success', 'Request accepted successfully!');
    } catch (err) {
      console.error('Accept error:', err);
      Alert.alert('Error', 'Failed to accept request.');
    }
  };

  const handleCancel = async (requestId, customerID) => {
    try {
      if (!customerID || !mazdoorID) return;

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${customerID}/${requestId}.json`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/Request/${mazdoorID}/${requestId}.json`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setHireRequests(prev => prev.filter(request => request.id !== requestId));
      Alert.alert('Success', 'Request canceled successfully!');
    } catch (err) {
      console.error('Cancel error:', err);
      Alert.alert('Error', 'Failed to cancel request.');
    }
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestCard}>
      <Image source={item.image} style={styles.avatar} />
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.jobText}>{item.job}</Text>
        <Text style={styles.purpose}>{item.purpose}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <View style={styles.actions}>
        {item.status === 'pending' ? (
          <>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() =>
                Alert.alert(
                  'Reject Request',
                  'Are you sure you want to reject this request?',
                  [
                    { text: 'No' },
                    { text: 'Yes', onPress: () => handleReject(item.id, item.userID) },
                  ]
                )
              }
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() =>
                Alert.alert(
                  'Accept Request',
                  'Are you sure you want to accept this request?',
                  [
                    { text: 'No' },
                    { text: 'Yes', onPress: () => handleAccept(item.id, item.userID) },
                  ]
                )
              }
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </>
        ) : item.status === 'rejected' ? (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              Alert.alert(
                'Cancel Request',
                'Are you sure you want to cancel this rejected request?',
                [
                  { text: 'No' },
                  { text: 'Yes', onPress: () => handleCancel(item.id, item.userID) },
                ]
              )
            }
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.statusAccepted}>{item.status}</Text>
        )}
      </View>
    </View>
  );

  const renderSkillsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSkillsModalVisible}
      onRequestClose={toggleSkillsModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Your Skills</Text>
          {workerData?.skills?.length > 0 ? (
            workerData.skills.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <Text style={styles.skillName}>{skill?.skillName || 'N/A'}</Text>
                <Text style={styles.skillDetails}>Experience: {skill?.experience || '0'} years</Text>
                <Text style={styles.skillDetails}>Description: {skill?.aboutWork || 'N/A'}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noSkillsText}>No skills available</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={toggleSkillsModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        Welcome {workerData?.name || 'Worker'}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {workerData?.rating ? workerData.rating.toFixed(1) : 'N/A'}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{jobsCompleted}</Text>
          <Text style={styles.statLabel}>Jobs Completed</Text>
        </View>
        <View style={styles.statCard}>
          <TouchableOpacity onPress={toggleSkillsModal}>
            <Text style={styles.statValue}>
              {workerData?.skills?.length || 0}
            </Text>
            <Text style={styles.statLabel}>Skills</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.availabilityCard}>
        <Text style={styles.availabilityTitle}>Availability</Text>
        <Text style={styles.availabilityDesc}>Toggle your profile visibility</Text>
        <Switch
          onValueChange={toggleAvailability}
          value={isAvailable}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor="#fff"
          disabled={isToggling}
        />
        <Text style={styles.availabilityText}>
          {isAvailable ? 'Available' : 'Not Available'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Hire Requests</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : hireRequests.length === 0 ? (
        <Text style={styles.noRequestsText}>No hire requests found.</Text>
      ) : (
        <FlatList
          data={hireRequests}
          renderItem={renderRequestItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      )}

      {renderSkillsModal()}
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  availabilityCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  availabilityDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    elevation: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  customerName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  jobText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  purpose: {
    fontSize: 13,
    color: '#4CAF50',
    fontStyle: 'italic',
    marginBottom: 3,
  },
  location: {
    fontSize: 13,
    color: '#666',
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 6,
    width : 65
  },
  acceptButton: {
    backgroundColor: '#28a745',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
  statusAccepted: {
    color: '#ffc107',
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  skillItem: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  skillDetails: {
    fontSize: 14,
    color: '#666',
  },
  noSkillsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});