import React from 'react';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

// Add GET_STUDENT Mutation here


export default function DisplayStudents(){

    // Invoke Apollo's useQuery() Hook here

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View>
            <Text>Students</Text>
            {
                data.students.map((student) =>
                    (
                        <View key={student.id}>
                            <Text>{student.firstName} {student.lastName}</Text>
                        </View>
                    )
                )
            }
        </View>
    );
}


