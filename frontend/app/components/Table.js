import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const CONTENT = {
    tableHead: ['Blood Pressure category', 'Systolic mm Hg (upper number)', ' ', 'Diastolic mm Hg (lower number)'],
    // tableTitle: ['Normal', 'Elevated', 'High Blood Pressure (Hypertension) Stage 1', 'High Blood Pressure (Hypertension) Stage 2', 'Hypertensive Crisis (consult your doctor immediately)'],
    tableData: [
      ['Normal', 'Less than 120', 'and', 'Less than 80'],
      [ 'Elevated', '120 - 129', 'and', 'Less than 80'],
      ['High Blood Pressure (Hypertension) Stage 1', '130 - 139', 'or', '80 - 89'],
      ['High Blood Pressure (Hypertension) Stage 2', '140 or higher', 'and/or', '90 or higher'],
      ['Hypertensive Crisis (consult your doctor immediately)', 'Higher than 180', 'and/or', 'Higher than 120'],
    ],
  };
  
  export default function Tables() {
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={CONTENT.tableHead}
            flexArr={[2, 1.5, 1, 1.5]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={CONTENT.tableTitle}
              style={styles.title}
              widthArr={[]}
              //heightArr={[40, 40, 70, 70, 70]}
              textStyle={styles.text}
            />
            <Rows
              data={CONTENT.tableData}
              flexArr={[2, 1.5, 1, 1.5]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 10, width: '100%', backgroundColor: 'plum' },
    head: { height: 70, backgroundColor: 'lightgrey'},
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#2ecc71'},
    row: { height: 40 },
    text: { textAlign: 'center', fontSize: 10 },
  });