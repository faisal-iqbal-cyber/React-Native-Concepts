import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Rating from './Rating';

const Feedback = ({ route, navigation }) => {
  const { mazdoorID, customerID, requestId } = route.params || {};
  console.log("Mazdoor ID is: ", mazdoorID);
  console.log("Customer ID is: ", customerID);
  console.log("Request ID is: ", requestId);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workerDetails, setWorkerDetails] = useState({ name: 'Unknown', service: 'Unknown', image: require('../../assets/images/Work.png') });

 
  const fetchWorkerData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const workerResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}.json`
      );
      const workerData = await workerResponse.json();
      if (!workerData) {
        throw new Error('Worker data not found.');
      }

      setWorkerDetails({
        name: workerData.name || 'Unknown',
        service: workerData.skills?.[0]?.skillName || 'General Work',
        image: workerData.image ? { uri: workerData.image } : require('../../assets/images/Work.png'),
      });


      const feedbackResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}/Feedback.json`
      );
      const feedbackRaw = await feedbackResponse.json();
      const tempFeedback = [];

      if (feedbackRaw) {
        for (const id in feedbackRaw) {
          const feedback = feedbackRaw[id];
         
          const customerResponse = await fetch(
            `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/${feedback.customerID}.json`
          );
          const customerData = await customerResponse.json();
          
          tempFeedback.push({
            id,
            customerName: customerData?.name || 'Anonymous',
            rating: feedback.rating || 0,
            comment: feedback.comment || 'No comment',
            image: customerData?.image ? { uri: customerData.image } : require('../../assets/images/man.png'),
          });
        }
      }

      setFeedbackData(tempFeedback);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError('Failed to load feedback or worker data.');
      setLoading(false);
    }
  }, [mazdoorID]);

  useEffect(() => {
    if (!mazdoorID || !customerID) {
      setError('Missing worker or customer ID.');
      setLoading(false);
      return;
    }
    fetchWorkerData();
  }, [mazdoorID, customerID, fetchWorkerData]);


  const calculateAverageRating = () => {
    if (feedbackData.length === 0) return '0.0';
    const total = feedbackData.reduce((sum, item) => sum + item.rating, 0);
    return (total / feedbackData.length).toFixed(1);
  };

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === '') {
      Alert.alert('Error', 'Please provide a rating and a review.');
      return;
    }

    try {
    
      const customerResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/${customerID}.json`
      );
      const customerData = await customerResponse.json();
      if (!customerData) {
        throw new Error('Customer data not found.');
      }

  
      const feedbackPayload = {
        customerID,
        customerName: customerData.name || 'Anonymous',
        rating,
        comment: review,
        timestamp: new Date().toISOString(),
      };

      const feedbackResponse = await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}/Feedback.json`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedbackPayload),
        }
      );

      const feedbackResult = await feedbackResponse.json();
      if (!feedbackResult.name) {
        throw new Error('Failed to submit feedback.');
      }

    
      const feedbackRaw = await (await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}/Feedback.json`
      )).json();
      const allRatings = feedbackRaw
        ? Object.values(feedbackRaw).map(f => f.rating).filter(r => typeof r === 'number')
        : [rating];
      const averageRating = allRatings.length > 0
        ? (allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length).toFixed(1)
        : rating.toFixed(1);

      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Worker/${mazdoorID}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: parseFloat(averageRating) }),
        }
      );

  
      await fetch(
        `https://mazdoorfinderapp-default-rtdb.firebaseio.com/Customer/HireRequest/${customerID}/${requestId}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback: review, rating }),
        }
      );

      await fetchWorkerData();

      Alert.alert(
        'Thank You!',
        'Your feedback has been submitted!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('CustomerDashboard', { customerID });
            },
          },
        ],
        { cancelable: false }
      );

      setRating(0);
      setReview('');
    } catch (err) {
      console.error('Submit error:', err.message);
      Alert.alert('Error', 'Failed to submit feedback.');
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const averageRating = calculateAverageRating();
  const totalReviews = feedbackData.length;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.logo}>
          <Text style={styles.logoMini}>Asaan</Text>
          <Text style={styles.logoMain}>Kaam</Text>
        </Text>

        <View style={styles.seperator} />

        <View style={styles.header}>
          <Image
            source={workerDetails.image}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{workerDetails.name}</Text>

          <View style={styles.jobRow}>
            <MaterialCommunityIcons name="pipe-wrench" size={20} color="#007B83" />
            <Text style={styles.service}>{workerDetails.service}</Text>
          </View>

          <View style={styles.reviewSummary}>
            <Rating rating={parseFloat(averageRating)} onChange={() => {}} />
            <Text style={styles.avgText}>
              {averageRating} stars from {totalReviews} reviews
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Leave Your Feedback</Text>
        <Text style={styles.label}>Rate the service</Text>
        <Rating rating={rating} onChange={setRating} />

        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Write your feedback..."
          value={review}
          onChangeText={setReview}
        />
        <View style={styles.buttonWrapper}>
          <Button title="Submit Feedback" onPress={handleSubmit} color="#007B83" />
        </View>

        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {feedbackData.length === 0 ? (
          <Text style={styles.noReviewsText}>No reviews yet.</Text>
        ) : (
          feedbackData.map((item) => (
            <View key={item.id} style={styles.feedbackCard}>
              <View style={styles.topRow}>
                <Image source={item.image} style={styles.reviewerImage} />
                <View style={styles.nameRating}>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                  <View style={styles.ratingRow}>
                    <Rating rating={item.rating} onChange={() => {}} />
                    <Text style={styles.ratingText}>{item.rating}/5</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#F4F7FA',
  },
  logo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  logoMini: {
    fontSize: 14,
    color: '#333',
  },
  logoMain: {
    fontSize: 27,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  seperator: {
    borderBottomColor: '#999',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 70,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  service: {
    fontSize: 16,
    color: '#007B83',
    marginLeft: 6,
  },
  reviewSummary: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  avgText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  nameRating: {
    flex: 1,
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginTop: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    marginLeft: 10,
    color: '#666',
  },
  comment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 15,
    marginTop: 4,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});