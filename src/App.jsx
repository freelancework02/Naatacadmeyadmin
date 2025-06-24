import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from './component/AuthContext';
import ProtectedRoute from "./component/ProtectedRoute";

// import Login from './component/Login';

// Public Pages
import AboutContent from "./pages/homepage/elements/AboutContent";

// Dashboard & Admin Functional Pages
import DashboardCard from "./pages/homepage/elements/DashboardCard";
import CreateBookPage from "./pages/homepage/elements/CreateBookPage";
import CreateArticlePage from "./pages/homepage/elements/CreateArticlePage";
import ContactList from "./pages/ContactList";
import BookList from "./pages/homepage/elements/BookList";
import ViewBookDetail from "./pages/homepage/elements/ViewBookDetail";
import WriterManagement from "./pages/homepage/elements/WriterManagement";
import WriterDetail from "./pages/homepage/elements/WriterDetail";
import CreateWriterForm from "./pages/homepage/elements/Createwriter";
import ViewArticleList from "./pages/homepage/elements/ViewArticleList";
import ViewArticleDetail from "./pages/homepage/elements/ViewArticleDetail";
import QuestionList from "./pages/homepage/elements/QuestionList";
import CreateQuestion from "./pages/homepage/elements/CreateQuestion";
// import AdminList from './pages/homepage/elements/Admin';
import TranslatorList from "./pages/homepage/elements/TranslatorList";
import LanguagesGrid from "./pages/homepage/elements/LanguagesGrid";
import HomeBookSlider from "./pages/homepage/elements/HomeBookSlider";
import TopicList from "./pages/homepage/elements/TopicList";
import CreateTopic from "./pages/homepage/elements/CreateTopic";
import FeedbackList from "./pages/homepage/elements/FeedbackList";
import EventList from "./pages/homepage/elements/EventList";
import CreateEvent from "./pages/homepage/elements/CreateEvent";
import TagList from "./pages/homepage/elements/TagsList";
import WriterUpdateForm from "./pages/homepage/EditForms/WriterUpdateForm";
import TopicUpdateForm from "./pages/homepage/EditForms/TopicUpdateForm";
import ArticleUpdateForm from "./pages/homepage/EditForms/ArticleUpdateForm";
import EventUpdateForm from "./pages/homepage/EditForms/EventUpdateForm";
import BookDetailUpdatieForm from "./pages/homepage/EditForms/BookDetailUpdatieForm";
import QuestionUpdateForm from "./pages/homepage/EditForms/QuestionUpdateForm";
import NewDashboard from "./pages/homepage/elements/NewDashboard";
import Createkalam from "./pages/homepage/elements/Createkalam";
import ViewTopics from "./pages/homepage/elements/ViewTopics";
import Viewkalam from "./pages/homepage/elements/Viewkalam";
import AddLanguage from "./pages/homepage/elements/AddLanguage";
import ViewLanguages from "./pages/homepage/elements/ViewLanguages";
import AddBook from "./pages/homepage/elements/CreateBookPage";
import ViewBooks from '../src/pages/homepage/elements/ViewBook';
import Editkalam from '../src/pages/homepage/elements/Editkalam'
import EditArticle from '../src/pages/homepage/elements/EditArticle'
import KalamDetail from "./pages/homepage/elements/KalamDetail";
import ViewWriter from "./pages/homepage/elements/ViewWriter";

