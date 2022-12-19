import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface ProfileParamList extends ProfileStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Auth: undefined;
  Register: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Orders: undefined;
};

export type OtherStackParamList = {
  Other: undefined;
  Orders: undefined;
  Store: undefined;
  Clients: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Map: undefined;
  Cart: undefined;
  ProfileScreens: NavigatorScreenParams<ProfileStackParamList> | undefined;
  More: NavigatorScreenParams<OtherStackParamList> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
