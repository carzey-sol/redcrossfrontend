    import React, { useState, useEffect } from 'react';
    import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
    import { FontAwesome5 } from '@expo/vector-icons';
    import { userData } from '@/api/userData';
    import * as SecureStore from 'expo-secure-store';
    import { donationHistory } from '@/api/donationHistory';

    const Donations = () => {
      const [userDetails, setUserDetails] = useState({}); // Default as object
      const [donation, setDonation] = useState([]);
      const [loadingUserData, setLoadingUserData] = useState(false); // Loading state for user data
      const [loadingDonationHistory, setLoadingDonationHistory] = useState(false); // Loading state for donation history

      // Function to fetch user data
      const getData = async () => {
        const id = await SecureStore.getItemAsync('userid');
        if (!id) {
          console.error('User ID not found');
          return;
        }
        try {
          const response = await userData(id); // Pass as an object
          setUserDetails(response);
          console.log('User Data:', response);
        } catch (error) {
          console.log('Error fetching user data:', error.message);
        } finally {
          setLoadingUserData(false); // Stop loading when data is fetched
        }
      };

      // Function to fetch donation history
      const getDonations = async () => {
        const id = await SecureStore.getItemAsync('userid');
        if (!id) {
            console.error('User  ID not found');
            return;
        }
        try {
            const response = await donationHistory(id);
            setDonation(response); // Ensure setDonation is defined in the context
            console.log('Donation History:', response);
        } catch (error) {
            // Log the entire error object for more context
            console.error('Error fetching donation history:', error);
        } finally {
            setLoadingDonationHistory(false); // Stop loading when data is fetched
        }
      };

      useEffect(() => {
        getData();
        getDonations();
      }, []);

      // Upcoming scheduled donation
      const upcomingDonation = {
        date: "2024-02-20",
        location: "City Hospital",
        time: "10:00 AM",
        type: "Whole Blood"
      };

      return (
        <ScrollView className="flex-1 bg-gray-50">
          {/* Header */}
          <View className="bg-red-500 px-6 pt-16 pb-8">
            <Text className="text-white text-2xl font-bold">My Donations</Text>
            <Text className="text-white opacity-80">Track your donation history</Text>
          </View>

          {/* Next Scheduled Donation */}
          {loadingUserData ? (
            <ActivityIndicator size="large" color="#EF4444" />
          ) : upcomingDonation ? (
            <View className="mx-6 -mt-6">
              <View className="bg-white rounded-xl shadow-sm p-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">Next Scheduled Donation</Text>
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">{upcomingDonation.date}</Text>
                    <Text className="text-gray-900 font-medium">{upcomingDonation.location}</Text>
                    <Text className="text-gray-500">{upcomingDonation.time}</Text>
                  </View>
                  <View className="bg-red-50 px-3 py-1 rounded-full">
                    <Text className="text-red-500 font-medium">{upcomingDonation.type}</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <Text>No donation Scheduled</Text>
          )}

          {/* Donation Stats */}
          {loadingUserData ? (
            <ActivityIndicator size="large" color="#EF4444" />
          ) : (
            <View className="flex-row mx-6 mt-4 space-x-4 gap-2">
              <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                <FontAwesome5 name="tint" size={20} color="#EF4444" />
                <Text className="text-2xl font-bold text-gray-900 mt-2">{userDetails.donationCount}</Text>
                <Text className="text-gray-600">Total Donations</Text>
              </View>
              <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                <FontAwesome5 name="calendar" size={20} color="#EF4444" />
                <Text className="text-2xl font-bold text-gray-900 mt-2">{userDetails.quantity} ml</Text>
                <Text className="text-gray-600">Total Volume</Text>
              </View>
            </View>
          )}

          {/* Donation History */}
          <View className="mx-6 mt-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Donation History</Text>

            {loadingDonationHistory ? (
              <ActivityIndicator size="large" color="#EF4444" />
            ) : donation?.length > 0 ? (
              donation.map((donationItem, index) => (
                <TouchableOpacity
                  key={donationItem.id || index} // Fallback to index if ID is missing
                  className="bg-white p-4 rounded-xl shadow-sm mb-3"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <View>
                      <Text className="text-gray-900 font-semibold">{donationItem.campaign}</Text>
                      <Text className="text-gray-600">
                        {new Date(donationItem.donationDate).toLocaleDateString()} {/* Format Date */}
                      </Text>
                    </View>
                    <View className="bg-green-50 px-3 py-1 rounded-full">
                      <Text className="text-green-500 font-medium">{donationItem.status}</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-gray-500">Whole Blood</Text>
                    <Text className="text-gray-900 font-medium">{donationItem.quantity} ml</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-500 text-center">No donation history found</Text> // Show empty state
            )}
          </View>

          {/* Action Buttons */}
          <View className="px-6 py-8 space-y-3">
            <TouchableOpacity className="bg-red-500 py-3 rounded-xl" onPress={() => getDonations()}>
              <Text className="text-white text-center font-semibold">Schedule New Donation</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border border-red-500 py-3 rounded-xl">
              <Text className="text-red-500 text-center font-semibold">Download Donation Certificate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    };

    export default Donations;
