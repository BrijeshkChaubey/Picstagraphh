import { NavigationActions, StackActions } from '@react-navigation/stack';

let _navigator = {
  rootNav: undefined,
  tabNav: undefined
};

function setNavigation(prop, navigatorRef) {
  _navigator[prop] = navigatorRef;
}

function navigate(navigationName, routeName, params) {
  _navigator[navigationName].dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack(navigationName) {
  _navigator[navigationName].dispatch(
    NavigationActions.back()
  );
}

function reset(navigatorName) {
  _navigator[navigatorName].dispatch(
      StackActions.popToTop()
  );
}

function resetToView(navigatorName, route) {
  
  _navigator[navigatorName].dispatch(
      StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: route })],
      })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setNavigation,
  goBack,
  reset,
  resetToView
};