    import React, { useEffect, useState } from 'react';
    import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
    import { FontAwesome5 } from '@expo/vector-icons';
    import * as SecureStore from 'expo-secure-store';
    import { userData } from '@/api/userData';
    import { donations } from '@/api/donations';




    const getData = async (setUserDetails) => { 
      const id = await SecureStore.getItemAsync('userid');
      try {
        // Call the userData function to get the user data
        const response = await userData(id);
        setUserDetails(response); // Update state directly here
        console.log(response);
      } catch (error) {
        console.log('Error fetching data:', error.message);
      } finally {
        console.log('done');
      }
    };

    const getCampaigns = async (setCampaigns: any) => {
      try {
        // Call the userData function to get the user data
        const response = await donations();
        setCampaigns(response); // Update state directly here
        console.log(response);
      } catch (error) {
        console.log('Error fetching data:', error.message);
      } finally {
        console.log('done');
      }
    };

    const Index = () => {
      const [userDetails, setUserDetails] = useState([]);
      const [campaigns, setCampaigns] = useState([]);
      useEffect(() => {
        getData(setUserDetails);
        getCampaigns(setCampaigns); 
      }, [])

      const userData = {
        name: "John Doe",
        bloodType: "O+",
        lastDonation: "2024-01-15",
        totalDonations: 5,
        eligibleToDonateDays: 12,
      };

      const upcomingDrives = [
        {
          "id": 1,
          "name": "Birtamode Donation",
          "address": "Birtamode",
          "status": "Active",
          "branch": "Birtamode",
          "startDate": "2025-02-05T18:15:00",
          "endDate": "2025-02-05T18:15:00",
          "createdDate": "2025-02-06T11:03:54.439472",
          "createdBy": "SuperAdmin"
        },
        {
          "id": 2,
          "name": "Donate Blood Save Life",
          "address": "Birtamode",
          "status": "Active",
          "branch": "Birtamode",
          "startDate": "2025-02-05T18:15:00",
          "endDate": "2025-02-05T18:15:00",
          "createdDate": "2025-02-06T11:04:49.577359",
          "createdBy": "SuperAdmin"
        }
      ];

      return (
        <View className="flex-1 bg-gray-50">
          <ScrollView className="flex-1 ">
            {/* Header Section */}
            <View className="bg-red-500 px-6 pt-16 pb-8">
              <Text className="text-white text-lg">Welcome back,</Text>
              <Text className="text-2xl font-bold text-white">{userDetails.name || "User"}</Text>
            </View>

            {/* Blood Type Card */}
            <View className="mx-6 -mt-4 p-4 bg-white rounded-xl shadow-sm flex-row items-center  gap-2 space-x-4">
              <FontAwesome5 name="tint" size={24} color="#EF4444" />
              <Text className="text-lg font-semibold text-gray-900">
                Blood Type: {userDetails.bloodType}
              </Text>
            </View>

            {/* Stats Grid */}
            <View className="mx-6 mt-4 flex-row space-x-4 gap-2">
              <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                <Text className="text-2xl font-bold text-red-500">{userDetails.donationCount}</Text>
                <Text className="text-gray-600">Total Donations</Text>
              </View>
              <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                <Text className="text-2xl font-bold text-red-500">
                {
  userDetails.lastDonationDate ? (() => {
    const lastDonation = new Date(userDetails.lastDonationDate);
    const nextEligibleDate = new Date(lastDonation.setDate(lastDonation.getDate() + 56));
    const diffTime = nextEligibleDate - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `${diffDays}`;
    } else if (diffDays === 0) {
      return 'Eligible';
    } else {
      return 'Eligible';
    }
  })() : ''
}
                </Text>
                <Text className="text-gray-600">Days Until Eligible</Text>
              </View>
            </View>

            {/* Last Donation */}
            <View className="mx-6 mt-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">Last Donation</Text>
              <View className="bg-white p-4 rounded-xl shadow-sm">
                <Text className="text-gray-600">{userDetails.lastDonationDate ? new Date(userDetails.lastDonationDate).toISOString().split('T')[0] : ''}</Text>
              </View>
            </View>

            {/* Upcoming Blood Drives - Vertical Scrollable */}
            {/* Upcoming Blood Drives - Vertical Scrollable */}
<View className="mt-4 mx-6">
  <Text className="text-lg font-semibold text-gray-900 mb-2">Upcoming Blood Drives</Text>
  <View className="h-[280px]">
    <ScrollView 
      showsVerticalScrollIndicator={false}
      className="rounded-xl"
    >
      {upcomingDrives.map(drive => (
        <TouchableOpacity
          key={drive.id}  
          className="bg-white p-4 rounded-xl shadow-sm mb-2"
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-lg">{drive.name}</Text>
              <Text className="text-gray-600 mt-1">{drive.address}</Text>
              <Text className="text-gray-500">{new Date(drive.startDate).toLocaleString()}</Text>
              <Text className="text-gray-500">{new Date(drive.endDate).toLocaleString()}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#6B7280" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
</View>

            {/* Quick Actions */}
            <View className="mx-6 my-8">
              <TouchableOpacity
                className="bg-red-500 py-3 rounded-xl"
                onPress={() => getData(setUserDetails)}
              >
                <Text className="text-white text-center font-semibold">Schedule Donation</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    };

    export default Index;
