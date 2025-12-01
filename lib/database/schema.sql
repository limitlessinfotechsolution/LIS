-- =============================================
-- LIMITLESS INFOTECH - DATABASE SCHEMA
-- =============================================
-- Database: PostgreSQL
-- Version: 1.0.0
-- Last Updated: November 27, 2025
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ADMIN USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_admin_users_username ON admin_users(username);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- =============================================
-- INQUIRIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service VARCHAR(255),
  budget VARCHAR(100),
  timeline VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'normal',
  assigned_to UUID REFERENCES admin_users(id),
  notes TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  replied_at TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);

-- =============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  source VARCHAR(100),
  ip_address VARCHAR(45),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  last_email_sent TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_subscribers_status ON newsletter_subscribers(status);

-- =============================================
-- SMTP CONFIGURATION TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS smtp_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host VARCHAR(255) NOT NULL,
  port INTEGER NOT NULL,
  secure BOOLEAN DEFAULT false,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL, -- Encrypt in production
  from_email VARCHAR(255) NOT NULL,
  from_name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_tested TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- BLOG POSTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES admin_users(id),
  category VARCHAR(100),
  tags TEXT[], -- Array of tags
  featured_image VARCHAR(500),
  status VARCHAR(50) DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  seo_title VARCHAR(500),
  seo_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- =============================================
-- PORTFOLIO PROJECTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  client VARCHAR(255),
  category VARCHAR(100),
  technologies TEXT[], -- Array of technologies
  duration VARCHAR(100),
  team_size VARCHAR(50),
  results TEXT[], -- Array of results
  featured_image VARCHAR(500),
  gallery_images TEXT[], -- Array of image URLs
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX idx_portfolio_order ON portfolio_projects(display_order);

-- =============================================
-- ANALYTICS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(100) NOT NULL,
  event_category VARCHAR(100),
  event_label VARCHAR(255),
  event_value INTEGER,
  page_url VARCHAR(500),
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at DESC);

-- =============================================
-- SYSTEM LOGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level VARCHAR(20) NOT NULL, -- info, warning, error
  message TEXT NOT NULL,
  context JSONB,
  user_id UUID REFERENCES admin_users(id),
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_logs_level ON system_logs(level);
CREATE INDEX idx_logs_created_at ON system_logs(created_at DESC);

-- =============================================
-- EMAILS TABLE (Webmail)
-- =============================================
CREATE TABLE IF NOT EXISTS emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_email VARCHAR(255) NOT NULL,
  to_email VARCHAR(255) NOT NULL,
  cc_email TEXT,
  bcc_email TEXT,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  html_body TEXT,
  folder VARCHAR(50) DEFAULT 'inbox', -- inbox, sent, drafts, trash, spam
  read BOOLEAN DEFAULT false,
  starred BOOLEAN DEFAULT false,
  attachments JSONB,
  headers JSONB,
  message_id VARCHAR(255),
  in_reply_to VARCHAR(255),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_emails_folder ON emails(folder);
CREATE INDEX idx_emails_date ON emails(date DESC);
CREATE INDEX idx_emails_from ON emails(from_email);
CREATE INDEX idx_emails_to ON emails(to_email);
CREATE INDEX idx_emails_read ON emails(read);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_smtp_config_updated_at BEFORE UPDATE ON smtp_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED DATA (OPTIONAL)
-- =============================================

-- Insert default admin user (password: admin123)
-- Note: Use bcrypt hash in production
INSERT INTO admin_users (username, email, password_hash, role)
VALUES (
  'admin',
  'admin@limitlessinfotech.com',
  '$2b$10$rBV2kHZ5z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5',
  'admin'
) ON CONFLICT (username) DO NOTHING;

-- Insert sample inquiry
INSERT INTO inquiries (name, email, phone, company, service, message, status)
VALUES (
  'John Doe',
  'john@example.com',
  '+1 234 567 8900',
  'Tech Corp',
  'Web Development',
  'We need a custom web application for our business.',
  'pending'
) ON CONFLICT DO NOTHING;

-- =============================================
-- VIEWS FOR REPORTING
-- =============================================

-- Inquiry statistics view
CREATE OR REPLACE VIEW inquiry_stats AS
SELECT
  COUNT(*) as total_inquiries,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_inquiries,
  COUNT(*) FILTER (WHERE status = 'read') as read_inquiries,
  COUNT(*) FILTER (WHERE status = 'replied') as replied_inquiries,
  COUNT(*) FILTER (WHERE created_at > CURRENT_DATE - INTERVAL '7 days') as inquiries_this_week,
  COUNT(*) FILTER (WHERE created_at > CURRENT_DATE - INTERVAL '30 days') as inquiries_this_month
FROM inquiries;

-- Newsletter statistics view
CREATE OR REPLACE VIEW newsletter_stats AS
SELECT
  COUNT(*) as total_subscribers,
  COUNT(*) FILTER (WHERE status = 'active') as active_subscribers,
  COUNT(*) FILTER (WHERE subscribed_at > CURRENT_DATE - INTERVAL '7 days') as new_this_week,
  COUNT(*) FILTER (WHERE subscribed_at > CURRENT_DATE - INTERVAL '30 days') as new_this_month
FROM newsletter_subscribers;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE admin_users IS 'Admin users with authentication credentials';
COMMENT ON TABLE inquiries IS 'Customer inquiries from contact form';
COMMENT ON TABLE newsletter_subscribers IS 'Email newsletter subscribers';
COMMENT ON TABLE smtp_config IS 'SMTP email server configuration';
COMMENT ON TABLE blog_posts IS 'Blog articles and posts';
COMMENT ON TABLE portfolio_projects IS 'Portfolio projects showcase';
COMMENT ON TABLE analytics_events IS 'User analytics and tracking events';
COMMENT ON TABLE system_logs IS 'System logs and audit trail';

-- =============================================
-- GRANTS (Adjust based on your setup)
-- =============================================

-- Grant permissions to application user
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- =============================================
-- END OF SCHEMA
-- =============================================
