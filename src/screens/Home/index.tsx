import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { fruitsData } from "../../helper/dummy";
import FlashMessage, { showMessage } from "react-native-flash-message";

const Home = () => {
  const [fruitData, setFruitData] = useState(fruitsData);

  const handleSearchData = (searchText: string) => {
    const filteredData = fruitsData.filter(
      (item) =>
        item?.name?.toLowerCase().indexOf(searchText?.toLowerCase() || "") !==
        -1
    );
    setFruitData(filteredData);
  };

  const onActionBtnPress = (item: any) => {
    showMessage({
      message: "Success!",
      description: `${item.name} Action recorded`,
      type: "success",
      icon: "success",
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View key={index} style={style.cardViewStyle}>
        <Image source={item.image} style={style.imageStyle} />

        <View>
          <Text>{item.name}</Text>
          <TouchableOpacity
            style={style.actionBtnStyle}
            onPress={() => {
              onActionBtnPress(item);
            }}
          >
            <Text style={style.btnTextStyle}>Add to Eat</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <FlashMessage position={"bottom"} />
      <TextInput
        placeholder="Search Her"
        style={style.textInputStyle}
        onChangeText={(text) => {
          handleSearchData(text);
        }}
      />
      <View style={style.listViewStyle}>
        <FlatList
          data={fruitData}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          ListEmptyComponent={() => (
            <View>
              <Text>Not Found</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInputStyle: {
    marginTop: 10,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  cardViewStyle: {
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  listViewStyle: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  imageStyle: {
    height: 100,
    width: 100,
  },
  actionBtnStyle: {
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  btnTextStyle: {
    color: "white",
  },
});

export default Home;
