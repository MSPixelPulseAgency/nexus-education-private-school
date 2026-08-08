import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import HomePage from "./pages/HomePage";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const AdmissionsPage = lazy(() => import("./pages/AdmissionsPage"));
const StudentSupportPage = lazy(() => import("./pages/StudentSupportPage"));
const OnlineLearningPage = lazy(() => import("./pages/OnlineLearningPage"));
const AcademicPlanningPage = lazy(() => import("./pages/AcademicPlanningPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const InquiryPage = lazy(() => import("./pages/InquiryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<div className="route-loader" role="status" aria-live="polite"><span aria-hidden="true" />Loading Nexus page…</div>}>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/grade-9" element={<CoursesPage gradeOverride="9" />} />
          <Route path="/courses/grade-10" element={<CoursesPage gradeOverride="10" />} />
          <Route path="/courses/grade-11" element={<CoursesPage gradeOverride="11" />} />
          <Route path="/courses/grade-12" element={<CoursesPage gradeOverride="12" />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/student-support" element={<StudentSupportPage />} />
          <Route path="/online-learning" element={<OnlineLearningPage />} />
          <Route path="/academic-planning" element={<AcademicPlanningPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/why-nexus" element={<AboutPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/accessibility" element={<LegalPage type="accessibility" />} />
          <Route path="/policies" element={<LegalPage type="policies" />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
