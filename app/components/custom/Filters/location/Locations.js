import React, { Component } from "react";
import { View, TouchableOpacity, Text, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globals, helpers, colors, fonts } from "../../../../configs";
import { _ListWrap } from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import {
  setFilterPropArr,
  resetFilterArr,
} from "../../../../redux/actions/FilterWrapperAction";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import { useEffect } from "react";
const { FILTERS_FOR } = globals;

function Locations(props){
   const [searchTxt,setSearchTxt] = useState('');
   const [filterFor,setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT);
   const [showlist,setShowList] = useState(true);

   useEffect(()=>{
    if (props.filterFor && props.filterFor !== state.filterFor) 
           setFilterFor(nextProps.filterFor || FILTERS_FOR.DEFAULT)
   },[props])

   useEffect(()=>{
    return ()=>{
        Keyboard.dismiss();
    }
   })

const {filtersData,localize} = useSelector(state => state);
const dispatch = useDispatch();

const setLocation = (item) => {
    const { single, cb } = props;
    console.log('item',item)

    if (single) {
     dispatch(resetFilterArr("location", filterFor));
    }

    dispatch(setFilterPropArr(
      { type: "location", data: item, single: single ? single : false },
      filterFor,
    ));

    if (cb) {
      cb();
    }
  };

return(
    <View style={[mainStyles.rootView, { backgroundColor: colors.white }]} keyboardShouldPersistTaps={'always'}>
        <GooglePlacesAutocomplete
          placeholder={helpers.getLocale(localize, "home", "search")}
          minLength={2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={true}
          listViewDisplayed={false}
          enablePoweredByContainer={false}
          textInputProps={{ onBlur:()=>null}}
          query={{
            key: globals.CREDS.GOOGLE_SEARCH_PLACES_KEY,
            language: "en",
          }}
          onPress={(data, details) => {
            console.log("Called")
            let locationObj = {
              address: details.formatted_address,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
           _setLocation(locationObj);
           setShowList(false);
        
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "#fff",
              overflow: "hidden",
              height: 38,
            },
            container: {
              borderColor: colors.black,
              borderBottomWidth: 0.5,
              // borderTopWidth: 0.5,
            },
            textInput: {
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              height: 38,
              color: colors.black,
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            description: { placeholderTextColor: colors.black },
            listView: {
              marginTop: 50,
              elevation: 1,
              backgroundColor: "white",
              position: "absolute",
              zIndex: 500,
            },
            seperator: { backgroundColor: colors.white },
          }}
          currentLocation={false}
          debounce={200}
        />
      </View>
)

}
export default mainLayoutHoc({})(Locations)