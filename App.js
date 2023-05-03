import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, Alert} from 'react-native';
import PrimaryButton from './PrimaryButton';



export default function App() {
  const emptyMap = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [map, setMap] = useState(emptyMap);
  
  const [currentTurn, setCurrentTurn] = useState('x');

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] != ""){
      Alert.alert("Position already occupied!");
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn == 'x' ? 'o' : 'x');

    checkWinningState();
    checkTieState();
  };

  const checkWinningState = () => {
    //ROW WINNER
    for (let i = 0; i < 3; i++){
      const isRowXWinner = map[i].every((cell) => cell == 'x');
      const isRowOWinner = map[i].every((cell) => cell == "o");

      if (isRowXWinner) {
        gameWonState("X");
      }
      if (isRowOWinner) {
        gameWonState("O");
      }
    }

    //COLUMN WINNER
    for (let col = 0; col < 3; col++) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for (let row = 0; row < 3; row++){
        if (map[row][col] !== 'x'){
          isColumnXWinner = false;
        }
        if (map[row][col] !== "o") {
          isColumnOWinner = false;
        }
      }

      if (isColumnXWinner) {
        gameWonState("X");
      }
      if (isColumnOWinner) {
        gameWonState("O");
      }
    }

    //DIAGONAL WINNER
    let isDiagonal1OWinner = true;
    let isDiagonal1XWinner = true;
    let isDiagonal2OWinner = true;
    let isDiagonal2XWinner = true;

    for (let i = 0; i < 3; i++){
    console.log(map[i][i]);
      if (map[i][i] !== "o"){
        isDiagonal1OWinner = false;
      }
      if (map[i][i] !== "x") {
        isDiagonal1XWinner = false;
      }

      if (map[i][2 - i] !== "o") {
        isDiagonal2OWinner = false;
      }
      if (map[i][2 - i] !== "x") {
        isDiagonal2XWinner = false;
      }
    }

      if (isDiagonal1OWinner) {
        gameWonState("O");
      }
      if (isDiagonal1XWinner) {
        gameWonState("X");
      }
      if (isDiagonal2OWinner) {
        gameWonState("O");
      }
      if (isDiagonal2XWinner) {
        gameWonState("X");
      }
  };

  const checkTieState = () => {
    if(!map.some(row => row.some(cell => cell == ''))){
      Alert.alert('It is a tie!', 'tie', [
        {
          text: "Restart",
          onPress: resetGame,
        }
      ])
    }
  }

  const gameWonState = (player) => {
      Alert.alert("Congratulations!", `Player ${player} won`, [
        {
          text: "Restart",
          onPress: resetGame,
        },
      ]);
    };

  const resetGame = () => {
    //console.log('reset');
    setMap(emptyMap);
    setCurrentTurn('x');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TIC TAC TOE</Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View style={styles.row} key={`${rowIndex}${row}`}>
              {row.map((cell, columnIndex) => (
                <Pressable
                  key={`${cell}${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)}
                  style={styles.cell}
                >
                  {cell == "o" && <Text style={styles.o}>O</Text>}
                  {cell == "x" && <Text style={styles.x}>X</Text>}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      <PrimaryButton onPress={() => resetGame()}>Reset</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242D34",
  },
  header: {
    marginBottom: 10,
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold'
  },
  cell: {
    flex: 1,
    margin: 5,
    backgroundColor: "#50575D",
  },
  x: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 75,
    fontWeight: "bold",
  },
  o: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 80,
    fontWeight: "bold",
  },
  map: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
