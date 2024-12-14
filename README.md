# Aora - Mobile App

Built with React Native for seamless user experiences, Animatable for captivating animations, and integrated with the dependable backend systems of Appwrite, this app showcases impressive design and functionality, enabling seamless sharing of AI videos within the community.

![Aora](/public/aora.png)

## 🔧 Technologies Used

---

- **React Native**: For building the mobile app.
- **Appwrite**: For backend services, user authentication, and data storage.
- **Expo**: For building and running the app.
- **Nativewind CSS**: For utility-first CSS styling.
- **Animatable**: For the smooth animations

## 🚀 Features

---

🔋 Features
👉 Onboarding Screen: Engaging graphics and clear instructions welcome users to the app.

👉 Robust Authentication & Authorization System: Secure email login safeguards user accounts.

👉 Dynamic Home Screen with Animated Flat List: Smoothly animated flat list showcases the latest videos for seamless browsing.

👉 Pull-to-Refresh Functionality: Users can refresh content with a simple pull gesture for up-to-date information.

👉 Full-Text Search Capability: Efficiently search through videos with real-time suggestions and instant results.

👉 Tab Navigation: Navigate between sections like Home, Search, and Profile with ease using tab navigation.

👉 Post Creation Screen for Uploading Media: Upload video and image posts directly from the app with integrated media selection.

👉 Profile Screen with Detailed Insights: View account details and activity, including uploaded videos and follower count, for a personalized experience.

👉 Responsiveness: Smooth performance and adaptability across various devices and screen sizes for a consistent user experience.

👉 Animations: Dynamic animations using the Animatable library to enhance user interaction and engagement throughout the app's UI.

and many more, including code architecture and reusability

## 📲 Installation

---

1. **Clone the repository**:

   ```bash
   git clone https://github.com/d-code-h/aora.git
   cd aora
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Run the app**:
   `bun start`

## 🔑 Setting Up Appwrite

---

1. Set up an Appwrite project: [Appwrite Setup Guide](https://appwrite.io/docs/getting-started).
2. Create a collection for **users** and configure authentication methods (e.g., email & password).
3. Add the Appwrite endpoint and project ID to your app's environment variables.

## ⚙️ Environment Variables

Ensure the following environment variables are configured:

```
EXPO_PUBLIC_ENDPOINT = <your_appwrite_endpoint>
EXPO_PUBLIC_PLATFORM = <your_public_platform_name>
EXPO_PUBLIC_PROJECTID = <your_project_id>
EXPO_PUBLIC_DATABASEID = <your_appwrite_database_id>
EXPO_PUBLIC_USERCOLLECTIONID = <your_appwrite_user_collection_id>
EXPO_PUBLIC_VIDEOCOLLECTIONID = <your_appwrite_video_collection_id>
EXPO_PUBLIC_STORAGEID = <your_appwrite_storage_id>
```

## 💻 Development

---

To contribute, follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature.
3. Implement your changes and test them.
4. Commit your changes and push to your branch.
5. Open a pull request with a description of your changes.

## 📝 License

---

This project is licensed under the MIT License.
