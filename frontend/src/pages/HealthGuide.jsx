import React from 'react';
import { Link } from 'react-router-dom';
import './HealthGuide.css';

// ===================================================================
// MOCK DATA
// ===================================================================

const FEATURED_ARTICLES = [
  {
    id: 1,
    title: "The Power of Sleep: Why 8 Hours Matters for Immunity",
    summary: "Discover how quality sleep impacts your immune system, mood, and cognitive function. Simple, science-backed tips for achieving better rest tonight.",
    category: "Wellness",
    image: "https://placehold.co/400x250/1E90FF/ffffff?text=Sleep+Guide",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Keto Diet Myths: What You Need to Know Before Starting",
    summary: "Separating fact from fiction about the popular ketogenic diet. We cover common misconceptions about ketosis, sustainability, and side effects.",
    category: "Nutrition",
    image: "https://placehold.co/400x250/20B2AA/ffffff?text=Keto+Myths",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Managing Seasonal Allergies in Kerala's Climate",
    summary: "Tips and treatments for coping with pollen, humidity, and common seasonal allergens specific to the South Indian tropical environment.",
    category: "Prevention",
    image: "https://placehold.co/400x250/FF6347/ffffff?text=Allergy+Care",
    readTime: "4 min"
  },
];

const DISEASE_SPOTLIGHTS = [
  {
    id: 101,
    title: "Heart Disease: Risks, Warning Signs, and Prevention",
    icon: "❤️",
    color: "text-danger",
    link: "/articles/heart-disease"
  },
  {
    id: 102,
    title: "Cancer Awareness: Early Detection Saves Lives",
    icon: "🎗️",
    color: "text-warning",
    link: "/articles/cancer-awareness"
  },
  {
    id: 103,
    title: "Kidney Health: Diet and Lifestyle for Optimal Function",
    icon: "🧪",
    color: "text-info",
    link: "/articles/kidney-health"
  },
  {
    id: 104,
    title: "Diabetes Management: Insulin, Monitoring, and Diet",
    icon: "💉",
    color: "text-success",
    link: "/articles/diabetes-management"
  },
];

const LATEST_BLOGS = [
  { id: 201, title: "Understanding Blood Pressure Readings", author: "Dr. Latha Menon", date: "Oct 1, 2025" },
  { id: 202, title: "Natural Immunity Boosters for the Monsoon Season", author: "Dr. Anil Varma", date: "Sep 25, 2025" },
  { id: 203, title: "The Link Between Gut Health and Mental Well-being", author: "Dr. Sarah Thomas", date: "Sep 18, 2025" },
  { id: 204, title: "Safe Disposal of Expired Medications", author: "Pharmacist Rajan", date: "Sep 10, 2025" },
];

// ===================================================================
// SUB-COMPONENTS
// ===================================================================

const ArticleCard = ({ article }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow-sm h-100 border-0 rounded-3 overflow-hidden">
      <img
        src={article.image}
        className="card-img-top"
        alt={article.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-primary-subtle text-primary mb-2 align-self-start">{article.category}</span>
        <h5 className="card-title fw-bold">{article.title}</h5>
        <p className="card-text text-muted flex-grow-1">{article.summary}</p>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <small className="text-secondary"><i className="bi bi-clock me-1"></i> {article.readTime}</small>
          <Link to={`/articles/${article.id}`} className="btn btn-sm btn-outline-danger">
            Read More
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const SpotlightCard = ({ spotlight }) => (
  <div className="col-lg-3 col-md-6 mb-4">
    <Link to={spotlight.link} className="text-decoration-none">
      <div className="card p-3 shadow-sm h-100 rounded-3 border-0 transition-hover">
        <div className={`fs-1 mb-2 ${spotlight.color}`}>{spotlight.icon}</div>
        <h6 className="fw-bold text-dark">{spotlight.title}</h6>
      </div>
    </Link>
  </div>
);

const BlogListItem = ({ blog }) => (
  <Link to={`/blogs/${blog.id}`} className="list-group-item list-group-item-action p-3 rounded-3 mb-2 shadow-sm border-0">
    <div className="d-flex w-100 justify-content-between">
      <h6 className="mb-1 fw-semibold text-primary">{blog.title}</h6>
    </div>
    <small className="text-muted">By {blog.author} on {blog.date}</small>
  </Link>
);

// ===================================================================
// MAIN COMPONENT: HEALTHGUIDE
// ===================================================================

function HealthGuide() {
  return (
    <div className="health-guide-container bg-white">

      {/* Custom Styles */}
      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
          padding: 6rem 0;
          margin-bottom: 2rem;
          border-radius: 0 0 20px 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .transition-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .list-group-item:hover {
          background-color: #f1f8e9 !important;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-4 fw-bolder text-dark">MediQ Health Guide</h1>
          <p className="lead text-secondary mt-3">
            Trusted health articles, wellness tips, and disease spotlights curated by experts.
          </p>
          <div className="input-group my-4 mx-auto" style={{ maxWidth: '600px' }}>
            <input type="text" className="form-control form-control-lg rounded-start-pill border-danger" placeholder="Search for a condition or article..." />
            <button className="btn btn-danger rounded-end-pill" type="button">Search</button>
          </div>
        </div>
      </section>

      {/* 2. DISEASE SPOTLIGHTS */}
      <section className="container py-5">
        <h2 className="fw-bold text-center mb-5 text-primary">Disease Spotlights: Know Your Health</h2>
        <div className="row g-4 justify-content-center">
          {DISEASE_SPOTLIGHTS.map(spotlight => (
            <SpotlightCard key={spotlight.id} spotlight={spotlight} />
          ))}
        </div>
      </section>
      <hr className="my-4" />

      {/* 3. FEATURED ARTICLES */}
      <section className="container py-5">
        <h2 className="fw-bold mb-4 text-dark">Featured Wellness Articles</h2>
        <p className="text-muted mb-5">Read our top recommended articles on general health, nutrition, and prevention.</p>
        <div className="row g-4">
          {FEATURED_ARTICLES.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
      <hr className="my-4" />

      {/* 4. LATEST BLOGS & SUBSCRIBE */}
      <section className="container py-5">
        <div className="row">
          <div className="col-lg-8 mb-5">
            <h2 className="fw-bold mb-4 text-dark">Latest Health Blogs</h2>
            <div className="list-group">
              {LATEST_BLOGS.map(blog => (
                <BlogListItem key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="text-center mt-4">
              <Link to="/blogs" className="btn btn-lg btn-outline-primary rounded-pill px-5">
                View All Blogs
              </Link>
            </div>
          </div>

          {/* Newsletter Subscription Card */}
          <div className="col-lg-4">
            <div className="card bg-success text-white p-4 shadow-lg h-100 rounded-3">
              <div className="card-body">
                <h4 className="card-title fw-bold mb-3">Get Daily Health Tips</h4>
                <p className="card-text mb-4">
                  Subscribe to the MediQ newsletter for the latest articles delivered right to your inbox.
                </p>
                <form>
                  <input
                    type="email"
                    className="form-control mb-3 rounded-pill"
                    placeholder="Your Email Address"
                    required
                  />
                  <button type="submit" className="btn btn-light w-100 rounded-pill fw-bold">
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HealthGuide;
