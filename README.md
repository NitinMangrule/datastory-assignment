# 📊 Country Insights Dashboard

A data visualization dashboard built with **Next.js**, **TypeScript**, **Chakra UI**, **Apollo Client**, and **GraphQL**. It allows users to select a country and a measure to dynamically visualize data using interactive charts.

---

## 🎥 Demo

[![Demo Gif](./assets/Demo.gif)](./assets/Demo.gif)

---

## 🌐 Tech Stack

- **Next.js** – React framework for server-side rendering (SSR) and static site generation (SSG)  
- **TypeScript** – Provides strong typing for safer and scalable development  
- **Chakra UI** – Accessible, modular component library for clean and responsive UI  
- **Apollo Client** – Powerful GraphQL client for efficient data fetching and caching  
- **GraphQL** – Flexible API query language for structured data queries  
- **Recharts** – Simple, composable charting library for React  
- **GraphQL Code Generator** (optional) – Auto-generates TypeScript types from GraphQL schema and queries  

---

## 🔧 Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/NitinMangrule/datastory-assignment.git
   cd datastory-assignment


2. **Install Dependencies**
bash
Copy
Edit
npm install

3. **Run the Development Server**
bash
Copy
Edit
npm run dev

4. **Open in Browser**
Visit http://localhost:3000 to view the dashboard.



## ✅ What was implemented and why
Built a Next.js dashboard using Ant Design, Apollo Client, GraphQL, and Recharts

Implemented a modular and type-safe architecture using TypeScript

Ensured responsiveness and usability across common screen sizes

Integrated Apollo Client to fetch and manage GraphQL data

Used Recharts for elegant and flexible data visualization

## 🚫 What was not implemented
Did not include full authentication/authorization flows due to time constraints

Skipped unit and integration test coverage beyond the core UI/data flow

## ⏭️ What I’d do next with more time
Add loading and error states with better UX feedback

Implement automated testing using Jest and React Testing Library

Introduce reusable layout components and global styles

Add proper accessibility and keyboard navigation support

## ⚖️ Key decisions and trade-offs
Chakra UI version downgrade:
The latest Chakra UI (v3.x) has peer dependency conflicts with React 17 and caused type errors when used alongside Next.js.
To ensure compatibility and avoid breaking changes, I used:

"@chakra-ui/react": "1.4.2",
"@chakra-ui/icons": "1.0.5",
"@chakra-ui/theme-tools": "1.1.2"
