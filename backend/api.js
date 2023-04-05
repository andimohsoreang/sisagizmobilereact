import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios'

const ApiManager = axios.create ({
    baseURL: 'http://31.220.6.67:3000/',
    responseType: 'json',
    withCredentials: true

});

export default ApiManager