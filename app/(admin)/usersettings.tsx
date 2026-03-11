import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileSettings = () => {
  const userDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    bloodType: "O+",
    age: 28,
    weight: "70 kg",
    lastHealthCheck: "2024-01-10"
  };

  const medicalHistory = {
    hasDiabetes: false,
    hasHeartCondition: false,
    hasHypertension: false,
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-red-500 px-6 pt-16 pb-8">
        <View className="items-center">
          <View className="bg-white p-4 rounded-full mb-3">
            <FontAwesome5 name="user" size={32} color="#EF4444" />
          </View>
          <Text className="text-white text-xl font-bold">{userDetails.name}</Text>
          <Text className="text-white opacity-80">{userDetails.email}</Text>
        </View>
      </View>

      {/* Personal Information Section */}
      <View className="p-6">
        <Text className="text-lg font-semibold text-gray-900 mb-3">Personal Information</Text>
        <View className="bg-white rounded-xl shadow-sm">
          <TouchableOpacity className="p-4 flex-row justify-between items-center border-b border-gray-100">
            <View className="flex-row items-center">
              <FontAwesome5 name="phone" size={16} color="#6B7280" className="mr-3" />
              <Text className="text-gray-600 ml-3">{userDetails.phone}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity className="p-4 flex-row justify-between items-center border-b border-gray-100">
            <View className="flex-row items-center">
              <FontAwesome5 name="weight" size={16} color="#6B7280" className="mr-3" />
              <Text className="text-gray-600 ml-3">{userDetails.weight}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="p-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <FontAwesome5 name="calendar-check" size={16} color="#6B7280" className="mr-3" />
              <Text className="text-gray-600 ml-3">Last Health Check: {userDetails.lastHealthCheck}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Medical History Section */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-3">Medical History</Text>
        <View className="bg-white rounded-xl shadow-sm">
          <View className="p-4 flex-row justify-between items-center border-b border-gray-100">
            <Text className="text-gray-600">Diabetes</Text>
            <Switch 
              value={medicalHistory.hasDiabetes}
              trackColor={{ false: "#cbd5e1", true: "#fee2e2" }}
              thumbColor={medicalHistory.hasDiabetes ? "#ef4444" : "#f3f4f6"}
            />
          </View>
          <View className="p-4 flex-row justify-between items-center border-b border-gray-100">
            <Text className="text-gray-600">Heart Condition</Text>
            <Switch 
              value={medicalHistory.hasHeartCondition}
              trackColor={{ false: "#cbd5e1", true: "#fee2e2" }}
              thumbColor={medicalHistory.hasHeartCondition ? "#ef4444" : "#f3f4f6"}
            />
          </View>
          <View className="p-4 flex-row justify-between items-center">
            <Text className="text-gray-600">Hypertension</Text>
            <Switch 
              value={medicalHistory.hasHypertension}
              trackColor={{ false: "#cbd5e1", true: "#fee2e2" }}
              thumbColor={medicalHistory.hasHypertension ? "#ef4444" : "#f3f4f6"}
            />
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-6 mb-8 space-y-3">
        <TouchableOpacity className="bg-red-500 py-3 rounded-xl">
          <Text className="text-white text-center font-semibold">Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border border-red-500 py-3 rounded-xl">
          <Text className="text-red-500 text-center font-semibold">Download Medical History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;