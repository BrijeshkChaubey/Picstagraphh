import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  ActivityIndicator,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Item } from "native-base";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  BaseItemAnimator,
} from "recyclerlistview";
import { setActiveVideo } from "../../../../../redux/actions/VideoAction";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
  ApiCall,
} from "../../../../../configs";
import {
  _ErrorModal,
  _GradiantView,
  _Lang,
  _ListBox,
  _Loading,
  _Spacer,
  _Icon,
  _Button,
  _Layout,
  _ListView,
  _ContentType,
  _InlineLoader,
  _Header,
  _EmptyPostList,
} from "../../../../custom";
import { setParticipantProp } from "../../../../../redux/actions/CompanyParticipantAction";
import { mainLayoutHoc } from "../../../../hoc";
import mainStyles from "../../../../../assets/styles/MainStyles";
import { styles } from "../styles";
import { chain, find } from "lodash";

import DummyData from "../../../../../assets/data/data.json";

//ContentBox actions
import {
  setAppData,
  pushAppData,
} from "../../../../../redux/actions/AppDataActions";
import {
  pushProfileDataProp,
  setProfileDataProp,
  setProfileRefreshIndicator,
} from "../../../../../redux/actions/ProfileAction";
import {
  setOtherProfileNewsfeed,
  pushOtherProfileNewsfeed,
} from "../../../../../redux/actions/OtherProfileActions";
import { setTimestampData } from "../../../../../redux/actions/TimestampAction";
import {
  setCampaignProp,
  pushCampaignProp,
} from "../../../../../redux/actions/CampaignsActions";
import { setUserInfo } from "../../../../../redux/actions/UserInfoAction";
import { setHomeDataProp } from "../../../../../redux/actions/HomeActions";
import { setPagination } from "../../../../../redux/actions/PaginationActions";
class ItemAnimator extends BaseItemAnimator {
  constructor(listHasMountedProp) {
    super();
    this.listHasMountedProp = listHasMountedProp;
  }
  animateDidMount(atX, atY, itemRef, itemIndex) {
    //no need
    this.listHasMountedProp();
  }
}
class Newsfeed extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation, home } = this.props;
    let { width, height } = Dimensions.get("window");
    this._layoutProvider = new LayoutProvider(
      (index) => {
        // const height = Image.getSize(data[index].listMediaUrl, (width, height) => {return height });

        return index;
      },
      (type, dim) => {
        dim.width = width - 10;
        dim.height = height;
      },
    );
    this.postArr = [];
    const { page, newPost, itemId, userId, userName } = navigation.state.params;
    this.state = {
      listLoading: false,
      refreshing: false,
      itemId,
      page,
      newPost,
      key: 100,
      refreshAgain: false,
      userInfo: { id: userId, username: userName },
    };
    this.listLoading = false;
    this.listEnded = false;
    this.ownNewsFeedRef = {};
    this.scrollListRef = null;
    this.props.setProfileRefreshIndicator(true);
  }

  componentDidMount() {
    const { page, newPost } = this.state;
    // this._onRefresh(true, page, newPost);
  }

  componentWillUnmount() {
    this.props.setOtherProfileNewsfeed({
      list: true,
      id: this.state.userInfo.id,
      arr: [],
      pagination: {},
    });
    globals.setUserData("viewedPostsArr", []);
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItems = ({ item, index }) => {
    //var item =data
    if (!item) return;

    return index >= this.props.navigation.state.params.index ? (
      <View
        
        renderToHardwareTextureAndroid={this.state.renderTexture}
        style={{
          paddingTop: index === 0 ? 7.5 : 0,
          width: globals.WINDOW_WIDTH,
        }}>
        <_ContentType
          itemKey={"Other_NewsFeed" + index.toString()}
          contentInfo={item}
          index={index}
          {...this.props}
        />
      </View>
    ) : null;
  };

  scrollToTop = () => {
    this.scrollListRef &&
      this.scrollListRef.scrollToOffset({ x: 0, y: 0, animated: true });
  };

  _onRefresh = (top = true, page = 1, newPost = false) => {
    const {
      setOtherProfileNewsfeed,
      setPagination,
      setProfileRefreshIndicator,
      timestamp,
      loginData,
      setTimestampData,
    } = this.props;
    const { refreshing, userInfo } = this.state;
    setProfileRefreshIndicator(true);
    this.setState({ key: this.state.key + 100 });
    ApiCall.getOtherProfileData(
      "newsFeedList",
      this.props,
      this.state,
      page,
      newPost
        ? timestamp["newsfeedNew" + userInfo.username]
        : timestamp["newsfeed" + userInfo.username],
    )
      .then((res) => {
        // const clickedItem = find(res.data, (ex) => ex._id == this.state.itemId);
        let newData = res.data;
        console.log("Gey", res.pagination);

        // if (!this.state.refreshAgain && clickedItem) {
        //   newData = chain([clickedItem])
        //     .concat(res.data)
        //     .uniqBy((dtx) => dtx._id)
        //     .value();
        // }

        // setOtherProfileNewsfeed({
        //   list: true,
        //   id: userInfo.id,
        //   arr: newData, // updatedData
        //   pagination:{limit:4,page:2,pages:2,total:res.pagination.total}
        // });

        // this.setState({ page: res.pagination.page, refreshAgain: true });
        setProfileRefreshIndicator(false);
      })
      .catch((err) => {
        setOtherProfileNewsfeed({
          list: true,
          id: userInfo.id,
          arr: [],
          pagination: {},
        });
        this.setState({ refreshing: false });
        // !refreshStories && this.setState({ refreshStories: true });
      });
  };

  _renderMore = () => {
    const {
      pushProfileDataProp,
      setPagination,
      profile,
      loginData,
      pushOtherProfileNewsfeed,
      otherProfileNewsfeed,
      otherProfileNewsfeedList,
      timestamp,
    } = this.props;
    const { page, userInfo, newPost } = this.state;

    let pagination = otherProfileNewsfeed[userInfo.id].pagination;

    if (this.listLoading === false) {
      this.listLoading = true;

      this.setState(
        {
          listLoading: true,
          itemId: null,
        },
        () => {
          if (page + 1 > pagination.pages) {
            this.listEnded = true;
            this.setState({ listLoading: false });
            this.listLoading = false;
          } else {
            let activePage = page;

            ApiCall.getOtherProfileData(
              "newsFeedList",
              this.props,
              this.state,
              ++activePage,
              newPost
                ? timestamp["newsfeedNew" + userInfo.username]
                : timestamp["newsfeed" + userInfo.username],
            )
              .then((res) => {
                console.log("Hello Vaibh", res);
                // pushProfileDataProp({ prop: 'newsFeedList', arr: res.data });
                // const updatedData = map(res.data, mx => {
                //   return Object.assign({}, mx, { page: mx.page || res.pagination.page })
                // });

                pushOtherProfileNewsfeed({
                  id: userInfo.id,
                  arr: res.data,
                  pagination: res.pagination,
                });
                this.setState({
                  listLoading: false,
                  page: res.pagination.page,
                });
                this.listLoading = false;
              })
              .catch((err) => {
                this.setState({ listLoading: false });
                this.listLoading = false;
              });
          }
        },
      );
    }
  };

  changeItems = (data) => {
    const { profile, setActiveVideo } = this.props;
    if (!this.postArr.includes(data?.changed[0]?.item?.id)) {
      this.postArr.push(data?.changed[0]?.item?.id);
      ApiCall.initiatePostView(data.viewableItems, profile.newsFeedList, {
        ...this.props,
      });
    }
    console.log("url", data?.changed[0]?.index);
    if (data?.changed[0]?.item?.typeContent == "video") {
     // setActiveVideo(data?.changed[0]?.item?.id);
    }

    helpers.videoPlayToggle();
  };

  render() {
    const {
      profile,
      otherProfileNewsfeedList,
      otherProfileNewsfeed,
    } = this.props;
    const { listLoading, userInfo } = this.state;
    const header = {
      leftCb: () => {
        this.props.navigation.pop();
      },
      title: "NewsFeed",
      disableLang: true,
      leftImg: images.leftBackArrow,
      rightTxt: "",
    };
    if (!otherProfileNewsfeed[userInfo.id])
      return (
        <_Layout screen={"NewsFeedList"} header={header}>
          <_InlineLoader type={"post"} />
        </_Layout>
      );
    return (
      <_Layout
        screen={"NewsFeedList"}
        header={header}
        style={{ backgroundColor: colors.gridListBG }}>
        <View
          key={this.state.key}
          onLayout={() => this.props.setProfileRefreshIndicator(false)}
          style={mainStyles.rootView}>
          {/* <RecyclerListView
            dataProvider={new DataProvider((r1, r2) => {
              return r1 !== r2;
            }).cloneWithRows(otherProfileNewsfeedList[userInfo.id].arr)}
            rowRenderer={this._renderItems}
            layoutProvider={this._layoutProvider}
            itemAnimator={
              new ItemAnimator(() => {
                // this.props.listHasMounted()
                <_InlineLoader type={"post"} />;
              })
            }
            extendedState={this.state}
            onEndReached={() => {
              this._renderMore();
            }}
            style={{ flex: 1 }}
            onEndReachedThreshold={0.5}
            scrollViewProps={{
              refreshControl: (
                <RefreshControl
                  refreshing={profile.refreshStatus}
                  onRefresh={() => this._onRefresh(true, 1, true)}
                />
              ),
            }}
            forceNonDeterministicRendering={true}
            canChangeSize={true}
            renderFooter={() => {
              return (
                <View>
                  {listLoading ? <_InlineLoader type={"grid"} /> : null}
                </View>
              );
            }}
          /> */}
          <FlatList
            contentContainerStyle={{ paddingBottom: 80 }}
            pinchGestureEnabled={false}
            ref={(ref) => {
              this.scrollListRef = ref;
            }}
            data={otherProfileNewsfeed[userInfo.id].arr}
            extraData={this.state}
            // decelerationRate={Platform.OS === "ios" ? -80.0 : 0}
            renderItem={this._renderItems}
            keyExtractor={this._keyExtractor}
            onViewableItemsChanged={this.changeItems}
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 95,
            }}
            onEndReachedThreshold={0.5}
            onEndReached={() => this._renderMore()}
            refreshControl={
              <RefreshControl
                refreshing={profile.refreshStatus}
                onRefresh={() => this._onRefresh(true, 1, true)}
              />
            }
            ListFooterComponent={() => {
              return (
                <View>
                  {listLoading ? <_InlineLoader type="grid" /> : null}
                </View>
              );
            }}
            ListEmptyComponent={<_EmptyPostList />}
            removeClippedSubviews={Platform.OS == "android" ? true : false}
            // windowSize={3}
          />
        </View>
      </_Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  pagination: state.pagination.ownNewsfeed,
  otherProfileNewsfeedList: state.otherProfile.OtherProfileNewsfeedList,
  otherProfileNewsfeed: state.otherProfile.otherProfileNewsfeed,
  companyParticipant: state.companyParticipant,
  home: state.home,
  navProps: state.navProps,
  appData: state.appData,
  loginData: state.loginData,
  // userInfo: state.userInfo,
  localize: state.localize,
  profile: state.profile,
  campaigns: state.campaigns,
  timestamp: state.timestamp,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAppData,
      pushAppData,
      setPagination,
      setProfileDataProp,
      pushProfileDataProp,
      setHomeDataProp,
      setActiveVideo,
      setCampaignProp,
      pushCampaignProp,
      setProfileRefreshIndicator,
      setUserInfo,
      setOtherProfileNewsfeed,
      pushOtherProfileNewsfeed,
      setTimestampData,
      setParticipantProp,
    },
    dispatch,
  );
const NewsfeedRedux = connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
export default mainLayoutHoc({})(NewsfeedRedux);
