import { View, Text, Image, ImageSourcePropType } from 'react-native'; // Importing necessary components from react-native
import { Tabs } from 'expo-router'; // Importing Tabs from expo-router to create a tab navigation layout

import { icons } from '../../constants'; // Importing icons from a constants file
import clsx from 'clsx'; // Importing clsx for conditional className handling

// TabIcon component that renders the icon and name for each tab
const TabIcon = ({
  icon, // Icon source for the tab
  color, // Color for the icon and text
  name, // Name of the tab to be displayed
  focused, // Boolean indicating if the tab is focused (selected)
}: {
  icon: ImageSourcePropType; // Icon for the tab (image source)
  color: string; // Color of the icon and text (based on tab focus state)
  name: string; // Name of the tab to display beneath the icon
  focused: boolean; // Whether the tab is focused (selected by the user)
}) => {
  return (
    // View wrapping the icon and text for the tab
    <View className="justify-center items-center gap-2">
      {/* Image component for the tab icon */}
      <Image
        source={icon} // Setting the icon for the tab
        resizeMode="contain" // Ensures the icon maintains its aspect ratio
        tintColor={color} // Applying the color to the icon
        className="w-6 h-6" // Setting size for the icon
      />
      {/* Text component for the tab name */}
      <Text
        className={clsx(
          focused ? 'font-psemibold' : 'font-pregular', // Conditionally apply bold or regular font depending on tab focus
          `text-xs w-full`
        )}
        style={{ color: color }} // Setting the color of the tab name text
      >
        {name} {/* Displaying the name of the tab */}
      </Text>
    </View>
  );
};

// TabsLayout component that sets up the tab navigation layout
const TabsLayout = () => {
  return (
    <>
      <Tabs
        // Configuring the tab bar options
        screenOptions={{
          tabBarShowLabel: false, // Hides the tab labels (we are using icons and names as labels)
          tabBarActiveTintColor: '#FFA001', // Active tab color
          tabBarInactiveTintColor: '#CDCDE0', // Inactive tab color
          tabBarStyle: {
            backgroundColor: '#161622', // Background color of the tab bar
            borderTopWidth: 1, // Border width for the top of the tab bar
            borderTopColor: '#232533', // Border color for the top of the tab bar
            height: 84, // Height of the tab bar
            flexDirection: 'row', // Lays out the tabs horizontally
            justifyContent: 'space-evenly', // Spreads out the tabs evenly
            alignItems: 'center', // Aligns the items vertically at the center
          },
        }}
      >
        {/* Home tab */}
        <Tabs.Screen
          name="home" // Tab name (used for navigation)
          options={{
            title: 'Home', // Displayed title for the tab (used in navigation stack)
            headerShown: false, // Hides the header for this screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home} // Icon for the home tab
                color={color} // Color for the icon and text
                name="Home" // Name to display under the icon
                focused={focused} // Whether the tab is focused (selected)
              />
            ),
          }}
        />
        {/* Profile tab */}
        <Tabs.Screen
          name="profile" // Tab name (used for navigation)
          options={{
            title: 'Profile', // Displayed title for the tab (used in navigation stack)
            headerShown: false, // Hides the header for this screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile} // Icon for the profile tab
                color={color} // Color for the icon and text
                name="Profile" // Name to display under the icon
                focused={focused} // Whether the tab is focused (selected)
              />
            ),
          }}
        />
        {/* Create tab */}
        <Tabs.Screen
          name="create" // Tab name (used for navigation)
          options={{
            title: 'Create', // Displayed title for the tab (used in navigation stack)
            headerShown: false, // Hides the header for this screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus} // Icon for the create tab
                color={color} // Color for the icon and text
                name="Create" // Name to display under the icon
                focused={focused} // Whether the tab is focused (selected)
              />
            ),
          }}
        />
        {/* Saved tab */}
        <Tabs.Screen
          name="saved" // Tab name (used for navigation)
          options={{
            title: 'Saved', // Displayed title for the tab (used in navigation stack)
            headerShown: false, // Hides the header for this screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark} // Icon for the saved tab
                color={color} // Color for the icon and text
                name="Saved" // Name to display under the icon
                focused={focused} // Whether the tab is focused (selected)
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
