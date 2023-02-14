import React, { forwardRef, useEffect, useReducer, useRef, useState,useImperativeHandle } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
  StatusBar,
  ScrollView,
  Text
} from "react-native";

import { globals, colors, images, sty, ApiCall, helpers, localize } from "../../../configs";
import { _Lang, _Header } from "../../custom";
import { styles } from "./styles";
import { TabView, TabBar } from "react-native-tab-view";
import ContentType from "./contentType/ContentType";//
import Relevance from "./relevance/Relevance";//
import Status from "./status/Status";//
import Locations from "./location/Locations";//
import LocationCountry from "./locationCountry/LocationCountry";//
import Categories from "./categories/Categories";//
import Radius from "./radius/Radius";//
import Price from "./price/Price";//
import Hashtag from "./hashtag/Hashtag";//
import OfferTag from "./offerTag/OfferTag";//
import InquiryTag from "./inquiryTag/InquiryTag";//
import Gender from "./gender/Gender";//
import Age from "./age/Age";//

import { resetFilters } from "../../../redux/actions/FilterWrapperAction";
import { setFilterDataProp } from "../../../redux/actions/FiltersDataAction";
import { findIndex } from "lodash";
import TabHeader from "../ContentTypes/common/TabHeader";
import Remote from "./job/Remote";
import JobCategory from "./job/JobCategory";
import { useDispatch, useSelector } from "react-redux";

const { FILTERS_TYPES, FILTERS_FOR, FILTERS_TO_SHOW, FILTER_ROUTES } = globals;