const App = () => {
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CreateArticlePage />} />
        <Route path="/kalam" element={<Createkalam />} />
        <Route path="/viewtopics" element={<ViewTopics />} />
        <Route path="/viewkalam" element={<Viewkalam />} />
        <Route path="/viewlang" element={<ViewLanguages />} />
        <Route path="/addlang" element={<AddLanguage />} />
        <Route path="/edit-kalam/:id" element={<Editkalam />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
        <Route path="/viewkalam/:id" element={<KalamDetail />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/viewbook" element={<ViewBooks />} />
        <Route path="/newdashboard" element={<NewDashboard />} />
        <Route path="/dashboard" element={<DashboardCard />} />
        <Route path="/book" element={<CreateBookPage />} />
        <Route path="/article" element={<CreateArticlePage />} />
        <Route path="/viewarticle" element={<ViewArticleList />} />
        <Route
          path="/viewarticle/article/:id"
          element={<ViewArticleDetail />}
        />
        <Route
          path="/updatearticle/article/:id"
          element={<ArticleUpdateForm />}
        />

        <Route path="/about-content" element={<AboutContent />} />

        <Route path="/contact" element={<ContactList />} />
        <Route path="/writers" element={<WriterManagement />} />
        <Route path="/viewwriters/:id" element={<ViewWriter />} />
        <Route path="/writers-update/:id" element={<WriterUpdateForm />} />
        <Route path="/createwriter" element={<CreateWriterForm />} />

        <Route path="/booklist" element={<BookList />} />
        <Route path="/viewbook/book/:id" element={<ViewBookDetail />} />
        <Route
          path="/update-book/book/:id"
          element={<BookDetailUpdatieForm />}
        />

        <Route path="/questionlist" element={<QuestionList />} />
        <Route path="/createquestion" element={<CreateQuestion />} />
        <Route path="/question-update/:id" element={<QuestionUpdateForm />} />

        {/* <Route path="/admin" element={<AdminList />} /> */}
        <Route path="/translator" element={<TranslatorList />} />
        <Route path="/languages" element={<LanguagesGrid />} />
        <Route path="/home_book_slider" element={<HomeBookSlider />} />
        <Route path="/topic" element={<TopicList />} />
        <Route path="/topic-update/:id" element={<TopicUpdateForm />} />
        <Route path="/create-topic" element={<CreateTopic />} />

        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/event" element={<EventList />} />
        <Route path="/event/update-event/:id" element={<EventUpdateForm />} />

        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/taglist" element={<TagList />} />

        {/* Protected Routes - Admin/Superadmin */}
        {/* <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardCard />
            </ProtectedRoute>
          } /> */}
        {/* <Route path="/book" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <CreateBookPage />
            </ProtectedRoute>
          } /> */}
        {/* <Route path="/article" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <CreateArticlePage />
            </ProtectedRoute>
          } /> */}
        {/* <Route path="/contact" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <ContactList />
            </ProtectedRoute>
          } /> */}
        {/* <Route path="/booklist" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <BookList />
            </ProtectedRoute>
          } /> */}
        {/* <Route path="/viewbook/book/:id" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <ViewBookDetail />
            </ProtectedRoute>
          } /> */}

        {/* Protected Routes - Admin Only */}
        {/* <Route path="/writers" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <WriterManagement />
            </ProtectedRoute>
          } /> */}
        {/* <Route path="/writers/:id" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <WriterDetail />
            </ProtectedRoute>
          } /> */}
        {/* <Route path="/createwriter" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateWriterForm />
            </ProtectedRoute>
          } />
          <Route path="/viewarticle" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ViewArticleList />
            </ProtectedRoute>
          } />
          <Route path="/viewarticle/article/:id" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ViewArticleDetail />
            </ProtectedRoute>
          } />
          <Route path="/questionlist" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <QuestionList />
            </ProtectedRoute>
          } />
          <Route path="/createquestion" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateQuestion />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminList />
            </ProtectedRoute>
          } />
          <Route path="/translator" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TranslatorList />
            </ProtectedRoute>
          } />
          <Route path="/languages" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <LanguagesGrid />
            </ProtectedRoute>
          } />
          <Route path="/home_book_slider" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <HomeBookSlider />
            </ProtectedRoute>
          } />
          <Route path="/topic" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TopicList />
            </ProtectedRoute>
          } />
          <Route path="/create-topic" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateTopic />
            </ProtectedRoute>
          } />
          <Route path="/feedback" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <FeedbackList />
            </ProtectedRoute>
          } />
          <Route path="/event" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EventList />
            </ProtectedRoute>
          } />
          <Route path="/createevent" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateEvent />
            </ProtectedRoute>
          } />
          <Route path="/taglist" element={
            <ProtectedRoute>
              <TagList />
            </ProtectedRoute>
          } /> */}

        {/* Optional: Catch-all for 404 - uncomment if needed */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
    // </AuthProvider>
  );
};

export default App;
