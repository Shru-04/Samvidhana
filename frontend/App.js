import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
  Animated,
  ActivityIndicator,
  LogBox,
  Dimensions,
  ScrollView,
} from "react-native";
LogBox.ignoreAllLogs();
import poemText from "./poem";
import { Picker } from "@react-native-picker/picker";
import { Input, Icon } from "@rneui/base";
import emblem from "./assets/indian-emblem.png";
import axios from "axios";
let backend_url = "http://8f08-34-125-184-177.ngrok.io";
const password = "404";
let newUrl = backend_url;
export default function App() {
  const units = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"];
  const [unit, setUnit] = useState("Unit 1");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerLoaded, setAnswerLoaded] = useState(false);
  const [poem, setPoem] = useState(false);
  const [editURL, setEditURL] = useState(false);
  const [rootPassword, setRootPassword] = useState("");
  var i = 0;
  const [unitSelect, setUnitSelect] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);
  BackHandler.addEventListener("hardwareBackPress", () => {
    setUnitSelect(false);
  });
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity:
  const titlePos = useRef(new Animated.Value(200)).current;
  const load_anim = () => {
    fadeAnim.setValue(0);
    titlePos.setValue(200);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
    setTimeout(
      () =>
        Animated.timing(titlePos, {
          toValue: 0,
          duration: 500,
        }).start(),
      4500
    );
  };
  useEffect(load_anim, [fadeAnim]);

  return loading ? (
    <View style={{ ...styles.container }}>
      <Animated.View
        style={{
          position: "absolute",
          top: titlePos,
          left: Dimensions.get("screen").width / 2 - 75
        }}
      >
        <Text
          style={{
            flex: 1,
            backgroundColor: "#0e142b",
            color: "#FFD700",
            fontSize: 50,
            textAlign: "center",
          }}
        >
          ಸಂವಿಧಾನ
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <Image
          style={{
            alignSelf: "center",
            position: "absolute",
            top: Dimensions.get("screen").height / 2 - 450,
            left: Dimensions.get("screen").width / 2 - 50,
          }}
          source={emblem}
        />
      </Animated.View>
    </View>
  ) : editURL ? (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 25, color: "white" }}>
        Backend URL
      </Text>
      <Input
        onChangeText={(text) => {
          newUrl = text;
          console.log(newUrl)
        }}
        style={{ textAlign: "center", color: "grey" }}
      >{newUrl}</Input>
      <Text style={{ textAlign: "center", fontSize: 25, color: "white" }}>
        Root password
      </Text>
      <Input secureTextEntry={true}
        onChangeText={(text) => {
          setRootPassword(text);
        }}
        style={{ textAlign: "center", color: "grey" }}
      />
      <View style={{ marginTop: 20, marginHorizontal: 130 }}>
        <Button title="Change" onPress={()=>{
          if(rootPassword==password){
            backend_url = newUrl;
            alert("URL changed successfully");
            console.log(newUrl)
            setRootPassword("")
            setEditURL(false)
          } else {
            newUrl = backend_url;
            alert("Incorrect password");
            i++;
            if(i>=3){
              i=0;
              setEditURL(false);
            }
          }
        }} />
      </View>
    </View>
  ) : poem ? (
    <>
      <ScrollView style={{ backgroundColor: "#0e142b" }}>
        <Text
          style={{
            fontSize: 35,
            color: "#FFD700",
            textAlign: "center",
            margin: 20,
          }}
        >
          The Bird of Freedom
        </Text>
        <Text style={{ color: "white", fontSize: 18, margin: 10 }}>
          {poemText}
        </Text>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#0e142b",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Button
          color={poem ? "grey" : ""}
          onPress={() => {
            setPoem(false);
          }}
          title="  Home  "
        />
        <Text style={{ opacity: 0 }}>Hello</Text>
        <Icon
          color="white"
          name="link"
          size={25}
          type="font-awesome"
          onPress={() => {
            setEditURL(true);
          }}
        />
        <Text style={{ opacity: 0 }}>Hello</Text>
        <Button
          color={poem ? "" : "grey"}
          onPress={() => {
            setPoem(true);
          }}
          title="  Poem  "
        />
        
      </View>
      <Text
        style={{ opacity: 1, color: "#0e142b", backgroundColor: "#0e142b" }}
      >
        Hello
      </Text>
    </>
  ) : (
    <>
      <View style={{ ...styles.container, flexDirection: "row" }}>
        <Icon
          color="white"
          name="arrow-left"
          size={25}
          type="font-awesome"
          style={{
            marginLeft: 30,
            marginTop: 40,
            opacity: unitSelect ? 1 : 0,
          }}
          onPress={() => {
            setUnitSelect(false);
            setAnswerLoaded(false);
          }}
        />
        <Text
          onPress={() => {
            setLoading(true);
            fadeAnim.setValue(0);
            load_anim();
            setTimeout(() => setLoading(false), 5000);
          }}
          style={{
            flex: 1,
            backgroundColor: "#0e142b",
            color: "#FFD700",
            fontSize: 50,
            textAlign: "center",
            marginTop: 20,
            marginLeft: 0,
            opacity: 1,
          }}
        >
          ಸಂವಿಧಾನ
        </Text>
      </View>
      {unitSelect ? (
        <>
          <View style={{ marginTop: -500, backgroundColor: "#0e142b" }}></View>
          {answerLoading ? (
            <>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 25,
                    marginTop: 150,
                    marginHorizontal: 20,
                  }}
                >
                  Tired of waiting?{"\n"}
                  Why don't you read the poem by the time the answer loads
                </Text>
              </View>
              <ActivityIndicator
                style={styles.container}
                size="large"
                animating={answerLoading}
              />
            </>
          ) : answerLoaded ? (
            <View style={styles.container}>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  textAlign: "center",
                  marginTop: -150,
                }}
              >
                {answer}
              </Text>
            </View>
          ) : (
            <View style={styles.container}>
              <Text
                style={{
                  color: "#41a1f0",
                  textAlign: "center",
                  fontSize: 25,
                }}
              >
                Enter question
              </Text>
              <Input
                style={{ fontSize: 20, color: "white" }}
                placeholder="Type question here"
                onChangeText={(text) => {
                  setQuestion(text);
                }}
              />
              <View style={{ marginTop: 20, marginHorizontal: 150 }}>
                <Button
                  onPress={() => {
                    axios
                      .post(
                        `${backend_url}/run?question=${question}&unit=${unit.charAt(
                          5
                        )}`
                      )
                      .then((data) => {
                        console.log(data.data);
                        setAnswer(data.data.answer);
                        setAnswerLoaded(true);
                        setAnswerLoading(false);
                        setUnitSelect(true);
                      })
                      .catch((err) => {
                        console.log(err);
                        setAnswerLoading(false);
                      });
                    console.log(
                      `${backend_url}/run?question=${question}&unit=${unit.charAt(
                        5
                      )}`
                    );
                    setAnswerLoading(true);
                  }}
                  title="Go"
                />
              </View>
              <StatusBar style="auto" />
            </View>
          )}
        </>
      ) : (
        <>
          <View style={{ marginTop: -500, backgroundColor: "#0e142b" }}></View>
          <View style={styles.container}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#41a1f0",
              }}
            >
              Select Unit
            </Text>
            <Picker
              style={{ color: "white" }}
              itemStyle={{ fontSize: 30 }}
              selectedValue={unit}
              onValueChange={(itemValue, itemIndex) => {
                setUnit(itemValue);
                console.log(unit);
              }}
              placeholder="Select Unit"
            >
              {units.map((unit) => (
                <Picker.Item
                  key={unit.charAt(5) - 1}
                  label={unit}
                  value={unit}
                />
              ))}
            </Picker>
            <View style={{ marginTop: 20, marginHorizontal: 130 }}>
              <Button
                onPress={() => {
                  setUnitSelect(true);
                }}
                title="Select"
              />
            </View>
            <StatusBar style="auto" />
          </View>
        </>
      )}
      <View
        style={{
          backgroundColor: "#0e142b",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Button
          color={poem ? "grey" : ""}
          onPress={() => {
            setPoem(false);
          }}
          title="  Home  "
        />
        <Text style={{ opacity: 0 }}>Hello</Text>
        <Icon
          color="white"
          name="link"
          size={25}
          type="font-awesome"
          onPress={() => {
            setEditURL(true);
          }}
        />
        <Text style={{ opacity: 0 }}>Hello</Text>
        <Button
          color={poem ? "" : "grey"}
          onPress={() => {
            setPoem(true);
          }}
          title="  Poem  "
        />
      </View>
      <Text
        style={{ opacity: 1, color: "#0e142b", backgroundColor: "#0e142b" }}
      >
        Hello
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e142b",
    color: "#182152",
    // alignItems: 'center',
    justifyContent: "center",
  },
});
