import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
  } from "react";
  import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
    FlatList,
    Modal
  } from "react-native";
  import Entypo from "@expo/vector-icons/Entypo";
  import MaterialIcons from "@expo/vector-icons/MaterialIcons";
  import { Dropdown } from "react-native-element-dropdown";
  import { LinearGradient } from "expo-linear-gradient";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
  import { fetchBloodGroup } from "@/api/fetchBloodGroup";
  import { fetchDonorData } from "@/api/fetchDonorData";
  import LoginPrompt from "@/components/popups/LoginPrompt";
  import { useRouter } from 'expo-router'; // For navigation
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from 'expo-blur';
  
  const Index = () => {
    const router = useRouter();
    const [loggedin, isloggedin] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
    const [bloodGroups, setBloodGroups] = useState([]);
    const [selectedBloodGroupId, setSelectedBloodGroupId] = useState(0);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [donors, setDonors] = useState([]);
  
    useEffect(() => {
      fetchBloodGroup(setBloodGroups);
    }, []);
  
    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);
  
    const handleSelect = (item: any) => {
      setSelectedBloodGroupId(item.value);
      setValue(item.value);
      console.log("Selected Blood Group ID:", item.value);
      console.log("Selected Blood Group Name:", item.label);
    };
  
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
  
    const handleSearch = async () => {
      if (selectedBloodGroupId) {
        await fetchDonorData(selectedBloodGroupId, setDonors);
        handleOpenSheet();
      } else {
        Alert.alert(
          "No Blood Group Selected",
          "Please Select a Blood Group to Search for Donors"
        );
      }
    };
  
    const handleCloseSheet = () => {
      console.log("BottomSheet is closed");
      setIsSheetVisible(false);
    };
  
    const handleOpenSheet = () => {
      if (selectedBloodGroupId) {
        setIsSheetVisible(true);
        bottomSheetRef.current?.snapToIndex(2);
      } else {
        Alert.alert(
          "No Blood Group Selected",
          "Please Select a Blood Group to Search for Donors"
        );
      }
    };
    const navigateToLogin = () => {
      console.log("jjjjjjj")
      router.push("/Login"); // Navigate to the Login page
      bottomSheetRef.current?.close();
    };
  
    // Flatlist component
    const DonorList = ({ donors }) => {
      return (
        <FlatList
          data={donors}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingVertical: 16,
            paddingHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-4 rounded-xl shadow-sm w-full">
              {/* Donor Name Section */}
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="account-circle" size={30} color="#4B5563" />
                <Text className="text-xl font-semibold ml-3 text-gray-800">
                  {item.name}
                </Text>
              </View>
  
              {/* Donor Contact Info */}
              <View className="flex-row flex-wrap gap-4 mt-2">
                <View className="flex-row gap-2 items-center">
                  <Entypo name="mobile" size={16} color="#4B5563" />
                  <Text className="text-gray-700">{item.mobileNumber}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <MaterialIcons name="email" size={16} color="#4B5563" />
                  <Text className="text-gray-700">{item.email}</Text>
                </View>
              </View>
  
              {/* View Details Button */}
              <TouchableOpacity
                className="bg-red-500 mt-4 py-2 rounded-xl shadow-sm"
                onPress={() => {
                  if (!loggedin) {
                    toggleModal();
                    bottomSheetRef.current?.close() // Show the login prompt if not logged in
                  } else {
                    bottomSheetRef.current?.close()
                    router.push('/dashboard'); // Navigate to dashboard if logged in
                  }
                }}
              >
                <Text className="text-white font-bold text-center text-lg">
                  View Full Details
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      );
    };
  
    return (
      <>
      {/* Login Prompt Modal */}
      <SafeAreaView>
      <Modal
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={toggleModal}
            transparent={true}
            className="flex-1 justify-center items-center backdrop-blur-md bg-transparent"
            
          >
             <BlurView intensity={200}  style={StyleSheet.absoluteFillObject} />
            <LoginPrompt visible={isModalVisible} onClose={toggleModal}  navigateToLogin={navigateToLogin}
            />
           
          </Modal>
          </SafeAreaView>
        <GestureHandlerRootView style={styles.container}>
          <StatusBar hidden={true} />
          <LinearGradient
            colors={["#ffcccc", "#ffffff"]}
            style={styles.background}
          />
          
  
          <View className="mx-5 mt-5 ml-auto">
            <Text className="font-poppins-bold text-sm">
              {!loggedin ? (
                <TouchableOpacity
                  style={{ elevation: 5 }}
                  className="justify-center items-center flex-row gap-2 p-2 rounded-xl bg-white"
                 onPress={()=> router.push('/Login')}
                >
                  <Entypo name="login" size={20} color="black" />
                  <Text>Login</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ elevation: 5 }}
                  className="justify-center items-center flex-row gap-2 p-2 rounded-xl bg-white"
                >
                  <MaterialIcons name="dashboard" size={20} color="black" />
                  <Text>Dashboard</Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
          {/* Welcome and image  */}
          <View className="flex-1 justify-center items-center">
            <View
              className="justify-center items-center border-2 border-red-500 rounded-full p-2 mb-2 bg-white"
              style={{ width: 60, height: 60, elevation: 5 }}
            >
              <Image
                source={require("../assets/images/logo.png")}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                }}
              />
            </View>
            <Text className="font-poppins text-2xl mb-10">
              Welcome to Redcross App
            </Text>
  
            {/* Search component for blood donors */}
            <View
              style={{
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="bg-red-500 p-5 rounded-xl"
            >
              <Text
                style={{
                  color: "white",
                  textTransform: "uppercase",
                }}
                className="font-poppins-bold text-sm text-center mb-5"
              >
                Search Blood Donors
              </Text>
  
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={bloodGroups.map((group) => ({
                  label: group.name,
                  value: group.id,
                }))}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select Blood Group" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleSelect}
              />
              <TouchableOpacity
                onPress={() => {
                  handleSearch();
                  handleOpenSheet();
                  console.log("Selected Blood Group ID:", selectedBloodGroupId);
                }}
                style={{
                  width: "50%",
                  textAlign: "center",
                }}
                className="bg-white p-2 mt-5 rounded-xl"
              >
                <Text className="font-poppins-bold text-sm text-center">
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            onClose={handleCloseSheet}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: "red" }}
            index={isSheetVisible ? 2 : -1}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "poppins-regular",
                    color: "white",
                    padding: 10,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Selected Blood Group: {selectedBloodGroupId}
                </Text>
              </View>
              <DonorList donors={donors} />
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 550,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: "center",
    },
    dropdown: {
      width: 200,
      height: 50,
      backgroundColor: "white",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
    },
    placeholderStyle: {
      fontSize: 16,
      color: "black",
    },
    selectedTextStyle: {
      fontSize: 16,
      color: "black",
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
  
  export default Index;