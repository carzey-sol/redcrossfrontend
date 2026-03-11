import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react-native';
import { LoginApi } from '@/api/LoginApi';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    setLoading(true);
    try {
      const data = await LoginApi(username, password);
      console.log('Login data:', data);
      Alert.alert('Success', `Welcome, ${data.username || username}!`);
      setLoading(false);
      await SecureStore.setItemAsync('token', data.token);
      await SecureStore.setItemAsync('userid', data.userId.toString());
    
      router.replace('/(admin)');
      // Perform additional actions after successful login
    } catch (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1"
        >
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo and App Title */}
            <View className="items-center mb-12">
              <Image
                source={require("../assets/images/logo.png")}
                className="w-20 h-20"
                style={{ resizeMode: "contain" }}
              />
              <Text className="text-3xl font-bold text-red-500 mt-4">
                Red Cross App
              </Text>
              <Text className="text-gray-500 mt-2 text-center text-base">
                Sign in to access your account
              </Text>
            </View>

            {/* Login Form */}
            <View className="space-y-6">
              {/* Username Input */}
              <View>
                <Text className="text-gray-700 mb-2 font-medium text-base">Username</Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <Mail size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    className="w-full h-14 bg-white rounded-xl px-12 text-gray-800 border border-gray-200 text-base"
                    placeholder="Enter your username"
                    placeholderTextColor="#9CA3AF"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-gray-700 mb-2 font-medium text-base">Password</Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <Lock size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    className="w-full h-14 bg-white rounded-xl px-12 text-gray-800 border border-gray-200 text-base"
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    className="absolute right-4 top-4 z-10"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#6B7280" />
                    ) : (
                      <Eye size={20} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity 
                className="self-end"
                onPress={() => Alert.alert('Navigate to Forgot Password')}
              >
                <Text className="text-red-600 text-sm">Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                className={`h-14 rounded-xl justify-center items-center shadow-sm ${
                  loading ? 'bg-red-400' : 'bg-red-600'
                }`}
                onPress={() => {
                  router.push('/(admin)');
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white text-lg font-semibold">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              {/* Sign-up Option */}
              <View className="flex-row justify-center items-center space-x-1 mt-6">
                <Text className="text-gray-600 text-sm">Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => Alert.alert('Navigate to Signup')}
                >
                  <Text className="text-red-600 font-medium text-sm ml-1">Sign up</Text>
                </TouchableOpacity>
              </View>

              {/* Additional Info */}
              <View className="mt-8">
                <Text className="text-gray-500 text-xs text-center">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;