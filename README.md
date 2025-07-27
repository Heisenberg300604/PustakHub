# PustakHub

PustakHub is a mobile application designed to empower Indian students by creating a dedicated platform for buying, selling, and donating second-hand academic books specifically for competitive exam preparation (JEE, NEET, UPSC, GATE, SSC, Board Exams, etc.).

## Problem

Every year, millions of Indian students prepare for highly competitive exams like JEE, NEET, UPSC, GATE, and SSC, investing significant money in exam preparation books and study materials. After the exams, these books often become unused, clutter homes, or are sold as scrap, while incoming students struggle to find affordable, high-quality study resources. Existing second-hand book marketplaces are often general-purpose, lack exam-specific categorization, and do not offer a seamless student-to-student or donation-focused experience.

There is a clear need for a dedicated, exam-focused platform where students can easily buy, sell, or donate their study materials, help reduce waste, promote reuse, and support students from lower-income backgrounds.

PustakHub addresses this gap by providing a simple, localized, and socially impactful solution.

## Solution

PustakHub addresses these challenges by offering a dedicated mobile app where students can:

- **Buy, Sell, or Donate**: List exam-related books with photos, prices, and details.
- **Search and Filter**: Find books by exam (e.g., JEE), location, or price.
- **Connect in Real-Time**: Chat with buyers/sellers to negotiate or arrange meetups.
- **Receive Notifications**: Get alerts for new messages, listings, or transactions.
- **Match Locally**: Discover nearby users for convenient in-person exchanges.

Built with a custom backend, PustakHub ensures full control, cost efficiency (using free/low-cost tools), and scalability. The app leverages modern technologies to deliver a robust, production-ready solution.

## Tech Stack

### Frontend
- **React Native (Expo)**: Cross-platform mobile app for iOS and Android.
- **Libraries**:
  - `@apollo/client`: Query GraphQL APIs for book listings and search.
  - `react-native-image-picker`: Upload book photos to Cloudinary.
  - `react-native-geolocation-service`: Capture user location for matching.
  - `react-native-push-notification` & `OneSignal`: Push notifications for alerts.
  - `@react-navigation/native`: App navigation (home, listings, chat).

### Backend
- **Node.js + Express**: REST APIs for CRUD operations and search.
- **PostgreSQL + DrizzleORM**: Relational database with PostGIS for geolocation queries.
- **Additional**:
  - `jsonwebtoken` & `bcrypt`: JWT authentication and password hashing.
  - `express-rate-limit` & `express-validator`: API security and input validation.
  - `node-geocoder`: Convert city to coordinates for geolocation.

### Storage
- **Cloudinary**: Free 25 GB storage for book photos, with URLs in PostgreSQL.

### DevOps
- **Render**: Backend deployment for API and database hosting.

### Development Tools
- **VS Code**: Code editor with JavaScript extensions.
- **Postman**: API testing.
- **ESLint & Prettier**: Code consistency.
- **Expo Go**: Mobile app testing.

## Technical Architecture


### Functional
- **Authentication**: Email/password or phone OTP login.
- **Book Listings**: Create, read, update, delete listings with title, exam, price, photo, and location.
- **Search & Filter**: Query books by exam, location, or price.
- **Real-Time Chat**: Messaging between buyers, sellers, and donors.(To be implemented)
- **Notifications**: Alerts for new messages, listings, or transactions.
- **Geolocation**: Match users by proximity (e.g., within 10 km) for meetups.


## Getting Started

### Clone the Repository
```bash
git clone https://github.com/Heisenberg300604/PustakHub.git
cd Pustakhub