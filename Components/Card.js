import React from "react";
import { View, Image, Text, StyleSheet,Dimensions, TouchableOpacity } from "react-native";
import image from "../assets/images/Athen_Logo.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useTheme } from "@react-navigation/native";

const Card = (props) => {
  const {colors}=useTheme();
  const navigation = useNavigation();
  const textColor=colors.iconColor;
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("videoplayer",{videoId: props.videoId,title: props.title,channel:  props.channel})}>
    <View style={styles.parentall}>
      <Image source={{uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}} style={{ width: "100%", height: 200 }} />
      <View style={styles.icons}>
        <MaterialIcons name="account-circle" size={40} color={textColor} />
        <View style={styles.info}>
          <Text style={{fontWeight: 'bold',
    width: Dimensions.get("screen").width-50,color: textColor}} ellipsizeMode="tail" numberOfLines={2}>{props.title}</Text>
          <Text style={{color: textColor}}>{props.channel}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  parentall:{
    marginBottom: 10,
  },
  icons: {
    flexDirection: "row",
    marginTop: 5
  },
  info:{
    flexDirection: 'column',
  },
  infoheader:{
    

  }
});
