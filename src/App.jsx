import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import Login from './component/Login';

// Import your pages below
import AboutContent from "./pages/homepage/elements/AboutContent";
import DashboardCard from "./pages/homepage/elements/Dashboard";
import CreateBookPage from "./pages/homepage/elements/CreateBookPage";
import CreateArticlePage from "./pages/homepage/elements/CreateArticlePage";
import ContactList from "./pages/ContactList";
import BookList from "./pages/homepage/elements/BookList";
import WriterManagement from "./pages/homepage/elements/WriterManagement";
import WriterDetail from "./pages/homepage/elements/Addwriter";
import CreateWriterForm from "./pages/homepage/elements/Createwriter";
import ViewArticleList from "./pages/homepage/elements/ViewArticleList";
import ViewArticleDetail from "./pages/homepage/elements/ViewArticleDetail";
import QuestionList from "./pages/homepage/elements/QuestionList";
import CreateQuestion from "./pages/homepage/elements/CreateQuestion";
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
import ViewBooks from "./pages/homepage/elements/ViewBook";
import Editkalam from "./pages/homepage/elements/Editkalam";
import EditArticle from "./pages/homepage/elements/EditArticle";
import EditTopic from './pages/homepage/elements/EditTopic';
import EditBook from './pages/homepage/elements/EditBook';
import CreateSection from './pages/homepage/elements/CreateSection';
import CreateGroup from './pages/homepage/elements/CreateGroup';
import AddTopic from './pages/homepage/elements/AddTopic';
import CategoryDisplay from './pages/homepage/elements/CategoryDisplay';
import SectionDisplay from './pages/homepage/elements/SectionDisplay';
import DisplayGroup from './pages/homepage/elements/DisplayGroup';
import CategoryDetail from './pages/homepage/elements/CategoryDetail';
import KalamDetail from "./pages/homepage/elements/KalamDetail";
import ViewWriter from "./pages/homepage/elements/ViewWriter";
import ViewBookDetail from "./pages/homepage/elements/ViewBookDetail";
import SectionDetail from "./pages/homepage/elements/SectionDetail";
import GroupDetail from "./pages/homepage/elements/GroupDetail";
import TopicDetail from "./pages/homepage/elements/TopicDetail";
import EditArticlePage from "./pages/homepage/elements/EditArticlePage";
import EditCategory from "./pages/homepage/elements/Editcategory";
import EditSection from "./pages/homepage/elements/EditSection";
import EditGroup from "./pages/homepage/elements/Editgroup";
import Dashboard from "./pages/homepage/elements/Dashboard";
import Groupingarticle from "./pages/homepage/elements/groupingarticle";
import Groupingkalaam from "./pages/homepage/elements/Groupingkalaam";
import BazmeDuroodTable  from './pages/homepage/elements/BazmeDuroodTable'
import  { KalamTable, MazmoonTable } from './pages/homepage/elements/KalamMazmoonTabs'


const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="*"git 
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                 <Route path="/grparticle" element={<Groupingarticle />} />
                 <Route path="/bazmedurood" element={<BazmeDuroodTable />} />
                  <Route path="/submission" element={<KalamTable />} />
                  <Route path="/submission" element={<MazmoonTable />} />
                 <Route path="/grpkalaam" element={<Groupingkalaam />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/newdashboard" element={<NewDashboard />} />
                <Route path="/addarticle" element={<CreateArticlePage />} />
                <Route path="/topic" element={<AddTopic />} />
                <Route path="/section" element={<CreateSection />} />
                <Route path="/sections/edit/:id" element={<EditSection />} />
                <Route path="/group" element={<CreateGroup />} />
                <Route path="/groups/edit/:id" element={<EditGroup />} />
                <Route path="/kalam" element={<Createkalam />} />
                <Route path="/viewtopics" element={<ViewTopics />} />
                <Route path="/viewcategory" element={<CategoryDisplay />} />
                <Route path="/categories/edit/:id" element={<EditCategory />} />
                <Route path="/categories/:id" element={<CategoryDetail />} />
                <Route path="/sections/:id" element={<SectionDetail />} />
                <Route path="/groups/:id" element={<GroupDetail />} />
                <Route path="/topics/:id" element={<TopicDetail />} />
                <Route path="/topics/edit/:id" element={<EditTopic />} />
                <Route path="/viewsection" element={<SectionDisplay />} />
                <Route path="/viewgroup" element={<DisplayGroup />} />
                <Route path="/viewkalam" element={<Viewkalam />} />
                <Route path="/kalaam/:id" element={<KalamDetail />} />
                <Route path="/viewlang" element={<ViewLanguages />} />
                <Route path="/addlang" element={<AddLanguage />} />
                <Route path="/kalaam/:id/edit" element={<Editkalam />} />
                <Route path="/edit-article/:id" element={<EditArticle />} />
                <Route path="/articles/:id/edit" element={<EditArticlePage />} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/viewbook" element={<ViewBooks />} />
                <Route path="/books/edit/:id" element={<EditBook />} />
                <Route path="/book" element={<CreateBookPage />} />
                <Route path="/article" element={<CreateArticlePage />} />
                <Route path="/viewarticle" element={<ViewArticleList />} />
                <Route path="/articles/:id" element={<ViewArticleDetail />} />
                <Route path="/updatearticle/article/:id" element={<ArticleUpdateForm />} />
                <Route path="/about-content" element={<AboutContent />} />
                <Route path="/contact" element={<ContactList />} />
                <Route path="/writers" element={<WriterManagement />} />
                <Route path="/writers/:id" element={<ViewWriter />} />
                <Route path="/writers/edit/:id" element={<WriterUpdateForm />} />
                <Route path="/addwriter" element={<CreateWriterForm />} />
                <Route path="/booklist" element={<BookList />} />
                <Route path="/books/:id" element={<ViewBookDetail />} />
                <Route path="/update-book/book/:id" element={<BookDetailUpdatieForm />} />
                <Route path="/questionlist" element={<QuestionList />} />
                <Route path="/createquestion" element={<CreateQuestion />} />
                <Route path="/question-update/:id" element={<QuestionUpdateForm />} />
                <Route path="/translator" element={<TranslatorList />} />
                <Route path="/languages" element={<LanguagesGrid />} />
                <Route path="/home_book_slider" element={<HomeBookSlider />} />
                <Route path="/category" element={<TopicList />} />
                <Route path="/topic-update/:id" element={<TopicUpdateForm />} />
                <Route path="/create-topic" element={<CreateTopic />} />
                <Route path="/feedback" element={<FeedbackList />} />
                <Route path="/event" element={<EventList />} />
                <Route path="/event/update-event/:id" element={<EventUpdateForm />} />
                <Route path="/createevent" element={<CreateEvent />} />
                <Route path="/taglist" element={<TagList />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