const FiltersContent=(props)=>{

  const dispatch = useDispatch();
  const loginData= useSelector(state=>state.loginData);
  const filtersApiData = useSelector(state => state.filtersApiData)
  const localize = useSelector(state => state.localize)

  const { singleSelect, removeBlogFilter } = props;

  const [state, setstate]= useState({
    index: findIndex(
      FILTER_ROUTES.filter((item) => {
        return FILTERS_TO_SHOW[
          props.filterFor || FILTERS_FOR.DEFAULT
        ].includes(item.key)
          ? true
          : false;
      }),
      (rt) => rt.key === props.filterKey,
    ),
    routes: FILTER_ROUTES,
    filterFor: props.filterFor || FILTERS_FOR.DEFAULT,
    tabIndex: props.filterKey =="offerTag"?2:1,
    tabRoutes: [
    //   {
    //   index: 0,
    //   key: "Filter",
    //   icon: ["ios-compass-outline", "ios-compass"],
    //   text: "filters.relevance",
    //   logo: "homeExplore",
    // },
      
      {
        index: 1,
        key: "location",
        icon: ["ios-paper-outline", "ios-paper"],
        text: "filters."+props.filterKey,
        logo: "homeNews",
      },
      // {
      //   index: 2,
      //   key: "hastags",
      //   icon: ["ios-paper-outline", "ios-paper"],
      //   text: "filters.offerTag",
      //   logo: "homeNews",
      // },
    ]
  })
  let scrollListRef = null;

  useEffect(()=>{
    ApiCall.getFiltersData("offerTag").then((data) => {
      console.log("offerTag", data);
      dispatch(setFilterDataProp({
        prop: "offerTag",
        value: data,
      }));
    });
    const routes = state.routes.filter((item) => {
      return FILTERS_TO_SHOW[
        props.filterFor || FILTERS_FOR.DEFAULT
      ].includes(item.key)
        ? true
        : false;
    });
    let index = findIndex(routes, (rt) => rt.key === props.filterKey);

    index = index !== -1 ? index : 0;
    setstate({...state,
      routes:routes,
      index:index,
    });
    scrollListRef &&
      scrollListRef.scrollToIndex({ animated: true, index: index });
  },[])
 //FIXME: check   ref tags inside _renderTabs
 const  _renderTabs = (route) => {

    switch (route.key) {
      case FILTERS_TYPES.USER_GROUPS:
        return null;
      //return <UserGroups ref={ref => userGroups = ref} filterFor={filterFor} />
      case FILTERS_TYPES.RELEVANCE:
        return (
          <Relevance
            ref={(ref) => (relevance = ref)}
            filterFor={state.filterFor}
          />
        );
      case FILTERS_TYPES.REMOTE_TRUE:
        return (
          <Remote ref={(ref) => (remote = ref)} filterFor={state.filterFor} />
        );
      case FILTERS_TYPES.JOBCATEGORY:
        return (
          <JobCategory ref={(ref) => (job = ref)} filterFor={state.filterFor} />
        );
      case FILTERS_TYPES.STATUS:
        return (
          <Status ref={(ref) => (status = ref)} filterFor={state.filterFor} />
        );
      case FILTERS_TYPES.CONTENT_FILTER:
        return (
          <ContentType
            removeBlogFilter={removeBlogFilter}
            ref={(ref) => (contentFilter = ref)}
            filterFor={state.filterFor}
          />
        );
      case FILTERS_TYPES.TARGET_GROUP:
        return null;
      //return <TargetGroup ref={ref => targetGroup = ref} filterFor={filterFor} />
      case FILTERS_TYPES.LOCATION:
        var single = singleSelect.includes(FILTERS_TYPES.LOCATION)
          ? true
          : false;
        return (
          <Locations
            ref={(ref) => (location = ref)}
            filterFor={state.filterFor}
            single={single}
          />
        );
      case FILTERS_TYPES.LOCATIONCOUNTRY:
        var single = singleSelect.includes(FILTERS_TYPES.LOCATION)
          ? true
          : false;
        return (
          <LocationCountry
            ref={(ref) => (location = ref)}
            filterFor={state.filterFor}
            single={true}
          />
        );
      case FILTERS_TYPES.RADIUS:
        return (
          <Radius ref={(ref) => (radius = ref)} filterFor={state.filterFor} />
        );
      case FILTERS_TYPES.CATEGORY:
        var single = singleSelect.includes(FILTERS_TYPES.CATEGORY)
          ? true
          : false;
        return (
          <Categories
            ref={(ref) => (category = ref)}
            filterFor={state.filterFor}
            single={true}
          />
        );
      case FILTERS_TYPES.GENDER:
        return (
          <Gender ref={(ref) => (gender = ref)} filterFor={state.filterFor} />
        );
      case FILTERS_TYPES.AGE:
        return <Age ref={(ref) => (age = ref)} filterFor={state.filterFor} />;
      case FILTERS_TYPES.HASHTAG:
        var single = singleSelect.includes(FILTERS_TYPES.HASHTAG)
          ? true
          : false;
        return (
          <Hashtag
       lop-0-     ref={(ref) => (hashtag = ref)}
            filterFor={state.filterFor}
            single={single}
            onResetPress={()=>_resetFilters()}
          />
        );
      case FILTERS_TYPES.OFFERTAG:
        var single = singleSelect.includes(FILTERS_TYPES.OFFERTAG)
          ? true
          : false;
        return (
          <OfferTag
            ref={(ref) => (offerTag = ref)}
            filterFor={state.filterFor}
            single={single}
          />
        );
      case FILTERS_TYPES.INQUIRYTAG:
        var single = singleSelect.includes(FILTERS_TYPES.INQUIRYTAG)
          ? true
          : false;
        return (
          <InquiryTag
            ref={(ref) => (inquiryTag = ref)}
            filterFor={state.filterFor}
            single={single}
          />
        );
      case FILTERS_TYPES.PRICE:
        return (
          <Price
            ref={(ref) => (hashtag = ref)}
            filterFor={state.filterFor}
            single={true}
          />
        );
      default:
        return null;
    }
  };

 const _renderTabBar = (props) => {
    return <TabBar {...props} style={{ display: "none" }} />;
  };
  const _resetFilters = () => {
    dispatch(resetFilters(state.filterFor));
    // setTimeout(() => {
    //   props.filterData();
    // }, 500);
  };

  

 const _renderFilters = () => {

    let filterHeadArr = state.routes.filter((item) => {
      return FILTERS_TO_SHOW[state.filterFor].includes(item.key) ? true : false;
    });
    return (
      <View style={styles.filterHeaderWrap}>
        <FlatList
          ref={(ref) => {
            scrollListRef = ref;
          }}
          initialScrollIndex={state.index}
          onScrollToIndexFailed={(info) => {
            if (props.filterKey) {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                scrollListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }
          }}
          data={filterHeadArr}
          renderItem={({ item, index }) => {
            let isActive = state.index === index;
            return (
              <TouchableOpacity
                onPress={() => {
                  _changeTab(index);
                }}>
                <View
                  key={"Filter_" + index}
                  style={[
                    styles.itemStyle,
                    isActive
                      ? {
                          backgroundColor: colors.primaryColor,
                          borderColor: colors.primaryColor,
                        }
                      : {},
                  ]}>
                  <_Lang
                    style={[
                      styles.textStyle,
                      { color: isActive ? colors.white : colors.gray },
                    ]}
                    text={`filters.${item.key}`}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          horizontal={true}
          removeClippedSubviews={Platform.OS === "android" ? true : false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  function getDerivedStateFromProps(nextProps){
    if (nextProps.filterFor && nextProps.filterFor !== state.filterFor) {
      return {
        filterFor: nextProps.filterFor || FILTERS_FOR.DEFAULT,
      };
    }
  
    return null;
  }

 const _changeTab = (index) => {
    setstate({...state, index:index }, () => {
      let filter = state.routes[index];

      if (
        filter.key === FILTERS_TYPES.CATEGORY ||
        filter.key === FILTERS_TYPES.RADIUS ||
        filter.key === FILTERS_TYPES.LOCATION ||
        filter.key === FILTERS_TYPES.RELEVANCE
      )
        return;

      if (filtersApiData[filter.key] == null) {
        ApiCall.getFiltersData(filter.key).then((data) => {
          dispatch(setFilterDataProp({
            prop: filter.key,
            value: data,
          }));
        });
      }
    });
  };
 const  _changeHeaderTab = (tabIndex) => {
    setstate({...state,tabIndex: tabIndex});
  }
  let leftText= helpers.getLocale(localize,"filters","done")
    const header = {
      leftCb: () => {
        props.filterData();
      },
      //leftImg: images.leftBackArrow,
      leftTxt: leftText,
      title: "filters.filter",
      rightCb: () => {
        _resetFilters();
      },
      rightTxt: "filters.remove",
    };

  return(
    <ScrollView>
    <View style={{ ...sty.flex1, backgroundColor: colors.white }}>
      <StatusBar hidden />

      <_Header
        header={header}
        style={{ borderBottomWidth: 1, borderBottomColor: colors.appBg }}
      />
      {/* {_renderFilters()} */}
      {/* <TabHeader
        routes={state.tabRoutes}
        index={state.tabIndex}
        changeTab={(i) => _changeHeaderTab(i)}
        itemStyle={{ paddingTop: 0, borderBottomColor: "#fff" }}
        styles={{ marginTop: 20 }}
      />

      {state.tabIndex == 0 ? _renderTabs({ key: 'relevance', filter: "Relevance" }) : null} */} 
      {state.tabIndex == 1
        ? _renderTabs({
            key: props.filterKey,
            filter: "Category",
          })
        : null}
      {state.tabIndex == 2
        ? _renderTabs({ key: "offerTag", filter: "OfferTag" })
        : null}
    </View>
  </ScrollView>
  )
}

// FiltersContent.getDerivedStateFromProps=(nextProps, state)=> {
//   if (nextProps.filterFor && nextProps.filterFor !== state.filterFor) {
//     return {
//       filterFor: nextProps.filterFor || FILTERS_FOR.DEFAULT,
//       routes: FiltersContent.state.routes.filter((item) => { //state : variable to be used state.route
//         return FILTERS_TO_SHOW[
//           nextProps.filterFor || FILTERS_FOR.DEFAULT
//         ].includes(item.key)
//           ? true
//           : false;
//       }),
//     };
//   }
//   return null;
// }

const FiltersHome = (props,ref) => {
   
  const { filterDataApi } = props;
  

  const [state, setstate]= useState({
    filterModal: false,
    filterFor: props.filterFor || FILTERS_FOR.DEFAULT,
    singleSelect: props.singleSelect || [],
  })

  const show = (removeBlogFilter = false) => {
    setstate({  ...state,filterModal: true, removeBlogFilter: removeBlogFilter });
  };
  const hide = () => setstate({ ...state,filterModal: false });

  const filterData = () => {
    hide();
    if (filterDataApi) filterDataApi();
  };
  useImperativeHandle(ref, () => ({
    show() {
     show()
    },
    hide() {
     hide()
    }
  }))

  useImperativeHandle(ref, () => ({
    show() {
     show()
    },
    hide() {
     hide()
    }
  }))
  return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={state.filterModal}
        onRequestClose={() => {}}>
        <StatusBar hidden />

        <FiltersContent
          show={show}
          hide={hide}
          filterKey={props.filterKey}
          filterData={filterData}
          filterFor={state.filterFor}
          singleSelect={state.singleSelect}
          removeBlogFilter={state.removeBlogFilter}
        />
      </Modal>
  )

}





export default forwardRef(FiltersHome)
